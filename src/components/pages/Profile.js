import React from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Prof from '../Profile_user'
import S_Prof from '../S_Profile_user'

export default function Profile() {
  let role = 0
  if (role == 0) {
    return (
      <>
        <Navbar></Navbar>
        <Prof></Prof>
        <Footer></Footer>
      </>
    )
  } else {
    return (
      <>
        <Navbar></Navbar>
        <S_Prof></S_Prof>
        <Footer></Footer>
      </>
    )
  }
}
