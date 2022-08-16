import React, { useState, useEffect } from 'react'
import { Msg_user } from './Msg_user'
import { Contextmenu } from './Contextmenu'
import { useSelector } from 'react-redux'

export const Msg_container = ({ message, role }) => {
  const [show, setshow] = useState(false)
  const [points, setpoints] = useState({ top: 0, left: 0 })
  const [msginf, setmsginfo] = useState({})
  let a = ['The message has been redrawn by the sender', '訊息已收回']
  const user = useSelector((state) => state.user.value)
  const [status, setStatus] = useState(1)

  console.log(role)
  useEffect(() => {
    setStatus(user.language)
    const handleclick = () => {
      setshow(false)
    }
    window.addEventListener('click', handleclick)
    return () => window.removeEventListener('click', handleclick)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {message.map((msg) => {
        if (msg.hidden == 1) {
          return <div className="unsentmsg">{a[status]}</div>
        } else {
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
                  unsend={msg.hidden}
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
                  unsend={msg.hidden}
                ></Msg_user>
              </div>
            )
          }
        }
      })}
      {show && (
        <Contextmenu top={points.top} left={points.left} msginfo={msginf} />
      )}
    </div>
  )
}
