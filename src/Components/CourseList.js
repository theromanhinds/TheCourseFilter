import React, { useState } from 'react'
import Course from './Course'
import { useCourses } from './CourseContext'
import CoursePopup from './CoursePopup';

function CourseList({ isFilterMenuOpen, setIsFilterMenuOpen }) {

  const { filteredCourses, loading } = useCourses();
  const [popupCourse, setPopupCourse] = useState(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <p>Loading courses...</p>;

  return (
    <div className='course-list'>

        <h3 className='number-of-courses'>{filteredCourses.length} courses</h3>

        {popupCourse && (
          <CoursePopup 
            popupCourse={popupCourse}
            closePopup={() => setPopupCourse(null)}
          />
        )}

       {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <Course key={course.courseId} course={course}
                  displayPopup={() => setPopupCourse(course)}/>
        ))
      ) : (
        <p>No courses match the selected filters.</p>
      )}

      <button className='return-to-top' onClick={scrollToTop}>
        Scroll to Top
      </button>

    </div>
  )
}

export default CourseList