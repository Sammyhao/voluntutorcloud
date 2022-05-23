import React, { useState, useEffect } from 'react'
import '../../App.css'
import S_Message from '../S_Msg'
import Message from '../Msg'
import S_Navbar from '../S_Navbar'
import Axios from 'axios'
import Loading from '../Loading'
import Navbar from '../Navbar'

export default function Messages() {
  const [role, setRole] = useState(""); // role of the user
  const [isLoading, setLoading] = useState(true);
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

  }else {
    if(role == "teacher"){
    return(
      <>
        <Navbar lang = {lang} isLoggedIn = {true}></Navbar>
        <Message></Message>
      </>
    )
    }else{
    return (
      <>
        <S_Navbar lang = {lang} isLoggedIn = {true}></S_Navbar>
        <S_Message></S_Message>
      </>
    )}
}}
