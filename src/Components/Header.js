import React from 'react'
import { useCourses } from './CourseContext';
import SubjectFilter from '../Filters/SubjectFilter';
import TimeFilter from '../Filters/TimeFilter';
import InstructorFilter from '../Filters/InstructorFilter';
import WritingFilter from '../Filters/WritingFilter';
import FirstYearFilter from '../Filters/FirstYearFilter';
import FavoriteFilter from '../Filters/FavoriteFilter';
import DayFilter from '../Filters/DayFilter';
import DistFilter from '../Filters/DistFilter';

function Header() {

  const { filteredCourses, clearFilters  } = useCourses();    
    
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

        <div className='dropdown-filters-container'>
            <SubjectFilter/>
            <TimeFilter/>
            <InstructorFilter/>
            <DayFilter/>
            <DistFilter/>
        </div>

        <div className='toggle-filters-container'>
            <WritingFilter/>
            <FirstYearFilter/>
            <FavoriteFilter/>
            
            <div className='toggle-filter'>
              <button className='toggle-button' onClick={clearFilters}>Clear</button>
            </div>
        </div>
        
      </div>
  )
}

export default Header