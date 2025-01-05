import React from 'react'
import Course from './Course'
import { useCourses } from './CourseContext'

function CourseList() {

  const { filteredCourses, loading } = useCourses();

  if (loading) return <p>Loading courses...</p>;

  return (
    <div>
      <h3>Course List | {filteredCourses.length} courses</h3>

       {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <Course key={course.courseId} course={course}/>
        ))
      ) : (
        <p>No courses match the selected filters.</p>
      )}

    </div>
  )
}

export default CourseList