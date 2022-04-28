import React from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Port_nav'
import Port from '../Portfolio'
import S_Port from '../S_Portfolio'

export default function Student_portfolio() {
  let role = 1;
  if(role==0){
  return (
    <>
      <Navbar></Navbar>
      <Port></Port>
      <Footer></Footer>
    </>
  )}else{
    return (
      <>
        <Navbar></Navbar>
        <S_Port></S_Port>
        <Footer></Footer>
      </>
    )
  }
}
