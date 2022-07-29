// imports
import React, { useEffect, useState } from 'react'
import '../App.css'
import './HeroSection.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { useSelector } from 'react-redux'

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

  const user = useSelector((state) => state.user.value)
  console.log('store data: ', user)
  useEffect(() => {
    setIsLoggedIn(user.login)
    setStatus(user.language)
    setName(user.name)
    setRole(user.role)
  })

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
