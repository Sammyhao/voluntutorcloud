import React, { useState, useEffect } from 'react'
import './Msg.css'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export const Msg_user = ({ time, type, text }) => {
  const user = useSelector((state) => state.user.value)
  const [status, setStatus] = useState(1)
  useEffect(() => {
    setStatus(user.language)
  }, [])
  let a = ['Sent at', '傳送於']
  if (type == 'user') {
    return (
      <div className="teacher_msg">
        <div className="msg_time">
          {a[status]}
          <div
            style={{
              marginLeft: '5px',
            }}
          >
            {time.substring(5, time.length - 3)}
          </div>
        </div>
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
