import React from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Prof from '../Profile_user'
// import C_Prof from '../C_Profile_user'

export default function Profile() {
  return (
    <>
      <Navbar></Navbar>
      <Prof></Prof>
      <Footer></Footer>
    </>
  )
}
