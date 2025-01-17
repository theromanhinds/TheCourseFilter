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
  
  const [selectedSubjects, setSelectedSubjects] = useState(searchParams.get('subject')?.split('|') || []);
  const [selectedTimes, setSelectedTimes] = useState(searchParams.get('time')?.split('|') || []);
  const [selectedInstructors, setSelectedInstructors] = useState(searchParams.get('instructor')?.split('|') || []);
  const [selectedDays, setSelectedDays] = useState(searchParams.get('days')?.split('|') || []);
  const [selectedDistSimple, setSelectedDistSimple] = useState(searchParams.get('distSimple')?.split('|') || []);

  const [writing, setWriting] = useState(searchParams.get('writing') === 'true');
  const [fys, setFys] = useState(searchParams.get('FYS') === 'true');

  const uniqueSubjects = [...new Set(courses.map((course) => course.subject))].sort();
  const uniqueTimes = [...new Set(courses.map((course) => course.times).filter((time) => time))];
  const uniqueInstructors = [...new Set(courses.map((course) => course.instructor))].sort();
  // const uniqueDays = [...new Set(courses.map((course) => course.days))].sort();
  const uniqueDays = ['M', 'T', 'W', 'R', 'F', 'MWF', 'TR', 'MW', 'MF', 'WF']
  // const uniqueDistSimple = [...new Set(courses.map((course) => course.distSimple))].sort();
  const uniqueDistSimple = ['HU', 'NS', 'SS'];

  // Fetch courses from Firestore
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const coursesCollection = collection(db, 'courses');
  //       const coursesSnapshot = await getDocs(coursesCollection);
  //       const coursesList = coursesSnapshot.docs.map((doc) => ({
  //         courseId: doc.id,
  //         ...doc.data(),
  //       }));
  
  //       const sortedCourses = coursesList.sort((a, b) => {
  //         const subjectCompare = a.subject.localeCompare(b.subject);
  //         if (subjectCompare !== 0) return subjectCompare;
  //         return extractNumber(a.courseNum) - extractNumber(b.courseNum);
  //       });
  
  //       setCourses(sortedCourses);
  
  //       // Apply filters based on initial URL parameters
  //       const initialSubjects = searchParams.get('subject')?.split('|') || [];
  //       const initialTimes = searchParams.get('time')?.split('|') || [];
  //       const initialInstructors = searchParams.get('instructor')?.split('|') || [];
  //       const initialDays = searchParams.get('days')?.split('|') || [];
  //       const initialDistSimple = searchParams.get('distSimple')?.split('|') || [];
  
  //       applyFiltersAndSortWithParams({
  //         subjects: initialSubjects,
  //         times: initialTimes,
  //         instructors: initialInstructors,
  //         days: initialDays,
  //         distSimple: initialDistSimple,
  //       });
  
  //       setSelectedSubjects(initialSubjects);
  //       setSelectedTimes(initialTimes);
  //       setSelectedInstructors(initialInstructors);
  //       setSelectedDays(initialDays);
  //       setSelectedDistSimple(initialDistSimple);
  //     } catch (error) {
  //       console.error('Error fetching courses:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchCourses();
  // }, []);

  const applyFiltersAndSortWithParams = useCallback(
    ({ subjects, times, instructors, days, distSimple, writing, fys }) => {
    let filtered = courses;
  
    if (subjects.length > 0) {
      filtered = filtered.filter((course) => subjects.includes(course.subject));
    }
    if (times.length > 0) {
      filtered = filtered.filter((course) => times.includes(course.times));
    }
    if (instructors.length > 0) {
      filtered = filtered.filter((course) => instructors.includes(course.instructor));
    }
    if (days.length > 0) {
      filtered = filtered.filter((course) => days.includes(course.days));
    }
    if (distSimple.length > 0) {
      filtered = filtered.filter((course) => distSimple.includes(course.distSimple));
    }
    if (writing) {
      filtered = filtered.filter((course) => course.writing === 'W');
    }
    if (fys) {
      filtered = filtered.filter((course) => course.courseType === 'FY Seminar');
    }
  
    setFilteredCourses(filtered);
    },
    [courses]
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, 'courses');
        const coursesSnapshot = await getDocs(coursesCollection);
        const coursesList = coursesSnapshot.docs.map((doc) => ({
          courseId: doc.id,
          ...doc.data(),
        }));
  
        const sortedCourses = coursesList.sort((a, b) => {
          const subjectCompare = a.subject.localeCompare(b.subject);
          if (subjectCompare !== 0) return subjectCompare;
          return extractNumber(a.courseNum) - extractNumber(b.courseNum);
        });
  
        setCourses(sortedCourses);
  
        // Apply filters based on initial URL parameters
        const initialSubjects = searchParams.get('subject')?.split('|') || [];
        const initialTimes = searchParams.get('time')?.split('|') || [];
        const initialInstructors = searchParams.get('instructor')?.split('|') || [];
        const initialDays = searchParams.get('days')?.split('|') || [];
        const initialDistSimple = searchParams.get('distSimple')?.split('|') || [];
        const initialWriting = searchParams.get('writing') === 'true';
        const initialFys = searchParams.get('FYS') === 'true';
  
        applyFiltersAndSortWithParams({
          subjects: initialSubjects,
          times: initialTimes,
          instructors: initialInstructors,
          days: initialDays,
          distSimple: initialDistSimple,
          writing: initialWriting,
          fys: initialFys,
        });
  
        setSelectedSubjects(initialSubjects);
        setSelectedTimes(initialTimes);
        setSelectedInstructors(initialInstructors);
        setSelectedDays(initialDays);
        setSelectedDistSimple(initialDistSimple);
        setWriting(initialWriting);
        setFys(initialFys);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, [applyFiltersAndSortWithParams, searchParams]);
  
  // useEffect(() => {
  //   // Listen for changes in searchParams and update filters
  //   const subjects = searchParams.get('subject')?.split('|') || [];
  //   const times = searchParams.get('time')?.split('|') || [];
  //   const instructors = searchParams.get('instructor')?.split('|') || [];
  //   const days = searchParams.get('days')?.split('|') || [];
  //   const distSimple = searchParams.get('distSimple')?.split('|') || [];
  
  //   setSelectedSubjects(subjects);
  //   setSelectedTimes(times);
  //   setSelectedInstructors(instructors);
  //   setSelectedDays(days);
  //   setSelectedDistSimple(distSimple);
  
  //   applyFiltersAndSortWithParams({
  //     subjects,
  //     times,
  //     instructors,
  //     days,
  //     distSimple,
  //   });
  // }, [courses]);

  useEffect(() => {
    // Listen for changes in searchParams and update filters
    const subjects = searchParams.get('subject')?.split('|') || [];
    const times = searchParams.get('time')?.split('|') || [];
    const instructors = searchParams.get('instructor')?.split('|') || [];
    const days = searchParams.get('days')?.split('|') || [];
    const distSimple = searchParams.get('distSimple')?.split('|') || [];
    const writing = searchParams.get('writing') === 'true';
    const fys = searchParams.get('FYS') === 'true';
  
    setSelectedSubjects(subjects);
    setSelectedTimes(times);
    setSelectedInstructors(instructors);
    setSelectedDays(days);
    setSelectedDistSimple(distSimple);
    setWriting(writing);
    setFys(fys);
  
    applyFiltersAndSortWithParams({
      subjects,
      times,
      instructors,
      days,
      distSimple,
      writing,
      fys,
    });
  }, [applyFiltersAndSortWithParams, searchParams, courses]);
  
  // const toggleFilter = (filterType, value) => {
  //   let setSelectedFilter;
  
  //   if (filterType === 'subject') setSelectedFilter = setSelectedSubjects;
  //   else if (filterType === 'time') setSelectedFilter = setSelectedTimes;
  //   else if (filterType === 'instructor') setSelectedFilter = setSelectedInstructors;
  //   else if (filterType === 'days') setSelectedFilter = setSelectedDays;
  //   else if (filterType === 'distSimple') setSelectedFilter = setSelectedDistSimple;
  
  //   setSelectedFilter((prevFilters) => {
  //     const updatedFilters = prevFilters.includes(value)
  //       ? prevFilters.filter((s) => s !== value)
  //       : [...prevFilters, value];
  
  //     // Update URL params
  //     const updatedParams = new URLSearchParams(searchParams);
  //     updatedParams.set(filterType, updatedFilters.join('|'));
      
  //     if (updatedFilters.length > 0) {
  //       setSearchParams(updatedParams, { replace: true });
  //     } else {
  //       updatedParams.delete(filterType);
  //       setSearchParams(updatedParams, { replace: true });
  //     }
  
  //     // Apply filters immediately using the updated filters
  //     applyFiltersAndSortWithParams({
  //       subjects: filterType === 'subject' ? updatedFilters : selectedSubjects,
  //       times: filterType === 'time' ? updatedFilters : selectedTimes,
  //       instructors: filterType === 'instructor' ? updatedFilters : selectedInstructors,
  //       days: filterType === 'days' ? updatedFilters : selectedDays,
  //       distSimple: filterType === 'distSimple' ? updatedFilters : selectedDistSimple,
  //     });
  
  //     return updatedFilters;
  //   });
  // };

  const toggleFilter = (filterType, value) => {
    if (filterType === 'writing' || filterType === 'FYS') {
      const isWriting = filterType === 'writing';
      const currentState = isWriting ? writing : fys;
      const newState = !currentState;
  
      // Update state for writing or FYS
      if (isWriting) setWriting(newState);
      else setFys(newState);
  
      // Update URL params
      const updatedParams = new URLSearchParams(searchParams);
      if (newState) {
        updatedParams.set(filterType, 'true');
      } else {
        updatedParams.delete(filterType);
      }
      setSearchParams(updatedParams, { replace: true });
  
      // Apply filters with updated states
      applyFiltersAndSortWithParams({
        writing: isWriting ? newState : writing,
        fys: isWriting ? fys : newState,
        subjects: selectedSubjects,
        times: selectedTimes,
        instructors: selectedInstructors,
        days: selectedDays,
        distSimple: selectedDistSimple,
      });
  
      return; // Exit the function as we have handled writing and FYS
    }
  
    // Handle other filter types (subject, time, instructor, days, distSimple)
    let setSelectedFilter;
  
    if (filterType === 'subject') setSelectedFilter = setSelectedSubjects;
    else if (filterType === 'time') setSelectedFilter = setSelectedTimes;
    else if (filterType === 'instructor') setSelectedFilter = setSelectedInstructors;
    else if (filterType === 'days') setSelectedFilter = setSelectedDays;
    else if (filterType === 'distSimple') setSelectedFilter = setSelectedDistSimple;
  
    setSelectedFilter((prevFilters) => {
      const updatedFilters = prevFilters.includes(value)
        ? prevFilters.filter((s) => s !== value)
        : [...prevFilters, value];
  
      // Update URL params
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set(filterType, updatedFilters.join('|'));
  
      if (updatedFilters.length > 0) {
        setSearchParams(updatedParams, { replace: true });
      } else {
        updatedParams.delete(filterType);
        setSearchParams(updatedParams, { replace: true });
      }
  
      // Apply filters immediately using the updated filters
      applyFiltersAndSortWithParams({
        writing,
        fys,
        subjects: filterType === 'subject' ? updatedFilters : selectedSubjects,
        times: filterType === 'time' ? updatedFilters : selectedTimes,
        instructors: filterType === 'instructor' ? updatedFilters : selectedInstructors,
        days: filterType === 'days' ? updatedFilters : selectedDays,
        distSimple: filterType === 'distSimple' ? updatedFilters : selectedDistSimple,
      });
  
      return updatedFilters;
    });
  };
  
  // New function to apply filters using params directly
  // const applyFiltersAndSortWithParams = ({ subjects, times, instructors, days, distSimple }) => {
  //   let filtered = courses;
  
  //   if (subjects.length > 0) filtered = filtered.filter((course) => subjects.includes(course.subject));
  //   if (times.length > 0) filtered = filtered.filter((course) => times.includes(course.times));
  //   if (instructors.length > 0) filtered = filtered.filter((course) => instructors.includes(course.instructor));
  //   if (days.length > 0) filtered = filtered.filter((course) => days.includes(course.days));
  //   if (distSimple.length > 0) filtered = filtered.filter((course) => distSimple.includes(course.distSimple));
  
  //   setFilteredCourses(filtered);
  // };

  // // Helper function to convert time to 24-hour format
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
  uniqueTimes.sort((a, b) => {
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
    setSelectedDays([]);
    setSelectedDistSimple([]);
    setWriting(false);
    setFys(false);
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
    uniqueDays,
    uniqueDistSimple,
    selectedSubjects,
    selectedTimes,
    selectedInstructors,
    selectedDays,
    selectedDistSimple,
    writing, // New state for writing filter
    fys, // New state for FYS filter
    toggleFilter,
    clearFilters,
  }}
>
  {children}
</CourseContext.Provider>
  );
};
