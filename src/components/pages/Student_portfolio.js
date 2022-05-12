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
  const [role, setRole] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  let username = "";
  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        console.log(response.data);
        if(!response.data.isLoggedIn) {
          setIsLoggedIn(false);
          setLoading(false);
        }else {
          setRole(response.data.user[0].role);
          setLoading(false);
        }
      }
    )
  })
  
  if(isLoading) {
    return(
      <>
      <Loading/>
      </>
    )

  } else{
    if (role == "teacher") {
      return (
        <>
        <Navbar></Navbar>
        <Port></Port>
        <Footer></Footer>
      </>
      )
    } else {
      return (
        <>
        <S_Navbar></S_Navbar>
        <S_Port></S_Port>
        <Footer></Footer>
      </>
      )
    }
  }
  
}
