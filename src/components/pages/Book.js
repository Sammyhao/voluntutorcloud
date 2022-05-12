import React, { useState, useEffect } from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import S_Booking from '../S_Booking'
import Book from '../Booking'
import Loading from '../Loading'
import Axios from 'axios'
import S_Navbar from '../S_Navbar'

export default function Appointment() {
  const [role, setRole] = useState("");
  const [isLoading, setLoading] = useState(true);
  let username = "";

  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        setRole(response.data.user[0].role);
        setLoading(false);
      }
    )
  })
  
  if(isLoading) {
    return(
      <>
      <Loading/>
      </>
    )
  } else {
    if (role == "teacher") {
      return (
        <>
          <Navbar></Navbar>
          <Book></Book>
          <Footer></Footer>
        </>
      )
    } else {
      return (
        <>
          <S_Navbar></S_Navbar>
          <S_Booking></S_Booking>
          <Footer></Footer>
        </>
      )
    }
  }
}
