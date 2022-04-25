import React, { useState, useEffect } from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import './Navbar.css'
import Dropdown from './Dropdown'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { S_SidebarData } from './S_SidebarData'
import { C_S_SidebarData } from './C_S_SidebarData'

import { IconContext } from 'react-icons'
import Axios from 'axios'
import '@progress/kendo-theme-default/dist/all.css'
import { HashLink } from "react-router-hash-link";

function S_Navbar() {
  // global variable!
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [status, setStatus] = useState(0);
  let username = "";
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
  let a = ["Home","首頁"]
  // let b = ["Programs","志工計畫"]
  let c = ["Contact","聯絡我們"]
  let d = ["SIGN IN/UP","登入/註冊"]
  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
      setIsLoggedIn(response.data.isLoggedIn)
      username = response.data.user[0].username;
      Axios.post('https://voluntutorcloud-server.herokuapp.com/getLang', {
        username: username,
      }).then((response) => {
        console.log(response.data);
        if(response.data == "chinese") setStatus(1);
        else setStatus(0);
        console.log(status);
      })
    })
  }, [])
  // global variable!
  const [dropdown, setDropDown] = useState(false)
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropDown(false)
    } else {
      setDropDown(true)
    }
  }
  const onMouseLeave = () => {
    setDropDown(false)
  }
  const showButton = () => {
    if (window.innerWidth <= 1080) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener('resize', showButton)
  if (isLoggedIn) {
    if(status ==0){
      return (
        <>
          <div className="navbar">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Voluntutor Cloud
              {/* <i class="fab fa-typo3" /> */}
            </Link>
            <div className="navbar-container-logged">
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-m active' : 'nav-m'}>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                    {a[status]}
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  
                  {c[status]}
                  </Link>
                </li>
              </ul>
            </div>
            <Link to="#" className="menu-bars">
              <FaBars className="icons_nav" onClick={showSidebar}></FaBars>
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link className="menu-bars" to="#">
                  <CgClose className="icons_cross"></CgClose>
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="navwords">{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </>
      )
    }else{
      return (
        <>
          <div className="navbar">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Voluntutor Cloud
              {/* <i class="fab fa-typo3" /> */}
            </Link>
            <div className="navbar-container-logged">
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-m active' : 'nav-m'}>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                    {a[status]}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  
                  {c[status]}
                  </Link>
                </li>
              </ul>
            </div>
            <Link to="#" className="menu-bars">
              <FaBars className="icons_nav" onClick={showSidebar}></FaBars>
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link className="menu-bars" to="#">
                  <CgClose className="icons_cross"></CgClose>
                </Link>
              </li>
              {C_S_SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="navwords">{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </>
      )
    }
  } else {
    return (
      <>
        <div className="navbar">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Voluntutor Cloud
            {/* <i class="fab fa-typo3" /> */}
          </Link>
          <div className="navbar-container">
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-m active' : 'nav-m'}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                {a[status]}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                {c[status]}
                
                </Link>
              </li>
              <li className="nav-buttonsign">
                <Link to="/sign-in">
                  {button && (
                    <Button buttonStyle="btn--outline">{d[status]}</Button>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default S_Navbar
