import React, { useState, useEffect } from 'react'
import '../../App.css'
import HeroSection from '../HeroSection'
import Footer from '../Footer'
import Maintainance from '../Maintainance'
import Navbar from '../Navbar'
// import Homepageprog from '../Homepg_choose'
import About_us from '../About_us'
import Team from '../Team'
import Function from '../Function'
import S_Navbar from '../S_Navbar'
import S_hero from '../S_HeroSection'
import S_Function from '../S_Function'
import Loading from '../Loading'
import Axios from 'axios'

function Home() {
  const [role, setRole] = useState('') // role of the user
  const [isLoading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [lang, setLang] = useState('') // lang of the user
  const [name, setName] = useState('')
  const [notif_data, setNotif_data] = useState([])

  // useEffect(() => {
  //   if (isLoading) {
  //     Axios.get('https://voluntutorcloud-server.herokuapp.com/login')
  //       .then((response) => {
  //         console.log(response.data)
  //         if (!response.data.isLoggedIn) {
  //           setIsLoggedIn(false)
  //           setLang('chinese')
  //           setLoading(false)
  //         } else {
  //           setIsLoggedIn(true)
  //           setLang(response.data.user[0].lang)
  //           setRole(response.data.user[0].role)
  //           setName(
  //             response.data.user[0].firstname +
  //               ' ' +
  //               response.data.user[0].lastname,
  //           )
  //           return Axios.post(
  //             'https://voluntutorcloud-server.herokuapp.com/getNotif',
  //             {
  //               username: response.data.user[0].username,
  //               isnew: true,
  //             },
  //           )
  //         }
  //       })
  //       .then((response) => {
  //         console.log(response.data)
  //         setNotif_data(response.data)
  //         setLoading(false)
  //       })
  //   }
  // })

  // return (
  //   <>
  //   <Maintainance/>
  //   </>
  // )

  // if (isLoading) {
  //   return (
  //     <>
  //       <Loading />
  //     </>
  //   )
  // } else {
  //   console.log(name)
  //   if (isLoggedIn == false) {
  //     return (
  //       <>
  //         <Navbar></Navbar>
  //         <HeroSection isLoggedIn={true} />
  //         <Function isLoggedIn={true}></Function>
  //         <About_us isLoggedIn={true}></About_us>
  //         <Team isLoggedIn={true}></Team>
  //         <Footer isLoggedIn={true}></Footer>
  //       </>
  //     )
  //   } else if (role == 'teacher') {
  //     return (
  //       <>
  //         <Navbar
  //           lang={lang}
  //           isLoggedIn={isLoggedIn}
  //           notifdata={notif_data}
  //         ></Navbar>
  //         <HeroSection lang={lang} isLoggedIn={isLoggedIn} name={name} />
  //         <Function lang={lang} isLoggedIn={isLoggedIn}></Function>
  //         {/* <Homepageprog lang={lang}></Homepageprog> */}
  //         <About_us lang={lang}></About_us>
  //         <Team lang={lang}></Team>
  //         <Footer lang={lang}></Footer>
  //       </>
  //     )
  //   } else {
  //     return (
  //       <>
  //         <S_Navbar lang={lang} isLoggedIn={isLoggedIn}></S_Navbar>
  //         <S_hero lang={lang} isLoggedIn={isLoggedIn} name={name} />
  //         <S_Function lang={lang} isLoggedIn={isLoggedIn}></S_Function>
  //         <About_us lang={lang}></About_us>
  //         <Team lang={lang}></Team>
  //         <Footer lang={lang}></Footer>
  //       </>
  //     )
  //   }
  // }
  return (
    <>
      <Navbar></Navbar>
      <HeroSection />
      <Function></Function>
      <About_us></About_us>
      <Team></Team>
      <Footer></Footer>
    </>
  )
}

export default Home
