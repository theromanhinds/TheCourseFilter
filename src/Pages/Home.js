import React, { useState } from 'react';
import CourseList from '../Components/CourseList';
import Header from '../Components/Header';
import FilterMenu from '../Components/FilterMenu';

function Home() {

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  return (
    <div className='App'>
      
      <FilterMenu isFilterMenuOpen={isFilterMenuOpen} setIsFilterMenuOpen={setIsFilterMenuOpen}/>

      <Header isFilterMenuOpen={isFilterMenuOpen} setIsFilterMenuOpen={setIsFilterMenuOpen}/>
      <CourseList isFilterMenuOpen={isFilterMenuOpen} setIsFilterMenuOpen={setIsFilterMenuOpen}/>

    </div>
  );
}

export default Home;
