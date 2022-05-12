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
import Loading from '../Loading'
import Axios from 'axios'

function Home() {

  const [role, setRole] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        console.log(response.data);
        if(!response.data.isLoggedIn) {
          setIsLoggedIn(false);
          setLoading(false);
        }else {
          setIsLoggedIn(true);
          setRole(response.data.user[0].role);
          setLoading(false);
        }
      }
    )
  })

  // return (
  //   <>
  //   <Maintainance/>
  //   </>
  // )

  if(isLoading) {
    return(
      <>
      <Loading/>
      </>
    )

  }else {
    if(isLoggedIn == false) {
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
    )} else if(role == "teacher"){
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
    )} else {
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
  
}

export default Home
