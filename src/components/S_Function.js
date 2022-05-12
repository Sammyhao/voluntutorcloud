import React, { useEffect, useState } from 'react'
import './Function.css'
import { Link } from 'react-router-dom'
import { GrFavorite, GrPin } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { BsCalendarCheck } from 'react-icons/bs'
import { MdBookmarkBorder, MdOutlineSchool } from 'react-icons/md'
import { AiOutlineMessage, AiOutlineCalendar } from 'react-icons/ai'
import { SiGooglemeet } from 'react-icons/si'
import { RiFolder3Line } from 'react-icons/ri'
import Axios from 'axios'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { popoverClasses } from '@mui/material';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))
function getStatus(username) {
  Axios.post('https://voluntutorcloud-server.herokuapp.com/getStatus', {
    username: username,
  }).then((response) => {
    console.log(response.data[0]['LoginStatus'])
    return response.data[0]['LoginStatus']
  })
}

function S_Function() {
  Axios.defaults.withCredentials = true
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const [open, setOpen] = useState(false)
  let logged = []
  let a = ["BEGIN YOUR JOURNEY","開始你的旅程"]
  let b = ["Profile","我的檔案"]
  let c = ["Booking","預約會議"]
  let d = ["Usage","服務時數"]
  let e = ["Message","訊息"]
  let f = ["Teacher Portfolio","老師檔案"]
  let g = ["Sign in to unlock functions!!","登入以解鎖功能！"]
  let h = ["SIGN IN","登入"]
  let i = ["BEGIN YOUR JOURNEY!!","開始你的旅程！"]
  const BootstrapDialogTitle = (props) => {
    const { children, ...other } = props
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
      </DialogTitle>
    )
  }
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [status, setStatus] = useState(0);
  let name = "";
  
  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
      if (response.data.isLoggedIn) {
        setUsername(response.data.user[0].username)
        name = response.data.user[0].username;
        if(response.data.user[0].lang == "chinese") setStatus(1);
        else setStatus(0);
      }
      setIsLoggedIn(response.data.isLoggedIn)
    })
  }, [])
  if (isLoggedIn) {
    logged = [
      '/profile',
      '/book',
      '/program_usage',
      '/message',
      '/Student_portfolio',
    ]
    return (
<div className="container_func">
        <div className="title_function">{a[status]}</div>
        <div className="list_function">
          <div className="temprow">
            <Link className="func_link" to={logged[0]}>
              <div className="outcont_function">
                <div className="icon_func_odd">
                  <CgProfile className="icon_func"></CgProfile>
                </div>
                <div className="subtitle_func">{b[status]}</div>
              </div>
            </Link>
            <Link className="func_link" to={logged[1]}>
              <div className="outcont_function">
                <div className="icon_func_even">
                  <AiOutlineCalendar className="icon_func"></AiOutlineCalendar>
                </div>
                <div className="subtitle_func">{c[status]}</div>
              </div>
            </Link>
            <Link className="func_link" to={logged[2]}>
              <div className="outcont_function">
                <div className="icon_func_odd">
                  <GrPin className="icon_func"></GrPin>
                </div>
                <div className="subtitle_func">{d[status]}</div>
              </div>
            </Link>
          </div>
  
          <div className="temprow">
            <Link className="func_link" to={logged[3]}>
            <div className="outcont_function">
                <div className="icon_func_even">
                  <AiOutlineMessage className="icon_func"></AiOutlineMessage>
                </div>
                <div className="subtitle_func">{e[status]}</div>
              </div>
              
            </Link>
            <Link className="func_link" to={logged[4]}>
            <div className="outcont_function">
                <div className="icon_func_odd">
                  <RiFolder3Line className="icon_func"></RiFolder3Line>
                </div>
                <div className="subtitle_func">{f[status]}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container_func">
        <div id="dialog_reg_wrap">
        <BootstrapDialog
          onClose={handleClose}
          id = "dialog_registered"
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <div id="registeredsucc">
          {g[status]}
          </div>
          <Link to="/sign-in">
          <div id="return">
          {h[status]}
          </div>
          </Link>
        </BootstrapDialog>
        </div>
          <div className="title_function">{i[status]}</div>
          <div className="list_function">
            <div className="temprow">
                <div className="outcont_function" onClick = {() => {
                            setOpen(true);
                          }}>
                  <div className="icon_func_odd">
                    <CgProfile className="icon_func"></CgProfile>
                  </div>
                  <div className="subtitle_func">{b[status]}</div>
                </div>
                <div className="outcont_function" onClick = {() => {
                            setOpen(true);
                          }}>
                  <div className="icon_func_even">
                    <AiOutlineCalendar className="icon_func"></AiOutlineCalendar>
                  </div>
                  <div className="subtitle_func">{c[status]}</div>
                </div>
                <div className="outcont_function" onClick = {() => {
                            setOpen(true);
                          }}>
                  <div className="icon_func_odd">
                    <GrPin className="icon_func"></GrPin>
                  </div>
                  <div className="subtitle_func">{d[status]}</div>
                </div>
            </div>
    
            <div className="temprow">
              <div className="outcont_function" onClick = {() => {
                            setOpen(true);
                          }}>
                  <div className="icon_func_even">
                    <AiOutlineMessage className="icon_func"></AiOutlineMessage>
                  </div>
                  <div className="subtitle_func">{f[status]}</div>
                </div><div className="outcont_function" onClick = {() => {
                            setOpen(true);
                          }}>
                  <div className="icon_func_odd">
                    <RiFolder3Line className="icon_func"></RiFolder3Line>
                  </div>
                  <div className="subtitle_func">{e[status]}</div>
                </div>
            </div>
          </div>
        </div>)}
}
export default S_Function
