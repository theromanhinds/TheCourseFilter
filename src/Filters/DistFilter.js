import React, { useState, useRef, useEffect } from 'react';
import { useCourses } from '../Components/CourseContext';

function DistFilter() {
  const { uniqueDistSimple, selectedDistSimple, toggleFilter } = useCourses();
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
        Dist {selectedDistSimple.length > 0 && ` (${selectedDistSimple.length})`}
      </button>
      {isDropdownOpen && (
        <div ref={dropdownRef} className="dropdown-menu">
          {uniqueDistSimple.map((dist) => (
            <div
              key={dist}
              className={`dropdown-item ${selectedDistSimple.includes(dist) ? 'selected' : ''}`}
              onClick={() => toggleFilter('distSimple', dist)}
            >
              {dist}
              {selectedDistSimple.includes(dist) && <span className="checkmark">&#10003;</span>}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DistFilter;
