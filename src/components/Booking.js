import React, { useState, useEffect } from 'react'
import { Divider } from '@mui/material'
import './Booking.css'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@material-ui/core/Typography'
import Axios from 'axios'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

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

let program = 0

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
}
export default function Booking() {
    const [noneopen, setnoneopen] = useState(false)
    const [open, setOpen] = useState(false)
    const [finalopen, setfinalopen] = useState(false)
    const handleClose = () => {
        setOpen(false)
      }
      const handlenoneclose = () => {
        setnoneopen(false)
      }
      const handlefinalclose = () => {
        setfinalopen(false)
      }
  const [date, setdate] = useState('')
  const [time, settime] = useState('')
  const [duration, setduration] = useState('')
  let status =0;
  let a = ["Book A Meeting", "預約會議"]
  let b = ["Send Invitation","傳送邀請"]
  let c = ["Date: ","日期："]
  let d = ["Enter the Date (Format: 2022/05/01)","請輸入日期 (格式：2022/05/01)"]
  let e = ["Time: ","時間："]
  let f = ["Enter the Time (Format: 18:00~19:00)","請輸入時間 (格式：18:00~19:00)"]
  let g = ["Duration: ","課程時長："]
  let h = ["Enter the Duration (Numbers only, format: 1.5)","請輸入課程時長 (僅限數字，格式：1.5)"]
let i = ["Please double check before you send the invitation.","在傳送前請再次確認資料是否有誤。"]
let j = ["Please fill in all the fields.","請完整填入資訊"]
let k = ["Booking Invitation sent. Please check the message box if the student is unavailable during the time.","會議邀請已傳送，請留意聊天室訊息以確定學生能參加此時段的會議。"]
const sendfirst = () =>{
   if(date=="" || time ==""|| duration ==""){
        setnoneopen(true)
   } else{
       setOpen(true)
   }
}  
const sendsecond = () =>{
  setOpen(false)
  // save the data here (date,time,duration)
  setfinalopen(true)
}  
return (
      <div className='outestcontainerbook'>
        <div id="dialogcontainer">
        <BootstrapDialog
        onClose={handleClose}
        id="diabook"
        aria-labelledby="customized-dialog-title"
        open={open}
        >
      <div className="bookingprogramdia"> {i[status]}</div>
      <div className="bookingprogramdia_sub">
      {c[status]}{date}</div>
      <div className="bookingprogramdia_sub">
      {e[status]}{time}</div>
      <div className="bookingprogramdia_sub">
      {g[status]}{duration}</div>
      <div className = "sendbookwrapper">
      <div className = "sendbookingbtn" onClick={sendsecond}>{b[status]}</div>
      </div>
        </BootstrapDialog>
        </div>
        <div id="dialogcontainer">
        <BootstrapDialog
        onClose={handlenoneclose}
        id="diabook"
        aria-labelledby="customized-dialog-title"
        open={noneopen}
        >
      <div className="bookingprogramdia">{j[status]}</div>
        </BootstrapDialog></div>
        <div id="dialogcontainer">
        <BootstrapDialog
        onClose={handlefinalclose}
        id="diabook"
        aria-labelledby="customized-dialog-title"
        open={finalopen}
        >
      <div className="bookingfinal">{k[status]}</div>
        </BootstrapDialog></div>
        <div className = "outerbook">
        <div className = "topbarbook">
        <div className = "titlebook">{a[status]}</div>
        <div className = "bookbtn" onClick={sendfirst}>{b[status]}</div>
        </div>
        <Divider></Divider>
        <div className = "inputbook_outercont">
        <div className="titlebooksub">{c[status]} </div>
        <input
            className="inputbook"
            type="text"
              placeholder={d[status]}
              value={date}
              maxLength={10}
            onChange={(e) => {
                setdate(e.target.value)
            }}
          />
        </div>
        <Divider></Divider>
        <div className = "inputbook_outercont">
        <div className="titlebooksub">{e[status]} </div>
            <input
            className="inputbook"
            type="text"
              placeholder={f[status]}
              value={time}
              maxLength={11}
            onChange={(e) => {
                settime(e.target.value)
            }}
          />
        </div>
        <Divider></Divider>
        <div className = "inputbook_outercont">
        <div className="titlebooksub">{g[status]}</div>
        <input
            className="inputbook"
            type="number"
              placeholder={h[status]}
              value={duration}
            onChange={(e) => {
                setduration(e.target.value)
            }}
          />
        </div>
        </div>
    </div>
  )
}
