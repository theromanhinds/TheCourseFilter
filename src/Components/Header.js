import React from 'react'
import { useCourses } from './CourseContext';
import SubjectFilter from '../Filters/SubjectFilter';
import TimeFilter from '../Filters/TimeFilter';
import InstructorFilter from '../Filters/InstructorFilter';

function Header() {

    const { filteredCourses } = useCourses();
    
  return (
    <div className='header'> 
        {/* <button 
          className="filter-menu-toggle" 
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
          <span style={{ marginLeft: '0px' }}>&#9776;</span>
        </button> */}

        <div className='title-container'>
            <h2>The Course Filter</h2> 
            <h3>{filteredCourses.length} courses</h3>
        </div>

        <div className='filters-container'>
            <SubjectFilter/>
            <TimeFilter/>
            <InstructorFilter/>
        </div>
        
      </div>
  )
}

export default Header