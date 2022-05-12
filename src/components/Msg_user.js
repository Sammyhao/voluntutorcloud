import React from 'react'
import './Msg.css'
import { FaUser } from 'react-icons/fa'

export const Msg_user = ({ type, text }) => {
  if (type == 'user') {
    return (
      <div className="teacher_msg">
        <div className="words">{text}</div>
      </div>
    )
  } else {
    return (
      <div className="student_msg">
        <div className="chatava">
          <FaUser className="msg_icon" />
        </div>
        <div className="words_student">{text}</div>
      </div>
    )
  }
}
