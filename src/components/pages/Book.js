import React, { useState, useEffect } from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import S_Booking from '../S_Booking'
import Book from '../Booking'
import Axios from 'axios'

export default function Appointment() {
  const [role, setRole] = useState("");
  const [isLoading, setLoading] = useState(true);
  let username = "";

  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        username = response.data.user[0].username
        Axios.get('https://voluntutorcloud-server.herokuapp.com/getRole', {
          username: username,
        }).then((response) => {
          console.log(response.data);
          setRole(response.data);
          setLoading(false);
        })
      }
    )
  })
  
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
        <Navbar></Navbar>
        <S_Booking></S_Booking>
        <Footer></Footer>
      </>
    )
  }
}
