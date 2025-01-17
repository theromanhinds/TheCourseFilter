import React from 'react'
import { useCourses } from '../Components/CourseContext';

function FirstYearFilter() {

  const { fys, toggleFilter } = useCourses();

  return (
    <div className='toggle-filter'>
        <button className={`toggle-button ${fys ? "active" : ""}`}
        onClick={() => toggleFilter('FYS')}>
            FYS
        </button>
    </div>
  )
}

export default FirstYearFilter