import React, { useState } from 'react';
import CourseList from '../Components/CourseList';
import Header from '../Components/Header';
// import FilterMenu from '../Components/FilterMenu';

function Home() {

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const closeMenu = () => setIsFilterMenuOpen(false);

  return (
    <div className='App'>

      <div className={`overlay ${isFilterMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>

      {/* <FilterMenu isFilterMenuOpen={isFilterMenuOpen} setIsFilterMenuOpen={setIsFilterMenuOpen}/> */}

      <Header/>
      <CourseList isFilterMenuOpen={isFilterMenuOpen} setIsFilterMenuOpen={setIsFilterMenuOpen}/>

    </div>
  );
}

export default Home;
