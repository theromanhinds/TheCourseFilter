import React from 'react'
import { useCourses } from './CourseContext';
import SubjectFilter from '../Filters/SubjectFilter';
import TimeFilter from '../Filters/TimeFilter';
import InstructorFilter from '../Filters/InstructorFilter';
import WritingFilter from '../Filters/WritingFilter';
import FirstYearFilter from '../Filters/FirstYearFilter';
// import FavoriteFilter from '../Filters/FavoriteFilter';
import DayFilter from '../Filters/DayFilter';
import DistFilter from '../Filters/DistFilter';

function Header({ setIsFilterMenuOpen, isFilterMenuOpen }) {

  const { filteredCourses, clearFilters  } = useCourses();    
    
  return (
    <div className='header'> 

        <div className='title-container'>
            <button 
              className="filter-menu-toggle" 
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
              <span>&#9776;</span>
            </button>

            <h2>The Course Filter</h2> 
            <a className='feedback-link' href="https://forms.gle/v51zKLadq1Mmr7ru5" target="_blank" rel="noreferrer">
              Feedback
            </a>
        </div>

        <div className='dropdown-filters-container'>
            <SubjectFilter/>
            <TimeFilter/>
            <InstructorFilter/>
            <DayFilter/>
            <DistFilter/>

            <div className='dropdown-filter'>
              <button className='dropdown-button' onClick={clearFilters}>Clear</button>
            </div>
        </div>

        <div className='toggle-filters-container'>
          {/* <FavoriteFilter/> */}
          <WritingFilter/>
          <FirstYearFilter/>
          <h3 className='number-of-courses'>{filteredCourses.length} courses</h3>

        </div>
        
      </div>
  )
}

export default Header