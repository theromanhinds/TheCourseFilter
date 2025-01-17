import React from 'react'
import { useCourses } from '../Components/CourseContext';

function WritingFilter() {

  const { writing, toggleFilter } = useCourses();

  return (
    <div className='toggle-filter'>
        <button className={`toggle-button ${writing ? "active" : ""}`}
        onClick={() => toggleFilter('writing')}>
            W
        </button>
    </div>
  )
}

export default WritingFilter