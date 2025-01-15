import React from 'react'
import SubjectFilter from '../Filters/SubjectFilter'
import { useCourses } from './CourseContext';
import TimeFilter from '../Filters/TimeFilter';
import InstructorFilter from '../Filters/InstructorFilter';

function FilterMenu({ isFilterMenuOpen, setIsFilterMenuOpen }) {

  const { clearFilters } = useCourses();

  return (
    <div className={`filter-menu ${isFilterMenuOpen ? 'open' : ''}`}>

        <button className="filter-menu-toggle" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
          <span style={{ marginLeft: '0px' }}>&#9776;</span>
        </button>
        
        <SubjectFilter/>
        <TimeFilter/>
        <InstructorFilter/>

          <button onClick={clearFilters}>Clear Filters</button>
    </div>
  )
}

export default FilterMenu