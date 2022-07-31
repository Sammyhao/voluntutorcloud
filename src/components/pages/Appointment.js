import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Loading from '../Loading'
import App from '../Appointmentmeet'

export default function Appointment() {

  return (
    <>
      <Navbar></Navbar>
      <App></App>
      <Footer></Footer>
    </>
  )
}
