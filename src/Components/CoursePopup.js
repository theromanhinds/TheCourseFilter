import React from 'react'

function CoursePopup({ popupCourse, closePopup }) {
  if (!popupCourse) return null;

  return (
    <div className="popup-overlay" onClick={closePopup}>

      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className='popup-header'>
          <h2>{popupCourse.title}</h2>
          <button className="close-popup" onClick={closePopup}>
            &times;
          </button>
        </div>

        <div className='popup-content'>
          <h3>{popupCourse.subject} {popupCourse.courseNum}  {popupCourse.distSimple ? `(${popupCourse.distSimple})` : <></>}</h3>
          <p>{popupCourse.days} / {popupCourse.times} / {popupCourse.room}</p>

          <p>{popupCourse.instructor}</p>

          {/* <p>courseId: {popupCourse.courseId}</p> */}
          {/* <p>courseType: {popupCourse.courseType}</p> */}
          <p>{popupCourse.credits} credit</p>
          <p>{popupCourse.enrolLimit ? `Class size: ${popupCourse.enrolLimit}` : 'Class size: Unknown'}</p>

          <p>{popupCourse.note === '0' ? <></> : `Addtional info: ${popupCourse.note}`}</p>
          <p>{popupCourse.writing === 'W' ? 'Writing Course (W)' : <></>}</p>
        </div>
      </div>
    </div>
  );
}

export default CoursePopup;