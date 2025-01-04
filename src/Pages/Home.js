import React from 'react'
import { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from "firebase/firestore"; 

import Course from '../Components/Course';

function Home() {

  useEffect(() => {
    async function loadCourses() {
      console.log("LOADING");
      try {
        console.log("TRYING");

        const coursesCollection = collection(db, "courses");

        console.log("COLLECTED", coursesCollection);

        const coursesSnapshot = await getDocs(coursesCollection);

        console.log("GOTTEN SNAPSHOT");

        const coursesList = coursesSnapshot.docs.map(doc => ({
          courseId: doc.id,
          ...doc.data(),
        }));
        
        console.log("SETTING");

        setCourses(coursesList);

      } catch (error) {
        console.log("REJECTING");
        console.error("Error fetching courses: ", error);
      }
    }

    loadCourses();
  }, []);

  const [courses, setCourses] = useState([]);

  return (
    <div className='App'>
        
      <p>Home</p>

      {courses.length > 0 ? (
        courses.map(course => ( <Course key={course.courseId} course={course} /> ))
      ) : ( <p>No courses found for selected filters.</p> )}

    </div>
  )
}

export default Home