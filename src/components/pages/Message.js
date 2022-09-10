import React, { useState, useEffect } from 'react'
import '../../App.css'
import S_Message from '../S_Msg'
import Message from '../Msg_new'
import Navbar from '../Navbar'
import { useSelector } from 'react-redux'

export default function Messages() {
  const user = useSelector((state) => state.user.value)

  return (
    <>
      <Navbar></Navbar>
      {user.role ? <Message></Message> : <S_Message></S_Message>}
    </>
  )
}
