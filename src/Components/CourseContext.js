import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';

// Create the context
const CourseContext = createContext();

// Custom hook for easy access
export const useCourses = () => useContext(CourseContext);

// Helper function to extract numeric values from course numbers (e.g., "100A" -> 100)
const extractNumber = (courseNum) => {
  return parseInt(courseNum.replace(/\D/g, ''), 10);
};

// Provider component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedSubjects, setSelectedSubjects] = useState(searchParams.get('subject')?.split(',') || []);
  const [selectedTimes, setSelectedTimes] = useState(searchParams.get('time')?.split(',') || []);
  const [selectedInstructors, setSelectedInstructors] = useState(searchParams.get('instructor')?.split(',') || []);

  const uniqueSubjects = [...new Set(courses.map((course) => course.subject))].sort();
  const uniqueTimes = [...new Set(courses.map((course) => course.times).filter((time) => time))];
  const uniqueInstructors = [...new Set(courses.map((course) => course.instructor))].sort();

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, 'courses');
        const coursesSnapshot = await getDocs(coursesCollection);
        const coursesList = coursesSnapshot.docs.map((doc) => ({
          courseId: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesList);
        setFilteredCourses(coursesList);  // Initially show all courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Apply filters and sorting to courses
  const applyFiltersAndSort = useCallback(() => {
    let filtered = courses;

    // Apply subject filtering if subjects are selected
    if (selectedSubjects.length > 0) {
      filtered = courses.filter((course) =>
        selectedSubjects.includes(course.subject)
      );
    }

    // Apply time filtering if times are selected
    if (selectedTimes.length > 0) {
      filtered = filtered.filter((course) => selectedTimes.includes(course.time));
    }

    // Apply instructor filtering if instructors are selected
    if (selectedInstructors.length > 0) {
      filtered = filtered.filter((course) => selectedInstructors.includes(course.instructor));
    }

    // Sort courses by subject alphabetically, and by course number if the subject is the same
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      const subjectCompare = a.subject.localeCompare(b.subject);
      if (subjectCompare !== 0) return subjectCompare;

      const numA = extractNumber(a.courseNum);
      const numB = extractNumber(b.courseNum);

      if (numA === numB) {
        return a.courseNum.localeCompare(b.courseNum);  // If course numbers are the same, compare the alphanumeric parts
      }

      return numA - numB;  // Compare the numeric course numbers
    });

    setFilteredCourses(sorted);  // Update filtered courses after sorting
  }, [selectedSubjects, selectedTimes, selectedInstructors, courses]);

  // Trigger filter and sort whenever selectedSubjects or courses change
  useEffect(() => {
    applyFiltersAndSort();
  }, [selectedSubjects, selectedTimes, selectedInstructors, courses, applyFiltersAndSort]);

  // Toggle filter for subject, time, or instructor and update URL
  const toggleFilter = (filterType, value) => {
    let selectedFilter;
    let setSelectedFilter;

    // Select the corresponding state and setState function
    if (filterType === 'subject') {
      selectedFilter = selectedSubjects;
      setSelectedFilter = setSelectedSubjects;
    } else if (filterType === 'time') {
      selectedFilter = selectedTimes;
      setSelectedFilter = setSelectedTimes;
    } else if (filterType === 'instructor') {
      selectedFilter = selectedInstructors;
      setSelectedFilter = setSelectedInstructors;
    }

    setSelectedFilter((prevFilters) => {
      const updatedFilters = prevFilters.includes(value)
        ? prevFilters.filter((s) => s !== value)
        : [...prevFilters, value];
      
      // Update the URL with the updated filter value
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set(filterType, updatedFilters.join(','));

      if (updatedFilters.length > 0) {
        setSearchParams(updatedParams, { replace: true });
      } else {
        updatedParams.delete(filterType);
        setSearchParams(updatedParams, { replace: true });
      }

      return updatedFilters;  // Return updated filters
    });
  };

  // Helper function to convert time to 24-hour format
  function to24Hour(time) {
    if (!time) return 0;  // Safeguard for null/undefined
    let [hour, minute] = time.match(/\d+/g);
    const period = time.slice(-2);
    
    hour = parseInt(hour);
    minute = parseInt(minute);
  
    if (period === 'pm' && hour !== 12) hour += 12;
    if (period === 'am' && hour === 12) hour = 0;
  
    return hour * 60 + minute;  // Convert to total minutes
  }
  
  // Custom sort for unique times (checks start and end times)
  const sortedTimes = uniqueTimes.sort((a, b) => {
    const [startA, endA] = a.split('-');
    const [startB, endB] = b.split('-');
  
    const startComparison = to24Hour(startA) - to24Hour(startB);
    
    // If start times are equal, compare end times
    if (startComparison === 0) {
      return to24Hour(endA) - to24Hour(endB);
    }
  
    return startComparison;
  });

  const clearFilters = () => {
    setSearchParams({}, { replace: true });  // Clears all query parameters
    setSelectedSubjects([]);
    setSelectedTimes([]);
    setSelectedInstructors([]);
    setFilteredCourses(courses);  // Reset the filtered courses
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        filteredCourses,
        loading,
        uniqueSubjects,
        uniqueTimes,
        uniqueInstructors,
        selectedSubjects,
        selectedTimes,
        selectedInstructors,
        toggleFilter,
        clearFilters,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
