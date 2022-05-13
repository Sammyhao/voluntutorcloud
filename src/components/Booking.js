import React, { useState, useEffect } from 'react'
import { Divider } from '@mui/material'
import './Booking.css'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import { FaUser } from 'react-icons/fa'
import Typography from '@material-ui/core/Typography'
import Loading from './Loading'
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
  const [status, setStatus] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState([]);
  const [haveSetStatus, setHaveSetStatus] = useState(false);
  const [bookingInfo, setBookingInfo] = useState([]);
  const [bookingInfoLen, setBookingInfoLen] = useState(0);

  let username = "", studentname = "";
  const [name, setName] = useState("");
  
  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
      username = response.data.user[0].username;
      setName(username);
      if(response.data.user[0].lang == "chinese") setStatus(1);
      else setStatus(0);

      Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
        username: username
      }).then((response) => {
        setContactInfo(response.data);
        studentname = response.data[0].studentname;
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getBooking', {
          username: username,
          studentname: studentname,
          status: "confirmed"
        }).then((response) => {
          console.log(response);
          setBookingInfo(response.data);
          setBookingInfoLen(response.data.length)
          setLoading(false);
        })
      })
    })
  })


  
  let n = ["Oops, seems like you don't have any student yet.","噢, 看來您還沒有任何學生呢。"]
  let o = ["Go and Join a Volunteering Program!!", "趕快去報名志工活動吧！！"]
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


  let l = ['Upcoming Meetings', "即將到來的會議"]
  const sendfirst = () => {
    if(date== "" || time == "" || duration == ""){
          setnoneopen(true)
    } else{
        setOpen(true)
    }
  }  
  const sendsecond = () => {
    setOpen(false)
    // save the data here (date,time,duration)
    updateBooking();
    setfinalopen(true)
  }  

  const updateBooking = () => {
    if(bookingInfoLen) {
      console.log(name, contactInfo[0].studentname)
      Axios.post('https://voluntutorcloud-server.herokuapp.com/updateBooking', {
        username: name,
        studentname: contactInfo[0].studentname,
        date: date,
        time: time,
        duration: duration,
        status: "pending"
      }).then((response) => {
        console.log(response);
      })
    }
    setdate("")
    settime("")
    setduration("")
  }

  // 這裡true的條件改成是否有學生喔
  if(isLoading){
    console.log("contactinfo length: ",contactInfo.length)
    return(
      <Loading></Loading>
    )
  }else {
    console.log("bookingInfo:");
    console.log(bookingInfo);
    console.log(bookingInfoLen);
    if (contactInfo.length == 0){
    return(
      <div className = "nokid">
        <div className="noStudentFont">{n[status]}</div>
        <div className="noStudentFont2">{o[status]}</div>
      </div>
    )
  } else{
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
                <div className="outerbook_upcoming">
        <div className="topbarbook">
          <div className="titlebook">{l[status]}</div>
        </div>
        <Divider></Divider>
        <div className="bookingoutestwrap">
          <div className="bookingrow_teacher">
            <div className="bookingwrapsecond">
              <div className="bookingwordswrapfirst">
                <div className="bookingimageprog">
                  <FaUser className="bookingprog_avatar" />
                </div>
                <div className="bookingrequesttotal">
                  <div className="bookingrequestsub">Student Name</div>
                  <div className="bookinrequesttime">1 hr</div>
                </div>
                <div className="bookingrequesttotaltime">
                  <div className="detailtimeforupcomings">
                    05/12 or 13 19:00~20:00   Please check Line group for further information
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  )}}
}
