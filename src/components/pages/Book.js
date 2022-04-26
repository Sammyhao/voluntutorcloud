import React from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import S_Book from '../S_Booking'
import Book from '../Booking'

export default function Appointment() {
  let role = 1;
  if(role==0){
  return (
    <>
      <Navbar></Navbar>
      <Book></Book>
      <Footer></Footer>
    </>
  )}else{
    return(
      <>
      <Navbar></Navbar>
      <S_Book></S_Book>
      <Footer></Footer>

      </>
    )
  }
}
