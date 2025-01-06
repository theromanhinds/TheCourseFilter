import React from 'react'
import Course from './Course'
import { useCourses } from './CourseContext'

function CourseList({ isFilterMenuOpen, setIsFilterMenuOpen }) {

  const { filteredCourses, loading } = useCourses();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <p>Loading courses...</p>;

  return (
    <div className='course-list'>

      <div className='header'> 
        <button 
          className="filter-menu-toggle" 
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
          <span style={{ marginLeft: '0px' }}>&#9776;</span>
        </button>

        <h2>The Course Filter</h2>
      </div>

      <h3>{filteredCourses.length} courses</h3>

       {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <Course key={course.courseId} course={course}/>
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