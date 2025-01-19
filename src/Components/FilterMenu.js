import React from 'react'
import SubjectFilter from '../Filters/SubjectFilter'
import { useCourses } from './CourseContext';
import TimeFilter from '../Filters/TimeFilter';
import InstructorFilter from '../Filters/InstructorFilter';
import DayFilter from '../Filters/DayFilter';
import DistFilter from '../Filters/DistFilter';
import WritingFilter from '../Filters/WritingFilter';
import FirstYearFilter from '../Filters/FirstYearFilter';

function FilterMenu({ isFilterMenuOpen, setIsFilterMenuOpen }) {

  const { clearFilters } = useCourses();

  return (
    <div className={`filter-menu ${isFilterMenuOpen ? 'open' : ''}`}>

      <div className='filters-container'>
        <button className="filter-menu-toggle-button" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
          <span>&#9776;</span>
        </button>
      <div className='fm-toggle-filters-container'>
          {/* <FavoriteFilter/> */}
          <WritingFilter/>
          <FirstYearFilter/>
      </div>
            <SubjectFilter/>
            <TimeFilter/>
            <InstructorFilter/>
            <DayFilter/>
            <DistFilter/>

            <div className='dropdown-filter'>
              <button className='dropdown-button' onClick={clearFilters}>Clear</button>
            </div>
          </div>
    </div>
  )
}

export default FilterMenu