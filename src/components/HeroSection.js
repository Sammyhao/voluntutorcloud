// imports
import React, { useEffect, useState } from 'react'
import '../App.css'
import './HeroSection.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'

function HeroSection() {
  Axios.defaults.withCredentials = true

  // usestates
  const [status, setStatus] = useState(1)
  const [name, setName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState(true)
  // titles
  let a = ['WELCOME', '歡迎']
  let b = [
    "Let's Create a Better Community Together!",
    '和我們一起創造一個更美好的社區吧！',
  ]
  let c = ['Get Started', '註冊帳號']
  let d = ['LOGIN', '登入']
  let e = ["Let's Learn Together!", '和我們一起學習吧！']

  useEffect(() => {
    const user = useSelector((state) => state.user.value)
    console.log('store data: ', user)
    setIsLoggedIn(user.login)
    setStatus(user.language)
    setName(user.name)
    setRole(user.role)
  }, [])

  // const [record, setrecord] = useState([])
  // const filteredrec = new Map()

  // useEffect(() => {
  //   // if (!props.isLoggedIn) {
  //   //   console.log('not logged in')
  //   //   setIsLoggedIn(false)
  //   //   setStatus(0)
  //   // } else {
  //   //   console.log(props)
  //   //   if (props) {
  //   //     setIsLoggedIn(props.isLoggedIn)
  //   //     if (props.lang && props.name) {
  //   //       if(props.name) setName(props.name)
  //   //       if (props.lang == 'chinese') setStatus(1)
  //   //       else setStatus(0)
  //   //     }
  //   //   } else {
  //   // console.log('props failed')
  //   // Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
  //   //   (response) => {
  //   //     if (response.data.isLoggedIn) {
  //   //       if (name.length == 0) setName(response.data.user[0].firstname + ' ' + response.data.user[0].lastname)
  //   //       if (response.data.user[0].lang == 'chinese') setStatus(1)
  //   //       else setStatus(0)
  //   //     }
  //   //     setIsLoggedIn(response.data.isLoggedIn)
  //   //   },
  //   // )
  //   //   }
  //   // }
  //   if (props) {
  //     if (!props.isLoggedIn) {
  //       // not logged in
  //       console.log('not logged in')
  //       setIsLoggedIn(false)
  //       setStatus(0)
  //     } else {
  //       // logged in
  //       setIsLoggedIn(true)
  //       if (props.name) {
  //         // if(props.name == "Sam Hao") {
  //         //   Axios.get('https://voluntutorcloud-server.herokuapp.com/getallrecord').then((response) => {
  //         //     console.log(response.data);
  //         //     setrecord(response.data);
  //         //   })
  //         // }
  //         setName(props.name)
  //       }
  //       if (props.lang == 'chinese') setStatus(1)
  //       else setStatus(0)
  //     }
  //   } else {
  //     console.log('props failed')
  //     Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
  //       (response) => {
  //         if (response.data.isLoggedIn) {
  //           if (name.length == 0)
  //             setName(
  //               response.data.user[0].firstname +
  //                 ' ' +
  //                 response.data.user[0].lastname,
  //             )
  //           // if(response.data.user[0].firstname + ' ' + response.data.user[0].lastname == "Sam Hao")
  //           if (response.data.user[0].lang == 'chinese') setStatus(1)
  //           else setStatus(0)
  //         }
  //         setIsLoggedIn(response.data.isLoggedIn)
  //       },
  //     )
  //   }
  // }, [record])

  return (
    <div className="hero-container">
      <div className="left_hero">
        <img className="pic_hero" src="/images/vc_logo.png" />
      </div>
      <div className="right_hero">
        {isLoggedIn ? (
          <div>
            <h1 id="loggedintitle">
              {a[status]}, {name}
            </h1>
            <div id="loggedinsub">{b[status]}</div>
          </div>
        ) : (
          <div>
            <h1 id="homePageTitle">{a[status]}</h1>
            <p id="homePageSubTitle">
              {role ? <div>{b[status]}</div> : <div>{e[status]}</div>}
            </p>
            <div className="hero-btns">
              <Link to="/register" className="btn-mobile">
                <div className="btn-hero">{c[status]}</div>
              </Link>
              <Link to="/sign-in" className="btn-mobile">
                <div className="btn-hero">{d[status]}</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection
