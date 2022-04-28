import React from 'react'
import '../../App.css'
import Message from '../Msg'
import S_Navbar from '../S_Navbar'

import Navbar from '../Navbar'

export default function Messages() {
  let role = 0;
  if(role ==0){
    return(
      <>
        <Navbar></Navbar>
        <Message></Message>
      </>
    )
  }else{
  return (
    <>
      <S_Navbar></S_Navbar>
      <Message></Message>
    </>
  )}
}
