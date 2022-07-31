import React, { useState, useEffect } from 'react'
import '../../App.css'
import Axios from 'axios'
import Footer from '../Footer'
import Navbar from '../Port_nav'
import Port from '../Portfolio'
import S_Navbar from '../S_Port_nav'
import S_Port from '../S_Portfolio'
import Loading from '../Loading'

export default function Student_portfolio() {
  return (
    <>
      <Navbar></Navbar>
      <Port></Port>
      <Footer></Footer>
    </>
  )
}
