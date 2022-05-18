import React, { useState, useEffect } from 'react'
import { Divider } from '@mui/material'
import { MdOutlineArrowForwardIos, MdArrowBackIos } from 'react-icons/md'
import './Booking.css'
import emailjs from "emailjs-com";
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
  const [nameclick, setnameclick] = useState(false)
  
  function multistyle() {
    console.log("into function")
    console.log(multistudentname);
    if(multistudentname.length == 0){
      return (
      <div></div>
      )
    }else{
      console.log(multistudentname[0]);
      return(
        <div className={nameclick ? 'choosekid active' : 'choosekid'}>
          <div className="multi">
            <div className="borderstudent" onClick={() => updateMultistudentname(multistudentname[0])}>{multistudentname[0]}</div>
          </div>
          {nameclick ? (
            <MdArrowBackIos
              className="kidicon"
              onClick={() => {
                setnameclick(!nameclick)
              }}
            ></MdArrowBackIos>
          ) : (
            <MdOutlineArrowForwardIos
              className="kidicon"
              onClick={() => {
                setnameclick(!nameclick)
              }}
            ></MdOutlineArrowForwardIos>
          )}
        </div>
      )
    }
  }

  const [multistudentname, setMultistudentname] = useState([]);
  const [chosenStuname, setChosenStuname] = useState('');

  let tempstudentname = "";
  const updateMultistudentname = (e) => {
    console.log(e);
    if(e == contactInfo[1].studentname) {
      console.log("zero change to one");
      setMultistudentname([contactInfo[0].studentname]);
      tempstudentname = contactInfo[1].studentname;
    } else {
      console.log("one change to zero");
      setMultistudentname([contactInfo[1].studentname]);
      tempstudentname = contactInfo[0].studentname;
    }

    setChosenStuname(tempstudentname);
    console.log(tempstudentname);

    Axios.post('https://voluntutorcloud-server.herokuapp.com/getBooking', {
      username: name,
      studentname: tempstudentname,
      status: "confirmed"
    }).then((response) => {
      console.log(response);
      setBookingInfo(checkBookingInfoValidity(response.data));
      setLoading(false);
    })
  }
  
    const [noneopen, setnoneopen] = useState(false)
    const [bookedwarn, setbookedwarn] = useState(false)
    const [open, setOpen] = useState(false)
    const [finalopen, setfinalopen] = useState(false)
    const handleClose = () => {
        setOpen(false)
      }
      const handleBook = () =>{
        setbookedwarn(false)
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
  let datearr = [];

  function deleteBooking(booking) {
    console.log(booking);
    Axios.post('https://voluntutorcloud-server.herokuapp.com/deleteBooking', {
      username: booking.username,
      studentname: booking.studentname,
      status: booking.status,
      date: booking.date,
      time: booking.time,
      duration: booking.duration,
    }).then((response) => console.log(response));
  }

  function checkBookingInfoValidity(bkinfo) {
    console.log(bkinfo);
    setBookingInfoLen(bkinfo.length);
    for(let i = 0; i < bkinfo.length; i++) {
      var date = bkinfo[i].date;
      datearr = date.split('/');
      console.log(datearr);
      for(let j = 0; j < date.length; j++) {
        datearr[j] = Number(datearr[j]);
      }
      datearr = datearr.slice(0, 3);
      console.log(datearr);
      let d = new Date().getDate();
      let m = new Date().getMonth() + 1;
      let y = new Date().getFullYear();
      console.log(d, m, y);
      if(datearr[0] < y) {
        console.log(y + ' is greater than ' + datearr[0])
        // delete booking
        deleteBooking(bkinfo[i]);
        bkinfo.splice(i, 1);
        setBookingInfoLen(bkinfo.length-1);
        i--;
      } else if(datearr[0] == y) {
        if(datearr[1] < m) {
          // delete booking
          console.log(m + ' is greater than ' + datearr[1])
          deleteBooking(bkinfo[i]);
          bkinfo.splice(i, 1);
          setBookingInfoLen(bkinfo.length-1);
          i--;
        } else if(datearr[1] == m) {
          if(datearr[2] < d) {
            // delete booking
            console.log(d + ' is greater than ' + datearr[2])
            deleteBooking(bkinfo[i]);
            bkinfo.splice(i, 1);
            setBookingInfoLen(bkinfo.length-1);
            i--;
          }
        }
      }
    }
    return bkinfo;
  }
  
  useEffect(() => {
    if(isLoading) {
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
          setChosenStuname(studentname);
          console.log(response.data.length);
          if(response.data.length == 2) { setMultistudentname([response.data[1].studentname]) }
          console.log(username, studentname);
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getBooking', {
            username: username,
            studentname: studentname,
            status: "confirmed"
          }).then((response) => {
            console.log(response);
            setBookingInfo(checkBookingInfoValidity(response.data));
            setLoading(false);
          })
        })
      })
    }
  }, [])


  let space = " "
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
  let mm = ["There isn't any upcoming meetings yet :)","目前沒有即將到來的會議 :)"]
  let nn = ["This function will be unlocked soon!","此功能即將解鎖!!"]
  let l = ['Upcoming Meetings', "即將到來的會議"]
  let q = ['Pending Requests',"待確認的會議邀請"]
  let p = ["You have already successfully booked a meeting with your student. Please book the next session after the upcoming meeting is over.","您已經和學生成功預約會議，請在下次會議結束後再預約接下來的課程。"]
  
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
    if(!bookingInfoLen) {
      console.log(name, contactInfo[0].studentname, date, time, duration)
      Axios.post('https://voluntutorcloud-server.herokuapp.com/updateBooking', {
        username: name,
        studentname: contactInfo[0].studentname,
        date: date,
        time: time,
        duration: duration,
        status: "pending"
      }).then((response) => {
        console.log(response);
        var templateParams = {
          parent_email: contactInfo[0].studentmail,
          student: contactInfo[0].studentname,
          teacher: contactInfo[0].username
        }
        console.log(templateParams)
      emailjs
      .send(
        'service_z12yzef',
        'template_86pdu89',
        templateParams,
        'QZBU3bIops8KtosSX',
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('FAILED...', error)
        },
      )
      })
    }
    setdate("")
    settime("")
    setduration("")
  }

  // 這裡true的條件改成是否有學生喔
  if(isLoading){
    console.log("contactinfo length: ", contactInfo.length)
    return(
      <Loading></Loading>
    )
  } else {
    console.log("bookingInfo:");
    console.log(bookingInfo);
    console.log("bookingInfoLen:");
    console.log(bookingInfoLen);
    console.log("multistudentname");
    console.log(multistudentname);
    console.log("multistudentnameLen");
    console.log(multistudentname.length);

    if (contactInfo.length == 0){
      return(
        <div className = "nokid">
          <div className="noStudentFont">{n[status]}</div>
          <div className="noStudentFont2">{o[status]}</div>
        </div>
      )} 
    else {
      if(bookingInfo.length == 0){
        return (
            <div className='outestcontainerbook'>
              {multistyle()}  
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
                    <div className = "titlebook">{a[status]} - {chosenStuname}</div>
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
              <div className="titlebook">{l[status]} - {chosenStuname}</div>
            </div>
            <Divider></Divider>
            <div className="bookingoutestwrap">
              <div className="bookingrow_teacher">
                <div className="bookingwrapsecond">
                  <div className="bookingwordswrapfirst">
                    <div className="bookingimageprog">
                      <FaUser className="bookingprog_avatar" />
                    </div>
                    
                    <div className="bookingrequesttotaltime">
                      <div className="detailtimeforupcomings">{mm[status]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="outerbook_upcoming">
            <div className="topbarbook">
              <div className="titlebook">{q[status]} - {chosenStuname}</div>
            </div>
            <Divider></Divider>
            <div className="bookingoutestwrap">
              <div className="bookingrow_teacher">
                <div className="bookingwrapsecond">
                  <div className="bookingwordswrapfirst">
                    <div className="bookingimageprog">
                      <FaUser className="bookingprog_avatar" />
                    </div>
                    
                    <div className="bookingrequesttotaltime">
                      <div className="detailtimeforupcomings">{nn[status]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      )
    }else{
      console.log('Booking Info not empty')
      return (
        <div className='outestcontainerbook'>
          {multistyle()}  
                  <div id="dialogcontainer">
          <BootstrapDialog
          onClose={handleBook}
          id="diabook"
          aria-labelledby="customized-dialog-title"
          open={bookedwarn}
          >
          <div className="bookingprogramdia">{p[status]}</div>
          </BootstrapDialog></div>
          
          <div className = "outerbook">
              
                <div className = "topbarbook">
                <div className = "titlebook">{a[status]} - {chosenStuname}</div>
                <div className = "bookbtn" onClick = {()=>{setbookedwarn(true)}}>{b[status]}</div>
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
          <div className="titlebook">{l[status]} - {chosenStuname}</div>
        </div>
        <Divider></Divider>
        <div className="bookingoutestwrap">

            {bookingInfo.map((e) => {
              <div className="bookingrow_teacher">
                <div className="bookingwrapsecond">
                  <div className="bookingwordswrapfirst">
                    <div className="bookingimageprog">
                      <FaUser className="bookingprog_avatar" />
                    </div>
                    <div className="bookingrequesttotal">
                      <div className="bookingrequestsub">{e.studentname}</div>
                      <div className="bookinrequesttime">{e.duration} hr</div>
                    </div>
                    <div className="bookingrequesttotaltime">
                      <div className="detailtimeforupcomings">
                        {e.date} {e.time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            })}

          </div>
        </div>
          <div className="outerbook_upcoming">
            <div className="topbarbook">
              <div className="titlebook">{q[status]} - {chosenStuname}</div>
            </div>
            <Divider></Divider>
            <div className="bookingoutestwrap">
              <div className="bookingrow_teacher">
                <div className="bookingwrapsecond">
                  <div className="bookingwordswrapfirst">
                    <div className="bookingimageprog">
                      <FaUser className="bookingprog_avatar" />
                    </div>
                    
                    <div className="bookingrequesttotaltime">
                      <div className="detailtimeforupcomings">{nn[status]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    }
  }
}
