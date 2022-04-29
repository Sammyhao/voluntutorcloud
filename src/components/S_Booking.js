import React, { useState, useEffect } from 'react'
import { Divider } from '@mui/material'
import './Booking.css'
import Grid from '@mui/material/Grid'
import Loading from './Loading'
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
import { FaUser } from 'react-icons/fa'
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
export default function S_Booking() {
  const [cancelopen, setcancelopen] = useState(false)
  const [confirmopen, setconfirmopen] = useState(false)
  const [cancel, setcancel] = useState(true)
  const handlecancelclose = () => {
    setcancelopen(false)
  }
  const cancelmeeting = () => {
    setcancelopen(true)
    setcancel(false)
  }
  const handleconfirmopen = () => {
    setconfirmopen(false)
  }
  const confirmmeeting = () => {
    setconfirmopen(true)
    setcancel(false)
  }
  const [status, setStatus] = useState(0)
  const [isLoading1, setLoading1] = useState(true)
  const [isLoading2, setLoading2] = useState(true)
  const [contactInfo, setContactInfo] = useState([])
  const [bookingInfo, setBookingInfo] = useState([]);

  let username = '', studentname = '', teacherusername = "";
  const [teachername, setTeachername] = useState();

  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        username = response.data.user[0].username
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getLang', {
          username: username,
        }).then((response) => {
          console.log(response.data)
          if (response.data == 'chinese') setStatus(1)
          else setStatus(0)
          console.log(status)
          setLoading1(false)
        })
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getUserProfile', {
          username: username,
        }).then((response) => {
          console.log(response.data[0])
          studentname = response.data[0].lastname + response.data[0].firstname;
          console.log("studentname:");
          console.log(studentname);
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getTeacher', {
            studentname: studentname,
          }).then((response) => {
            console.log("response from findTeacher:");
            console.log(response);
            teacherusername = response;
            console.log("teacherusername:");
            console.log(teacherusername);
            setTeachername(teacherusername);
            Axios.post('https://voluntutorcloud-server.herokuapp.com/getBooking', {
              studentname: studentname,
              teachername: teacherusername,
            }).then((response) => {
              setBookingInfo(response.data);
            })
            setLoading2(false)
          })
        })
      },
    )
  })

  let a = ['Upcoming Meetings', '加入會議']
  // let teachername = 'Ruby'
  let date = '2022/5/12'
  let time = '18:00 ~ 19:00'
  let timeduration = '1.5 hr'
  let fulltime = date+" "+time;
  let j = ['Meeting Canceled', '會議已取消']
  let k = ['Meeting Booked', '會議已預約']
  let l = [
    "Oops, you are not paired with a teacher yet!",
    '噢, 目前您還未和老師成功配對！',
  ]
  let m = ['We will assign you a teacher soon!', '我們會盡快配對一位老師給您！']
  let n = ['Join', '加入會議']
  let o = ['Bookings', '預約會議']
  let p = ['Cancel', '拒絕']
  let q = ['Confirm', '確認']
  // 這裡true的條件改成是否有學生喔
  if (isLoading1 || isLoading2){
    return(
      <Loading/>
    )
  } else if(bookingInfo.length == 0){
    return (
      <div className="nokid">
        <div className="noStudentFont">{l[status]}</div>
        <div className="noStudentFont2">{m[status]}</div>
      </div>
    )
  }else {
    console.log(bookingInfo);
    return (
      <div className="outestcontainerbook">
        <div id="dialogcontainer">
          <BootstrapDialog
            onClose={handlecancelclose}
            id="diabook"
            aria-labelledby="customized-dialog-title"
            open={cancelopen}
          >
            <div className="bookingprogramdia">{j[status]}</div>
          </BootstrapDialog>
        </div>
        <div id="dialogcontainer">
          <BootstrapDialog
            onClose={handleconfirmopen}
            id="diabook"
            aria-labelledby="customized-dialog-title"
            open={confirmopen}
          >
            <div className="bookingconfirmheaders">{k[status]}</div>
            <div className="bookingconfirmcontent">
              {date} {time} {timeduration}
            </div>
          </BootstrapDialog>
        </div>
        <div className="bookingwraping">
          <div className="bookingwrappinginnerfirst">
            <div className="bookingtitleall">{a[status]}</div>

            <div className="bookingoutestwrap">
              <div className="bookingrow">
                <div className="bookingwrapsecond">
                  <div className="bookingwordswrapfirst">
                    <div className="bookingimageprog">
                      <FaUser className="bookingprog_avatar" />
                    </div>
                    <div className="bookingrequesttotal">
                      <div className="bookingrequestsub">{teachername}</div>
                      <div className="bookinrequesttime">{timeduration}</div>
                    </div>
                    <div className="bookingrequesttotaltime">
                      <div className="detailtimeforupcomings">{fulltime}</div>
                    </div>
                  </div>
                  <div className="bookingbuttonswrapping">
                    <div className="buttonbookingcheck">{n[status]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Divider className="lineforbooking"></Divider> */}
          <div className="bookingwrappinginnerfirst">
            <div className="bookingtitlebooking">{o[status]}</div>

            <div
              className="bookingwrappbottom"
              style={{ display: cancel ? 'block' : 'none' }}
            >
              <div className="bookingtime">
                <div className="bookingrequesttime">{date}</div>
              </div>
              <div className="bookingrow">
                <div className="bookingwrapsecond">
                  <div className="bookingwordswrapfirst">
                    <div className="bookingimageprog">
                      <FaUser className="bookingprog_avatar" />
                    </div>
                    <div className="bookingrequesttotal">
                      <div className="bookingrequestsub">{teachername}</div>
                      <div className="bookinrequesttime">{timeduration}</div>
                    </div>
                    <div className="bookingrequesttotaltime">
                      <div className="detailtimeforbook">{fulltime}</div>
                    </div>
                  </div>
                  <div className="bookingbuttonswrapping">
                    <div className="buttonbookingcheck" onClick={cancelmeeting}>
                      {/* this is where meeting is cancelled */}
                      {p[status]}
                    </div>
                    <div
                      className="buttonbookingcheck"
                      onClick={confirmmeeting}
                    >
                      {/* this is where meeting is confirmed */}
                      {q[status]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } 
}
