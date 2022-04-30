import React, { useState, useEffect } from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import './Port_nav.css'
import Dropdown from './Dropdown'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { S_SidebarData } from './S_SidebarData'
import { C_S_SidebarData } from './C_S_SidebarData'

import { IconContext } from 'react-icons'
import Axios from 'axios'
import '@progress/kendo-theme-default/dist/all.css'

function S_Port_nav() {
  // global variable!
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
  let status = 0;
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
  if (status ==0){
  return (
    <>
      <div className="navbar_port">
        <div className="navbar-container-logged">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
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
          {S_SidebarData.map((item, index) => {
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
  )}else{
    return (
      <>
        <div className="navbar_port">
          <div className="navbar-container-logged">
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
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
}

export default S_Port_nav
