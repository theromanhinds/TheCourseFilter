import React from 'react';
import CourseList from '../Components/CourseList';
import FilterMenu from '../Components/FilterMenu';

function Home() {

  return (
    <div className='App'>
      <FilterMenu />
      <CourseList />
    </div>
  );
}

export default Home;
