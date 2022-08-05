import React, { useState, useEffect } from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import S_Booking from '../S_Booking'
import Book from '../Booking'
import { useSelector } from 'react-redux'

export default function Appointment() {
  const [role, setRole] = useState(true)
  const user = useSelector((state) => state.user.value)
  console.log('store data: ', user)
  
  useEffect(() => {
    setRole(user.role)
  }, [])

  return (
    <>
      <Navbar></Navbar>
      {role ? <Book></Book> : <S_Booking></S_Booking>}
      <Footer></Footer>
    </>
  )
}
