import React, { useState, useEffect } from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import S_Booking from '../S_Booking'
import Book from '../Booking'
import { useSelector } from 'react-redux'

export default function Appointment() {
  const user = useSelector((state) => state.user.value)

  return (
    <>
      <Navbar></Navbar>
      {user.role ? <Book></Book> : <S_Booking></S_Booking>}
      <Footer></Footer>
    </>
  )
}
