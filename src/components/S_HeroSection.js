// imports
import React, { useEffect, useState } from 'react'
import '../App.css'
import './HeroSection.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Loading from './Loading'

function S_HeroSection(props) {
  Axios.defaults.withCredentials = true

  const [status, setStatus] = useState(0);
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // titles
  let a = ["WELCOME","歡迎"]
  let b = ["Let's Learn Together!" ,"和我們一起學習吧！"]
  let c = ["Get Started","註冊帳號"]
  let d = ["LOGIN","登入"]
  
  useEffect(() => {
    console.log(props);
    if(props.isLoggedIn) {
      setIsLoggedIn(props.isLoggedIn);
      if(props.lang && props.name) {
        setName(props.name);
        if(props.lang == "chinese") setStatus(1);
        else setStatus(0);
      }
    } else {
      console.log("props failed")
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
        if (response.data.isLoggedIn) {
          if(response.data.user[0].lang == "chinese") setStatus(1);
          else setStatus(0);
        }
        setIsLoggedIn(response.data.isLoggedIn)
        setName(response.data.user[0].firstname + " " + response.data.user[0].lastname);
      })
    }
  }, [])
  
  if (!isLoggedIn) {
    return (
      <div className="hero-container">
        <div className="left_hero">
          <img className="pic_hero" src="/images/vc_logo.png" />
        </div>
        <div className="right_hero">
          <h1 id="homePageTitle">{a[status]}</h1>
          <p id="homePageSubTitle">{b[status]}</p>
          <div className="hero-btns">
            <Link to="/register" className="btn-mobile">
              <div className="btn-hero">{c[status]}</div>
            </Link>
            <Link to="/sign-in" className="btn-mobile">
              <div className="btn-hero">{d[status]}</div>
            </Link>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="hero-container">
        <div className="left_hero">
          <img className="pic_reg" src="/images/vc_logo.png" />
        </div>
        <div className="right_hero">
          <h1 id="loggedintitle">{a[status]}, {name} </h1>
          <div id="loggedinsub">{b[status]}</div>
        </div>
      </div>
    )
  }
}

export default S_HeroSection
