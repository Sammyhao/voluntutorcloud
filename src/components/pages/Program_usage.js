import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Prog from '../Programusage'
import S_prog from '../S_Programusage'
import Loading from '../Loading'
import S_Navbar from '../S_Navbar'

export default function Programusage() {
  const [role, setRole] = useState("");
  const [isLoading, setLoading] = useState(true);
  let username = "";

  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        setRole(response.data.user[0].role);
        setLoading(false);
      }
    )
  })
  
  if(isLoading) {
    return(
      <>
      <Loading/>
      </>
    )

  } else {
    if (role == "teacher") {
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
          <S_Navbar></S_Navbar>
          <S_prog></S_prog>
          <Footer></Footer>
        </>
      )
    }
  }
}
