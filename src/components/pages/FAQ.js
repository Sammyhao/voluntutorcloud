import React, { useState, useEffect } from 'react'
import '../../App.css'
import FAQ from '../FAQs'
import Footer from '../Footer'
import Navbar from '../Navbar'

export default function Appointment() {
  return (
    <>
      <Navbar></Navbar>
      <FAQ></FAQ>
      <Footer></Footer>
    </>
  )
}
