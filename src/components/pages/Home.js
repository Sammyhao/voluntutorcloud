import React from 'react'
import '../../App.css'
import HeroSection from '../HeroSection'
import Footer from '../Footer'
import Navbar from '../Navbar'
import About_us from '../About_us'
import Team from '../Team'
import News from '../News'
import Collaboration from '../Collaboration'
import Specialthanks from '../Specialthanks'
import Function from '../Function'

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection />
      <Function></Function>
      <News></News>
      <About_us></About_us>
      <Team></Team>
      <Collaboration></Collaboration>
      <Specialthanks></Specialthanks>
      <Footer></Footer>
    </>
  )
}

export default Home
