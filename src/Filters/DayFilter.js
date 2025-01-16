import React, { useState, useRef, useEffect } from 'react';
import { useCourses } from '../Components/CourseContext';

function DayFilter() {
  const { uniqueDays, selectedDays, toggleFilter } = useCourses();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

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

    if (isDropdownOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="dropdown-filter">
      <button
        ref={buttonRef}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="dropdown-button"
      >
        Days {selectedDays.length > 0 && ` (${selectedDays.length})`}
      </button>
      {isDropdownOpen && (
        <div ref={dropdownRef} className="dropdown-menu">
          {uniqueDays.map((day) => (
            <div
              key={day}
              className={`dropdown-item ${selectedDays.includes(day) ? 'selected' : ''}`}
              onClick={() => toggleFilter('days', day)}
            >
              {day}
              {selectedDays.includes(day) && <span className="checkmark">&#10003;</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DayFilter;
