import React from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Prog from '../Programusage'
import S_prog from '../S_Programusage'

export default function Programusage() {
  let role = 0
  if (role == 0) {
    return (
      <>
        <Navbar></Navbar>
        <Prog></Prog>
        <Footer></Footer>
      </>
    )
  } else {
    return (
      <>
        <Navbar></Navbar>
        <S_prog></S_prog>
        <Footer></Footer>
      </>
    )
  }
}
