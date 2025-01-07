import React from 'react'

function CoursePopup({ popupCourse, closePopup }) {
  if (!popupCourse) return null;

  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-popup" onClick={closePopup}>
          &times;
        </button>
        <h2>{popupCourse.title}</h2>
        <p>{popupCourse.subject}</p>
        <p>Instructor: {popupCourse.instructor}</p>
        <p>Time: {popupCourse.times}</p>

        <p>courseId: {popupCourse.courseId}</p>
        <p>courseType: {popupCourse.courseType}</p>
        <p>credits: {popupCourse.credits}</p>
        <p>days: {popupCourse.days}</p>
        <p>distSimple: {popupCourse.distSimple}</p>
        <p>enrolLimit: {popupCourse.enrolLimit}</p>

        <p>note: {popupCourse.note}</p>
        <p>room: {popupCourse.room}</p>
        <p>subject: {popupCourse.subject}</p>
        <p>writing: {popupCourse.writing}</p>
      </div>
    </div>
  );
}

export default CoursePopup;