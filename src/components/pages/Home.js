import React, { useState, useEffect } from 'react'
import '../../App.css'
import HeroSection from '../HeroSection'
import Footer from '../Footer'
import Maintainance from '../Maintainance'
import Navbar from '../Navbar'
import Homepageprog from '../Homepg_choose'
import About_us from '../About_us'
import Team from '../Team'
import Function from '../Function'
import S_Navbar from '../S_Navbar'
import S_hero from '../S_HeroSection'
import S_Function from '../S_Function'
import Axios from 'axios'

function Home() {

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

  // return (
  //   <>
  //   <Maintainance/>
  //   </>
  // )
  if(role == 0 || isLoading){
  return (
    <>
      <Navbar></Navbar>
      <HeroSection />
      <Function></Function>
      <Homepageprog></Homepageprog>
      <About_us></About_us>
      <Team></Team>
      <Footer></Footer>
    </>
  )}else{
    return(
      <>
      <S_Navbar></S_Navbar>
      <S_hero />
      <S_Function></S_Function>
      <About_us></About_us>
      <Team></Team>
      <Footer></Footer>
    </>
    )
  }
}

export default Home
