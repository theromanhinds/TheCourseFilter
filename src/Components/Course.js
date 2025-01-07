import React from 'react'

function Course({course, displayPopup}) {
  return (
    <div className='course' onClick={displayPopup}>
      <div className='subject-number'>
        <h3>{course.subject ? course.subject : "___"}</h3> 
        <p>{course.courseNum ? course.courseNum : "___"}</p>
      </div>
      <div className='title-instructor'>
        <h3>{course.title ? course.title : "___"}</h3> 
        <p>{course.instructor ? course.instructor : "___"}</p>
      </div>
      <div className='dist-writing'>
        <h3>{course.distSimple ? course.distSimple : "___"}</h3> 
        <p>{course.writing ? course.writing : "___"}</p>
      </div>
      <div className='days-times'>
        <h3>{course.days ? course.days : "___"}</h3> 
        <p>{course.times ? course.times : "___"}</p>
      </div>
    </div>
  )
}

export default Course