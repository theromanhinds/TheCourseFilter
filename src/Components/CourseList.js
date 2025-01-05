import React from 'react'
import Course from './Course'
import { useCourses } from './CourseContext'

function CourseList({ isFilterMenuOpen, setIsFilterMenuOpen }) {

  const { filteredCourses, loading } = useCourses();

  if (loading) return <p>Loading courses...</p>;

  return (
    <div className='course-list'>

      <div className='header'> 
        <button 
          className="MobileFilterButtonCourses" 
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
          <span style={{ marginLeft: '0px' }}>&#9776;</span>
        </button>

        <h2>The Course Filter</h2>
      </div>

      <h3>Course List | {filteredCourses.length} courses</h3>

       {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <Course key={course.courseId} course={course}/>
        ))
      ) : (
        <p>No courses match the selected filters.</p>
      )}

    </div>
  )
}

export default CourseList