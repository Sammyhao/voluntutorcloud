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

function Navbar(props) {
  // const user = useSelector((state) => state.user.value)
  // console.log(user)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [status, setStatus] = useState(1)
  const [sidebar, setSidebar] = useState(false)
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const [notification, setnotification] = useState(false)
  const [name, setName] = useState('')

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
      ).then((response) => {
        // console.log(response)
      })
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

  // titles
  let a = ['Home', '首頁']
  let b = ['Programs', '志工計畫']
  let c = ['Contact', '聯絡我們']
  let d = ['SIGN IN/UP', '登入/註冊']

  const [notif_data, setNotif_data] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // console.log(props)
    if (isLoading) {
      if (props.lang && props.isLoggedIn) {
        if (!props.isLoggedIn) {
          // not logged in
          setIsLoggedIn(false)
          setLoading(false)
        } else {
          setIsLoggedIn(true) // logged in
          if (props.lang == 'chinese') setStatus(1)
          else setStatus(0)
          setLoading(false)
        }
      } else {
        // console.log('props failed')
        Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
          (response) => {
            // console.log(response.data)
            setName(response.data.user[0].username)
            setIsLoggedIn(response.data.isLoggedIn)
            if (response.data.user[0].lang === 'chinese') setStatus(1)
            else setStatus(0)
          },
        )
      }
    }
  }, [])

  useEffect(() => {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/getNotif', {
      username: name,
      isnew: true,
    }).then((response) => {
      // console.log(response.data)
      setNotif_data(response.data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    showButton()
  }, [])

  if (isLoading) {
    // return <Loading></Loading>
    return (
      <>
        <div className="navbar">
          <div className="logwrap">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Voluntutor Cloud
              {/* <i class="fab fa-typo3" /> */}
            </Link>
          </div>
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
                <Link
                  to="/subjects"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  {b[status]}
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
  } else if (isLoggedIn) {
    if (status == 0) {
      return (
        <>
          <div className="navbar">
            <div className="logwrap">
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                Voluntutor Cloud
                {/* <i class="fab fa-typo3" /> */}
              </Link>
            </div>
            <div className="navbar-container-logged">
              <div>
                <div className="menu-icon" onClick={handleClick}>
                  <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>

                <ul className={click ? 'nav-m active' : 'nav-m'}>
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {a[status]}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/subjects"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {b[status]}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {c[status]}
                    </Link>
                  </li>
                  <li className="menu-bell">
                    <FiBell
                      className="icons_nav"
                      onClick={shownotification}
                    ></FiBell>
                  </li>
                </ul>
              </div>
              <Link to="#" className="menu-bars">
                <FaBars className="icons_nav" onClick={showSidebar}></FaBars>
              </Link>
            </div>
            <nav className={notification ? 'notif active' : 'notif'}>
              <ul className="nav-menu-items" onClick={shownotification}>
                {notif_data.map((e, index) => {
                  // console.log(e)
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
        </>
      )
    } else {
      return (
        <>
          <div className="navbar">
            <div className="logwrap">
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                Voluntutor Cloud
                {/* <i class="fab fa-typo3" /> */}
              </Link>
            </div>
            <div className="navbar-container-logged">
              <div>
                <div className="menu-icon" onClick={handleClick}>
                  <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-m active' : 'nav-m'}>
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {a[status]}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/subjects"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {b[status]}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      {c[status]}
                    </Link>
                  </li>
                  <li className="menu-bell">
                    <FiBell
                      className="icons_nav"
                      onClick={shownotification}
                    ></FiBell>
                  </li>
                </ul>
              </div>
              <Link to="#" className="menu-bars">
                <FaBars className="icons_nav" onClick={showSidebar}></FaBars>
              </Link>
            </div>
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
                {C_SidebarData.map((item, index) => {
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
        </>
      )
    }
  } else {
    return (
      <>
        <div className="navbar">
          <div className="logwrap">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Voluntutor Cloud
              {/* <i class="fab fa-typo3" /> */}
            </Link>
          </div>
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
                <Link
                  to="/subjects"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  {b[status]}
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

export default Navbar
