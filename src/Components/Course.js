import React from 'react'

function Course({course, displayPopup}) {
  return (

    // <div className='MobileCourse' onClick={displayPopup}>
    //     <div className='MobileCourseLeftDiv'>
    //         <h3>{course.title ? course.title : "___"}</h3> 
    //         <p>{course.instructor ? course.instructor : "___"}</p>
    //       <p>{course.subject ? course.subject : "___"} {course.courseNum ? course.courseNum : "___"}</p> 
    //     </div>
    //     <div className='MobileCourseRightDiv'>
    //         <h3>{course.days ? course.days : "___"}</h3> 
    //         <p>{course.times ? course.times : "___"}</p>
    //         <p>{course.distSimple ? course.distSimple : "___"} , {course.writing ? course.writing : "___"}</p>
    //     </div>
    //   </div>
    
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
      {/* <button className='favorite-button'>⭐</button> */}
    </div>
  )
}

export default Course