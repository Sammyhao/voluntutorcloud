import React, { useState, useEffect } from 'react'
import '../../App.css'
import S_Message from '../S_Msg'
import Message from '../Msg'
import Navbar from '../Navbar'
import { useSelector } from 'react-redux'

export default function Messages() {
  const [role, setRole] = useState(true)
  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    setRole(user.role)
  })

  return (
    <>
      <Navbar></Navbar>
      {role ? <Message></Message> : <S_Message></S_Message>}
    </>
  )
}
