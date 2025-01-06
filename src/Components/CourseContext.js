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
  
  const [selectedSubjects, setSelectedSubjects] = useState(
    searchParams.get('subject')?.split(',') || []
  );

  const uniqueSubjects = [...new Set(courses.map((course) => course.subject))].sort();

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
  }, [selectedSubjects, courses]);

  // Trigger filter and sort whenever selectedSubjects or courses change
  useEffect(() => {
    applyFiltersAndSort();
  }, [selectedSubjects, courses, applyFiltersAndSort]);

  // Toggle subject and update URL
  const toggleSubject = (subject) => {
    setSelectedSubjects((prevSubjects) => {
      const updatedSubjects = prevSubjects.includes(subject)
        ? prevSubjects.filter((s) => s !== subject)
        : [...prevSubjects, subject];
      
      // Update the URL: If no subjects are selected, remove the 'subject' param
      if (updatedSubjects.length > 0) {
        setSearchParams({ subject: updatedSubjects.join(',') }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
  
      return updatedSubjects;  // Return updated subjects
    });
  };

  const clearFilters = () => {
    setSearchParams({}, { replace: true });  // Clears all query parameters
    setSelectedSubjects([]);  // Clear selected subjects
    setFilteredCourses(courses);  // Show all courses when filters are cleared
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        filteredCourses,
        loading,
        uniqueSubjects,
        selectedSubjects,
        toggleSubject,
        clearFilters,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
