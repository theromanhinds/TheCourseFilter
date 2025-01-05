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
    <div className="search-filter">
      <p>Filter by Subject</p>

      <div className="search-box">
        <input
          className="search-box-input"
          type="text"
          placeholder="Search subject"
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
              <div key={subject} className={`dropdown-item ${selectedSubjects.includes(subject) ? 'selected' : ''}`} onClick={() => { toggleSubject(subject); setSubjectSearch('');}}>
                {subject}
              </div>
            ))}
        </div>
      )}

      {selectedSubjects.length > 0 && (
        <div className="active-filters">
          {selectedSubjects.map((subject) => (
            <div key={subject} className="active-filter-tag" onClick={() => toggleSubject(subject)}>
              {subject} <span>&#10005;</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default SubjectFilter;
