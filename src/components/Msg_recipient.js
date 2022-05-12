import React from 'react'
import './Msg.css'
import { FaUser } from 'react-icons/fa'

export const Msg_recipient = ({ text }) => {
  return (
    <div className="student_msg">
      <div className="chatava">
        <FaUser className="msg_icon" />
      </div>
      <div className="words_student">{text}</div>
    </div>
  )
}
