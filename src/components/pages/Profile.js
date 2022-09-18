import React, { useState, useEffect } from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Prof from '../Profile_user'
import S_Prof from '../S_Profile_user'
import { useSelector } from 'react-redux'

export default function Profile() {
  const user = useSelector((state) => state.user.value)

  return (
    <>
      <Navbar></Navbar>
      {user.role ? <Prof></Prof> : <S_Prof></S_Prof>}
      <Footer></Footer>
    </>
  )
}
