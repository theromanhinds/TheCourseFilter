import React from 'react'
import { useState } from 'react';
import { useCourses } from '../Components/CourseContext';

function TimeFilter() {

  const { uniqueTimes, selectedTimes, setSelectedTimes, toggleFilter } = useCourses();

  // Handles state of text in the search field.
  const [timeSearch, setTimeSearch] = useState('');
  // Controls the open and closing of dropdown menu.
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handles text field input change
  const handleSearchChange = (e) => {
    setTimeSearch(e.target.value);
  };

  // Handles time selection or deselection
  const handleTimeSelect = (time) => {
    setSelectedTimes((prevSelectedTimes) => {
      if (prevSelectedTimes.includes(time)) {
        return prevSelectedTimes.filter((s) => s !== time);
      } else {
        return [...prevSelectedTimes, time];
      }
    });
    setTimeSearch('');
  };
   
     return (
       <div className="SearchFilterContainer">
   
         <p>Filter by Time</p>
   
         {/* SEARCH BOX */}
         <div className="SearchBox">
           <input
             className='SearchBoxInput'
             type="text"
             placeholder="8:00am"
             maxLength={"15"}
             value={timeSearch}
             onChange={handleSearchChange}
             onFocus={() => setIsDropdownOpen(true)}
             onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delay to allow click selection
           />
         </div>
         {/* SEARCH BOX */}
   
         {/* DROP DOWN MENU */}
         {isDropdownOpen && ( <div className="DropdownContainer">
   
             <div className="DropdownList">
   
               {uniqueTimes.filter((time) =>
                 time.includes(timeSearch)
                 ).map((time) => ( 
                   
                   <div key={time} className="DropdownItem"
                        onClick={() => toggleFilter('time', time)}>
                     {time} 
                   </div>
   
               ))}
   
             </div>
   
         </div>)}
         {/* DROP DOWN MENU */}
   
         {/* ACTIVE FILTERS */}
         {selectedTimes.length > 0 && (
           <div className="ActiveFilters">
             {selectedTimes.map((time) => (
               <div
                 key={time}
                 className="ActiveFilterTag"
                 onClick={() => toggleFilter('time', time)}
               >
                 {time} <span style={{ marginLeft: '5px' }}>&#10005;</span>
               </div>
             ))}
           </div>
         )}
         {/* ACTIVE FILTERS */}
   
       </div>
     );
   }

export default TimeFilter