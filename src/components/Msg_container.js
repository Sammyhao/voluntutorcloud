import React, { useState, useEffect } from 'react'
import { Msg_user } from './Msg_user'
import { Contextmenu } from './Contextmenu'
export const Msg_container = ({ message, role }) => {
  const [show, setshow] = useState(false)
  const [points, setpoints] = useState({ top: 0, left: 0 })
  const [msginf, setmsginfo] = useState({})
  console.log(role)
  useEffect(() => {
    const handleclick = () => {
      setshow(false)
    }
    window.addEventListener('click', handleclick)
    return () => window.removeEventListener('click', handleclick)
  }, [])

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {message.map((msg) => {
        let flag = role && msg.sender == 'T'
        let flag_stu = !role && msg.sender == 'S'

        if (flag || flag_stu) {
          return (
            <div
              onContextMenu={(e) => {
                console.log('Context menu opened')
                e.preventDefault()
                setshow(true)
                setpoints({ top: e.pageX, left: e.pageY })
                setmsginfo(msg)
              }}
              style={{ width: 'fit-content', alignSelf: 'flex-end' }}
            >
              <Msg_user
                time={msg.sendtime}
                type={'user'}
                text={msg.msg}
                read={msg.isread}
              ></Msg_user>
            </div>
          )
        } else {
          return (
            <div style={{ width: 'fit-content' }}>
              <Msg_user
                time={msg.sendtime}
                type={'recipient'}
                text={msg.msg}
                read={msg.isread}
              ></Msg_user>
            </div>
          )
        }
      })}
      {show && (
        <Contextmenu top={points.top} left={points.left} msginfo={msginf} />
      )}
    </div>
  )
}
