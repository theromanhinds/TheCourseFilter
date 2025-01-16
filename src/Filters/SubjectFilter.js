import React, { useState, useEffect, useRef } from 'react';
import { useCourses } from '../Components/CourseContext';

function SubjectFilter() {
  const { selectedSubjects, uniqueSubjects, toggleFilter } = useCourses();
  // const [subjectSearch, setSubjectSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null); // Ref for the dropdown
  const buttonRef = useRef(null); // Ref for the button

  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside); // Cleanup
    };
  }, [isDropdownOpen]);

  // const handleSearchChange = (e) => {
  //   setSubjectSearch(e.target.value.toUpperCase());
  // };

  return (
    <div className='dropdown-filter'>
    {/* <div className="search-filter"> */}

      {/* <div className="search-box">
        <input
          className="search-box-input"
          type="text"
          placeholder="Subject"
          value={subjectSearch}
          onChange={handleSearchChange}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
        />
      </div>

      {isDropdownOpen && (
        <div className="dropdown">
          {uniqueSubjects.filter((subject) =>
              subject.toLowerCase().includes(subjectSearch.toLowerCase())
            ).map((subject) => (
              <div key={subject} className={`dropdown-item`} 
                    onClick={() => {
                      toggleFilter('subject', subject);
                      setSubjectSearch('');
                    }}>
                {subject}
              </div>
            ))}
        </div>
      )}

      {selectedSubjects.length > 0 && (
        <div className="active-filters">
          {selectedSubjects.map((subject) => (
            <div key={subject} className="active-filter-tag" 
                  onClick={() => toggleFilter('subject', subject)}>
              {subject} <span>&#10005;</span>
            </div>
          ))}
        </div>
      )} */}

  <button
    ref={buttonRef}
    className="dropdown-button"
    onClick={() => setIsDropdownOpen((prev) => !prev)}
  >
    Subject 

    {/* DISPLAYS NUMBER OF SUBJECTS SELECTED */}
    {selectedSubjects.length > 0 && ` (${selectedSubjects.length})`}
    
  </button>

  {isDropdownOpen && (
    <div ref={dropdownRef} className="dropdown-menu">
      {uniqueSubjects.map((subject) => (
        <div
          key={subject}
          className={`dropdown-item ${selectedSubjects.includes(subject) ? 'selected' : ''}`}
          onClick={() => toggleFilter('subject', subject)}
        >
          {subject}
          {selectedSubjects.includes(subject) && (
            <span className="checkmark">&#10003;</span>
          )}

        </div>
      ))}
    </div>
  )}

    {/* </div> */}
    </div>
  );
}

export default SubjectFilter;
