import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Prof from '../Profile_user'
import S_Prof from '../S_Profile_user'
import Loading from '../Loading'


export default function Profile() {
  const [role, setRole] = useState("");
  const [isLoading, setLoading] = useState(true);
  let username = "";

  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        username = response.data.user[0].username
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getRole', {
          username: username,
        }).then((response) => {
          console.log("role");
          console.log(response.data);
          setRole(response.data);
          setLoading(false);
        })
      }
    )
  })
  
  if(isLoading) {
    return(
      <>
      <Loading/>
      </>
    )

  } else if (role == 0) {
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
        <Navbar></Navbar>
        <S_Prof></S_Prof>
        <Footer></Footer>
      </>
    )
  }
}
