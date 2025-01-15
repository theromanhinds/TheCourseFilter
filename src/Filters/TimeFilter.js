import React, { useState, useRef, useEffect } from 'react';
import { useCourses } from '../Components/CourseContext';

function TimeFilter() {
  const { uniqueTimes, selectedTimes, toggleFilter } = useCourses();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown
  const buttonRef = useRef(null); // Ref for the button

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="dropdown-filter">
      <button
        ref={buttonRef}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="dropdown-button"
      >
        Time
      </button>

      {isDropdownOpen && (
        <div ref={dropdownRef} className="dropdown-menu">
          {uniqueTimes.map((time) => (
            <div
              key={time}
              className={`dropdown-item ${selectedTimes.includes(time) ? 'selected' : ''}`}
              onClick={() => toggleFilter('time', time)}
            >

              {time}
              {selectedTimes.includes(time) && (
            <span className="checkmark">&#10003;</span>
          )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TimeFilter;
