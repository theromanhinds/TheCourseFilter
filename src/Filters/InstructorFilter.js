import React, { useState, useRef, useEffect } from 'react';
import { useCourses } from '../Components/CourseContext';

function InstructorFilter() {
  const { selectedInstructors, uniqueInstructors, toggleFilter } = useCourses();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

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
      {/* Button to toggle dropdown */}
      <button
        ref={buttonRef}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="dropdown-button"
      >
        Instructor {selectedInstructors.length > 0 && ` (${selectedInstructors.length})`}
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div ref={dropdownRef} className="dropdown-menu">
          {uniqueInstructors.map((instructor) => (
            <div
              key={instructor}
              className={`dropdown-item ${
                selectedInstructors.includes(instructor) ? 'selected' : ''
              }`}
              onClick={() => toggleFilter('instructor', instructor)}
            >
              {instructor}
              {selectedInstructors.includes(instructor) && (
            <span className="checkmark">&#10003;</span>
          )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InstructorFilter;
