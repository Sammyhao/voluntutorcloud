// imports
import React, { useEffect, useState } from 'react'
import './Function.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GrFavorite, GrPin } from 'react-icons/gr'
import { AiOutlineMessage, AiOutlineCalendar } from 'react-icons/ai'
import { SiGooglemeet } from 'react-icons/si'

import { BsGrid3X3Gap } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { RiFolder3Line } from 'react-icons/ri'
import Axios from 'axios'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

// dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
}

function Function() {
  Axios.defaults.withCredentials = true

  // usestates
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [open, setOpen] = useState(false)
  const [role, setrole] = useState(true)
  const [status, setStatus] = useState(1)
  const [logged, setlogged] = useState([
    '/subjects',
    '/book',
    '/program_usage',
    '/appointment',
    '/message',
  ])
  const [b, setb] = useState(['Programs', '志工計畫'])
  const [c, setc] = useState(['Booking', '預約會議'])
  const [d, setd] = useState(['Usage', '服務時數'])
  const [e, sete] = useState(['Appointment', '會議紀錄'])
  const [f, setf] = useState(['Message', '訊息'])
  const navigate = useNavigate()
  // titles
  let a = ['BEGIN YOUR JOURNEY!', '開始你的旅程！']
  let g = ['Sign in to unlock functions!!', '登入以解鎖功能！']
  let h = ['SIGN IN', '登入']
  const user = useSelector((state) => state.user.value)
  console.log('store data: ', user)

  useEffect(() => {
    setIsLoggedIn(user.login)
    setStatus(user.language)
    setrole(user.role)
    if (!user.role) {
      setlogged([
        '/profile',
        '/book',
        '/program_usage',
        '/message',
        '/Student_portfolio',
      ])
      setb(['Profile', '我的檔案'])
      setc(['Booking', '預約會議'])
      setd(['Usage', '服務時數'])
      sete(['Message', '訊息'])
      setf(['Teacher Portfolio', '老師檔案'])
    }
  }, [])
  return (
    <div className="container_func">
      <div id="dialog_reg_wrap">
        <BootstrapDialog
          onClose={() => {
            setOpen(false)
          }}
          id="dialog_registered"
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <div id="registeredsucc">{g[status]}</div>
          <Link to="/sign-in">
            <div id="return">{h[status]}</div>
          </Link>
        </BootstrapDialog>
      </div>
      <div className="about_ustitle">{a[status]}</div>
      <div className="list_function">
        <div className="temprow">
          <div
            className="outcont_function"
            onClick={() => {
              if (!isLoggedIn) {
                setOpen(true)
              } else {
                navigate(logged[0])
              }
            }}
          >
            <div className="icon_func_odd">
              {role ? (
                <BsGrid3X3Gap className="icon_func"></BsGrid3X3Gap>
              ) : (
                <CgProfile className="icon_func"></CgProfile>
              )}
            </div>
            <div className="subtitle_func">{b[status]}</div>
          </div>
          <div
            className="outcont_function"
            onClick={() => {
              if (!isLoggedIn) {
                setOpen(true)
              } else {
                navigate(logged[1])
              }
            }}
          >
            <div className="icon_func_even">
              <AiOutlineCalendar className="icon_func"></AiOutlineCalendar>
            </div>
            <div className="subtitle_func">{c[status]}</div>
          </div>
          <div
            className="outcont_function"
            onClick={() => {
              if (!isLoggedIn) {
                setOpen(true)
              } else {
                navigate(logged[2])
              }
            }}
          >
            <div className="icon_func_odd">
              <GrPin className="icon_func"></GrPin>
            </div>
            <div className="subtitle_func">{d[status]}</div>
          </div>
        </div>
        <div className="temprow">
          <div
            className="outcont_function"
            onClick={() => {
              if (!isLoggedIn) {
                setOpen(true)
              } else {
                navigate(logged[3])
              }
            }}
          >
            <div className="icon_func_even">
              {role ? (
                <SiGooglemeet className="icon_func"></SiGooglemeet>
              ) : (
                <AiOutlineMessage className="icon_func"></AiOutlineMessage>
              )}
            </div>
            <div className="subtitle_func">{e[status]}</div>
          </div>
          <div
            className="outcont_function"
            onClick={() => {
              if (!isLoggedIn) {
                setOpen(true)
              } else {
                navigate(logged[4])
              }
            }}
          >
            <div className="icon_func_odd">
              {role ? (
                <AiOutlineMessage className="icon_func"></AiOutlineMessage>
              ) : (
                <RiFolder3Line className="icon_func"></RiFolder3Line>
              )}
            </div>
            <div className="subtitle_func">{f[status]}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Function
