import React from 'react'
import { useState } from 'react';
import { useCourses } from '../Components/CourseContext';

function MobileInstructorFilter() {

    const { selectedInstructors, uniqueInstructors, toggleFilter } = useCourses();
    const [instructorSearch, setInstructorSearch] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handles text field input change
  const handleSearchChange = (e) => {
    setInstructorSearch(e.target.value);
  };

  // Handles instructor selection or deselection

  return (
    <div className="search-filter">

      <p>Filter by Instructor</p>

      {/* SEARCH BOX */}
      <div className="search-box">
        <input
          className='search-box-input'
          type="text"
          placeholder="Murphy"
          maxLength={"30"}
          value={instructorSearch}
          onChange={handleSearchChange}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delay to allow click selection
        />
      </div>
      {/* SEARCH BOX */}

      {/* DROP DOWN MENU */}
      {isDropdownOpen && ( <div className="dropdown">

            {uniqueInstructors.filter((instructor) =>
              instructor.toLowerCase().includes(instructorSearch.toLowerCase())
              ).map((instructor) => ( 
                
                <div key={instructor} className="dropdown-item"
                    onClick={() => {
                    toggleFilter('instructor', instructor);
                    setInstructorSearch('');
                  }}>
                  {instructor} 
                </div>

            ))}

      </div>)}
      {/* DROP DOWN MENU */}

      {/* ACTIVE FILTERS */}
      {selectedInstructors.length > 0 && (
        <div className="active-filters">
          {selectedInstructors.map((instructor) => (
            <div
              key={instructor}
              className="active-filter-tag"
              onClick={() => toggleFilter('instructor', instructor)}
            >
              {instructor} <span style={{ marginLeft: '5px' }}>&#10005;</span>
            </div>
          ))}
        </div>
      )}
      {/* ACTIVE FILTERS */}

    </div>
  );
}

export default MobileInstructorFilter