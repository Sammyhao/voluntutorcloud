import React, { useEffect, useState } from 'react'
import './Msg.css'
import { useSelector } from 'react-redux'
import Axios from 'axios'

export const Contextmenu = ({ top, left, msginfo }) => {
  const [status, setStatus] = useState(1)
  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    setStatus(user.language)
  }, [])

  const unsendmsg = () => {
    console.log('msg unsent')
    console.log(msginfo)
    Axios.post('https://voluntutorcloud-server.herokuapp.com/unsendMsg', {
      username: msginfo.username,
      studentname: msginfo.studentname,
      msg: msginfo.msg
    }).then((response) => {
      console.log(response.data);
    })
  }
  
  let a = ['Unsend', '收回']
  let x = top - 83 + 'px'
  let y = left + 'px'
  console.log(x, y)

  return (
    <div
      className="contextdropdownmenu"
      style={{
        top: y,
        left: x,
      }}
      onClick={unsendmsg}
    >
      {a[status]}
    </div>
  )
}
