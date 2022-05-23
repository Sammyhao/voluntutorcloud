import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Grid from '../Grid'
import Loading from '../Loading'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useLocation } from 'react-router-dom';


function Subjects(props) {
  const [subject, setSubject] = useState("")
  const location = useLocation()
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [lang, setLang] = useState(""); // lang of the user

  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        console.log(response.data);
        if(!response.data.isLoggedIn) {
          setIsLoggedIn(false);
        }else{
          setIsLoggedIn(true);
          setLang(response.data.user[0].lang);
          console.log("language: ",lang)
        }
        setLoading(false);
      }
    )

    if(location.state) {
      setSubject(location.state.subject);
    }
    setLoading(false);
  }, [location.state])

  if(isLoading) {
    return (
      <>
        <Loading></Loading>
      </>
    )
  } else {
    return (
      <>
        <Navbar lang = {lang} isLoggedIn={isLoggedIn}></Navbar>
        <Grid sub={subject}></Grid>
        <Footer lang = {lang}></Footer>
      </>
    )
  }
}

export default Subjects
