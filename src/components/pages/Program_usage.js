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
  const [role, setRole] = useState(""); // role of the user
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [lang, setLang] = useState(""); // lang of the user

  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        console.log(response.data);
        
          setLang(response.data.user[0].lang);
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
          <Navbar lang = {lang} isLoggedIn = {true}></Navbar>
          <Prog></Prog>
          <Footer lang = {lang}></Footer>
        </>
      )
    } else {
      return (
        <>
          <S_Navbar lang = {lang} isLoggedIn = {true}></S_Navbar>
          <S_prog></S_prog>
          <Footer lang = {lang}></Footer>
        </>
      )
    }
  }
}
