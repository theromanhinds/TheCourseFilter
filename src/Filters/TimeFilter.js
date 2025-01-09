import React from 'react'
import { useState } from 'react';
import { useCourses } from '../Components/CourseContext';

function TimeFilter() {

  const { uniqueTimes, selectedTimes, toggleFilter } = useCourses();
  const [timeSearch, setTimeSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    setTimeSearch(e.target.value);
  };
   
     return (
       <div className="search-filter">
      
         {/* SEARCH BOX */}
         <div className="search-box">
           <input
             className='search-box-input'
             type="text"
             placeholder="Time"
             maxLength={"15"}
             value={timeSearch}
             onChange={handleSearchChange}
             onFocus={() => setIsDropdownOpen(true)}
             onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delay to allow click selection
           />
         </div>
         {/* SEARCH BOX */}
   
         {/* DROP DOWN MENU */}
         {isDropdownOpen && ( 
          
          <div className="dropdown">
               {uniqueTimes.filter((time) =>
                 time.includes(timeSearch)
                 ).map((time) => ( 
                   
                   <div key={time} className="dropdown-item"
                    onClick={() => {
                      toggleFilter('time', time);
                      setTimeSearch('');
                    }}>
                     {time} 
                   </div>
   
               ))}
      
         </div>)}
         {/* DROP DOWN MENU */}
   
         {/* ACTIVE FILTERS */}
         {/* {selectedTimes.length > 0 && (
           <div className="active-filters">
             {selectedTimes.map((time) => (
               <div
                 key={time}
                 className="active-filter-tag"
                 onClick={() => toggleFilter('time', time)}>
                 {time} <span style={{ marginLeft: '5px' }}>&#10005;</span>
               </div>
             ))}
           </div>
         )} */}
         {/* ACTIVE FILTERS */}
   
       </div>
     );
   }

export default TimeFilter