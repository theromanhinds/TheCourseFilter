import React from 'react'
import SubjectFilter from '../Filters/SubjectFilter'
import { useCourses } from './CourseContext';

function FilterMenu({ isFilterMenuOpen, setIsFilterMenuOpen }) {

  const { clearFilters } = useCourses();

  return (
    <div className={`filter-menu ${isFilterMenuOpen ? 'open' : ''}`}>

        <button className="filter-menu-toggle" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
          <span style={{ marginLeft: '0px' }}>&#9776;</span>
        </button>
        
        <SubjectFilter/>

        <button onClick={clearFilters}>Clear Filters</button>

    </div>
  )
}

export default FilterMenu