import React from 'react'
import '../../App.css'
import HeroSection from '../HeroSection'
import Footer from '../Footer'
import Navbar from '../Navbar'
import About_us from '../About_us'
import Team from '../Team'
import Function from '../Function'

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection/>
      <Function></Function>
      <About_us></About_us>
      <Team></Team>
      <Footer></Footer>
    </>
  )
}

export default Home
