// imports
import React, { useState, useEffect } from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { FaBars } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { SidebarData } from './SidebarData'
import { C_SidebarData } from './C_SidebarData'
import Axios from 'axios'
import '@progress/kendo-theme-default/dist/all.css'
import { FiBell } from 'react-icons/fi'
import { Divider } from '@material-ui/core'
import { useSelector } from 'react-redux'

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [status, setStatus] = useState(1)
  const [sidebar, setSidebar] = useState(false)
  const [role, setRole] = useState(true)
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const [notification, setnotification] = useState(false)
  const [name, setName] = useState('')

  const user = useSelector((state) => state.user.value)
  console.log('store data: ', user)
  useEffect(() => {
    setIsLoggedIn(user.login)
    setStatus(user.language)
    setName(user.name)
    setRole(user.role)
  })

  const showSidebar = () => setSidebar(!sidebar)
  const shownotification = () => {
    setnotification(!notification)
    for (let i = 0; i < notif_data.length; i++) {
      // console.log(notif_data[i])
      Axios.post(
        'https://voluntutorcloud-server.herokuapp.com/updateNotifStatus',
        {
          username: notif_data[i].username,
          type: notif_data[i].nottype,
          title: notif_data[i].title,
          content: notif_data[i].notcontent,
          isnew: false,
        },
      ).then((response) => {})
    }
  }
  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  const showButton = () => {
    if (window.innerWidth <= 1080) {
      setButton(false)
    } else {
      setButton(true)
    }
  }
  window.addEventListener('resize', showButton)
  const [notif_data, setNotif_data] = useState([])

  // titles
  let a = ['Home', '首頁']
  let b = ['Programs', '志工計畫']
  let bb = ['Bookings', '會議預約']
  let c = ['Contact', '聯絡我們']
  let d = ['SIGN IN/UP', '登入/註冊']

  useEffect(() => {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/getNotif', {
      username: name,
      isnew: true,
    }).then((response) => {
      setNotif_data(response.data)
    })
  }, [])

  useEffect(() => {
    showButton()
  }, [])

  return (
    <div className="navbar">
      <div className="logwrap">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Voluntutor Cloud
        </Link>
      </div>
      <div
        className={isLoggedIn ? 'navbar-container-logged' : 'navbar-container'}
      >
        <div>
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
              <Link
                to={role ? '/subjects' : '/book'}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                {role ? <div>{b[status]}</div> : <div>{bb[status]}</div>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                {c[status]}
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="menu-bell">
                <FiBell
                  className="icons_nav"
                  onClick={shownotification}
                ></FiBell>
              </li>
            ) : (
              <li className="nav-buttonsign">
                <Link to="/sign-in">
                  {button && (
                    <Button buttonStyle="btn--outline">{d[status]}</Button>
                  )}
                </Link>
              </li>
            )}
          </ul>
        </div>
        {isLoggedIn ? (
          <Link to="#" className="menu-bars">
            <FaBars className="icons_nav" onClick={showSidebar}></FaBars>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      {isLoggedIn ? (
        <div>
          <nav className={notification ? 'notif active' : 'notif'}>
            <ul className="nav-menu-items" onClick={shownotification}>
              {notif_data.map((e, index) => {
                return (
                  <div key={index} className="wrap">
                    <Link className="notif_link" to={e.nottype}>
                      <div className="outsidewrap">
                        <div className="notif_title">{e.title}</div>
                        <div className="notif_content">{e.notcontent}</div>
                      </div>
                    </Link>
                    <Divider></Divider>
                  </div>
                )
              })}
            </ul>
          </nav>
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
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Navbar
