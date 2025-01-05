import React from 'react'
import SubjectFilter from '../Filters/SubjectFilter'

function FilterMenu({ isFilterMenuOpen, setIsFilterMenuOpen }) {
  return (
    <div className={`filter-menu ${isFilterMenuOpen ? 'open' : ''}`}>

        <button className="filter-menu-toggle" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
          <span style={{ marginLeft: '0px' }}>&#9776;</span>
        </button>
        
        <SubjectFilter/>

    </div>
  )
}

export default FilterMenu