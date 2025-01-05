import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';

// Create the context
const CourseContext = createContext();

// Custom hook for easy access
export const useCourses = () => useContext(CourseContext);

// Provider component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Keep a state for the selected subjects to control the toggling logic
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

  // Filter courses based on selected subjects
  const applyFilters = useCallback(() => {
    if (selectedSubjects.length > 0) {
      setFilteredCourses(
        courses.filter((course) =>
          selectedSubjects.includes(course.subject)
        )
      );
    } else {
      setFilteredCourses(courses);  // Show all if no filters
    }
  }, [selectedSubjects, courses]);

  // Trigger filter application whenever selectedSubjects change
  useEffect(() => {
    applyFilters();
  }, [selectedSubjects, applyFilters]);

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
        // Remove the subject parameter from the URL when there are no selected subjects
        setSearchParams({}, { replace: true });
      }
  
      return updatedSubjects;  // Return updated subjects
    });
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
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
