import React from 'react'
import './Msg.css'

export const Msg_user = ({ text }) => {
  return (
    <div className="teacher_msg">
      <div className="words">{text}</div>
    </div>
  )
}
