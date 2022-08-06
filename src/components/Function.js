// imports
import React, { useEffect, useState } from 'react'
import './Function.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GrFavorite, GrPin } from 'react-icons/gr'
import { AiOutlineMessage, AiOutlineCalendar } from 'react-icons/ai'
import { SiGooglemeet } from 'react-icons/si'
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
  const [status, setStatus] = useState(1)

  const navigate = useNavigate()
  // titles
  let a = ['BEGIN YOUR JOURNEY!', '開始你的旅程！']
  let b = ['My List', '我的最愛']
  let c = ['Appointment', '會議安排']
  let d = ['Usage', '服務時數']
  let e = ['Message', '訊息']
  let f = ['Booking', '預約會議']
  let g = ['Sign in to unlock functions!!', '登入以解鎖功能！']
  let h = ['SIGN IN', '登入']

  const user = useSelector((state) => state.user.value)
  console.log('store data: ', user)

  useEffect(() => {
    setIsLoggedIn(user.login)
    setStatus(user.language)
  })

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
                navigate('/mylist')
              }
            }}
          >
            <div className="icon_func_odd">
              <GrFavorite className="icon_func"></GrFavorite>
            </div>
            <div className="subtitle_func">{b[status]}</div>
          </div>
          <div
            className="outcont_function"
            onClick={() => {
              if (!isLoggedIn) {
                setOpen(true)
              } else {
                navigate('/appointment')
              }
            }}
          >
            <div className="icon_func_even">
              <SiGooglemeet className="icon_func"></SiGooglemeet>
            </div>
            <div className="subtitle_func">{c[status]}</div>
          </div>
          <div
            className="outcont_function"
            onClick={() => {
              if (!isLoggedIn) {
                setOpen(true)
              } else {
                navigate('/program_usage')
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
                navigate('/book')
              }
            }}
          >
            <div className="icon_func_even">
              <AiOutlineCalendar className="icon_func"></AiOutlineCalendar>
            </div>
            <div className="subtitle_func">{f[status]}</div>
          </div>
          <div
            className="outcont_function"
            onClick={() => {
              if (!isLoggedIn) {
                setOpen(true)
              } else {
                navigate('/message')
              }
            }}
          >
            <div className="icon_func_odd">
              <AiOutlineMessage className="icon_func"></AiOutlineMessage>
            </div>
            <div className="subtitle_func">{e[status]}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Function
