import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Prof from '../Profile_user'
import S_Prof from '../S_Profile_user'
import Loading from '../Loading'
import S_Navbar from '../S_Navbar'

export default function Profile() {
  const [role, setRole] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

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

  } else{
    if (role == "teacher") {
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
          <S_Navbar></S_Navbar>
          <S_Prof></S_Prof>
          <Footer></Footer>
        </>
      )
    }
  }
}
