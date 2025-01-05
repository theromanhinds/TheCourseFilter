import React, { useState } from 'react';
import { useCourses } from '../Components/CourseContext';

function SubjectFilter() {
  const { selectedSubjects, uniqueSubjects, toggleSubject } = useCourses();
  const [subjectSearch, setSubjectSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSubjectSearch(e.target.value.toUpperCase());
  };

  return (
    <div className="SearchFilterContainer">
      <p>Filter by Subject</p>

      <div className="SearchBox">
        <input
          className="SearchBoxInput"
          type="text"
          placeholder="Search subject"
          value={subjectSearch}
          onChange={handleSearchChange}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
        />
      </div>

      {isDropdownOpen && (
        <div className="DropdownContainer">
          {uniqueSubjects.filter((subject) =>
              subject.toLowerCase().includes(subjectSearch.toLowerCase())
            ).map((subject) => (
              <div key={subject} className={`DropdownItem ${selectedSubjects.includes(subject) ? 'selected' : ''}`} onClick={() => { toggleSubject(subject); setSubjectSearch('');}}>
                {subject}
              </div>
            ))}
        </div>
      )}

      {selectedSubjects.length > 0 && (
        <div className="ActiveFilters">
          {selectedSubjects.map((subject) => (
            <div key={subject} className="ActiveFilterTag" onClick={() => toggleSubject(subject)}>
              {subject} <span>&#10005;</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default SubjectFilter;
