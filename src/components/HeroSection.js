import React, { useEffect, useState } from 'react'
import '../App.css'
import './HeroSection.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'

function HeroSection() {
  Axios.defaults.withCredentials = true
  let username = "";
  const [status, setStatus] = useState(0);
  
  let a = ["WELCOME","歡迎"]
  let b = ["Let's Create a Better Community Together!" ,"和我們一起創造一個更美好的社區吧！"]
  let c = ["Get Started","註冊帳號"]
  let d = ["LOGIN","登入"]
  
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
      if (response.data.isLoggedIn) {
        username = response.data.user[0].username;
      }
      setIsLoggedIn(response.data.isLoggedIn)
      Axios.post('https://voluntutorcloud-server.herokuapp.com/getLang', {
        username: username,
      }).then((response) => {
        console.log(response.data);
        if(response.data == "chinese") setStatus(1);
        else setStatus(0);
        console.log(status);
      })
      Axios.post('https://voluntutorcloud-server.herokuapp.com/getStatus', {
        username: username,
      }).then(response => {
        console.log(response.data);
        setName(response.data[0].firstname + " " + response.data[0].lastname);
        setLoading(false);
      })
    })
  }, [])

  if (!isLoggedIn || isLoading) {
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

export default HeroSection
