import React, { useState, useEffect, useLayoutEffect } from 'react'
import emailjs from "emailjs-com";
import './Appointmentmeet.css'
import { Divider } from '@mui/material'
import Axios from 'axios'
import { MdSettingsPhone } from 'react-icons/md';
import { FaUser } from 'react-icons/fa'
import { BiSearchAlt } from 'react-icons/bi'
import '../App.css'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Loading from './Loading.js'
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
function Appointmentmeet() {
  const [status, setStatus] = useState(0);
  let a = ["Oops, seems like you don't have any student yet.","噢, 看來您還沒有任何學生呢。"]
  let b = ["Go and Join a Volunteering Program!!", "趕快去報名志工活動吧！！"]
  let c = ["Please fill in everything before you submit the form.","請在傳送前完整填寫教學紀錄。"]
  let d = ["You are allowed to enter NONE for tasks and notes only.","您只能在學生回家作業以及課堂筆記欄填寫無。"]
  let e = ["This form will be sent to student's parents and as records of your volunteering work. Please double check before sending.","此教學紀錄單會傳送給家長以及當作志工計畫的紀錄，請務必確實填寫，也嚴禁謊報。"]
  let f = ["Class Date and Time","課堂日期以及時間"]
  let g = ["Class Duration","課堂時長"]
  let h = ["Agenda","課堂進度"]
  let i = ["Student Tasks","學生回家作業"]
  let j = ["Notes","課堂筆記"]
  let k = ["SEND","傳送"]
  let l = ["Report Sent Successfully!","教學記錄成功傳送！"]
  let m = ["Join","加入會議"]
  let n = ["Enter the Class Date and Time (Format: 2022/05/01 12:00 ~ 13:30)","請輸入上課日期以及時間 (格式：2022/05/01 12：00~13：30)"]
  let o = ["Enter the class duration (numbers only, format: 1.5)","請輸入課程時長 (僅允許數字，格式：1.5)"]
  let p = ["1. Review math final exam.","1. 複習數學段考"]
  let q = ["1. Read one English book.","1. 閱讀一本英文繪本"]
  let r = ["Add additional notes!!","請輸入課堂筆記"]

  const meet = () => {
    window.open(googleMeetLink);
  }
  let username = "";
  const [studentname, setStudentname] = useState("");
  const [studentmail, setStudentmail] = useState("");
  const [contactInfo, setContactInfo] = useState([]);
  let totalhour = 0;
  const [classDate, setClassDate] = useState("");
  const [agenda, setAgenda] = useState("");
  const [task, setTask] = useState("");
  const [notes, setNotes] = useState("");
  const [classduration, setClassduration] = useState("");
  const [googleMeetLink, setGoogleMeetLink] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [open, setOpen] = useState(false)
  const [open_send, setOpen_send] = useState(false)
  const [openmsgsend, setopenmsgsend] = useState(false)
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
  const handlesendclose = () =>{
    setOpen_send(false)
  }
  const handlesendmsg = () =>{
    setopenmsgsend(false)
  }
  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
      username = response.data.user[0].username;
      Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
        username: username
      }).then((response) => {
        setContactInfo(response.data);
        setLoading(false);
      })
      Axios.post('https://voluntutorcloud-server.herokuapp.com/getUserProfile', {
        username: username
      }).then((response) => {
        setGoogleMeetLink(response.data[0].googleMeetLink);
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getLang', {
            username: username,
        }).then((response) => {
            console.log(response.data);
            if(response.data == "chinese") setStatus(1);
            else setStatus(0);
            console.log(status);
        })
        setLoading2(false);
      })
    })
  }, [])
  
  function updateRecord() {
    console.log(contactInfo[0].username, contactInfo[0].studentname, contactInfo[0].studentmail, classDate, classduration, agenda, task, notes);

    if(classduration != "" && agenda != "" && task != "") {
      setOpen_send(true)
    }else{
      console.log("false")
      setOpen(true)
    }
    
  }

  const actualsend = () => {
    console.log(contactInfo[0].username, contactInfo[0].studentname, contactInfo[0].studentmail, classDate, classduration, agenda, task, notes);
      var templateParams = {
        parent_email: contactInfo[0].studentmail,
        children_name: contactInfo[0].studentname,
        class_date: classDate,
        class_duration: classduration,
        agenda: agenda,
        task: task,
        notes: notes
      }
      console.log(templateParams);

      Axios.post("https://voluntutorcloud-server.herokuapp.com/getRecord", {
        username: contactInfo[0].username,
        studentname: contactInfo[0].studentname,
        studentmail: contactInfo[0].studentmail,
      }).then((response) => {
        totalhour = response.data[response.data.length-1].hoursleft;
        Axios.post("https://voluntutorcloud-server.herokuapp.com/updateRecord", {
          username: contactInfo[0].username,
          studentname: contactInfo[0].studentname,
          studentmail: contactInfo[0].studentmail,
          classDate: classDate,
          duration: classduration,
          agenda: agenda,
          task: task,
          notes: notes,
          hoursleft: totalhour - classduration
        }).then((response) => {
          console.log(response);
        })
      })
  
      emailjs
      .send(
        'service_z12yzef',
        'template_207dp4d',
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
      setOpen_send(false);
      setopenmsgsend (true);
      setAgenda("")
      setTask("")
      setNotes("")
      setClassDate("")
      setClassduration("")

  }
 
  if(isLoading || isLoading2){
    return(
      <Loading/>
    )
  }else
  {if(contactInfo.length == 0) {
    return (
      <div className = "nokid">
        <div className="noStudentFont">{a[status]}</div>
        <div className="noStudentFont2">{b[status]}</div>
      </div>
    )
  } else {
    console.log(contactInfo);
    return (
      <div className = "outsidecontainerapp">
      <div id="dialog_reg_wrap">
      <BootstrapDialog
        onClose={handleClose}
        id = "dialog_registered"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div id="app_registeredsucc">
        {c[status]}</div>
        <div id="app_return">{d[status]}
          </div>
        <div id="registeredsucc">
          
        </div>
      </BootstrapDialog>
      </div>
      <div id="dialog_reg_wrap">
      <BootstrapDialog
        onClose={handlesendclose}
        id = "dialog_registered"
        aria-labelledby="customized-dialog-title"
        open={open_send}
      >
        <div id="appointment_sendtitle">
          {e[status]}
        </div>
        <div className="appointment_subtitles">
        {f[status]}
          </div>
        <div className="appointment_content">
          {classDate}
          </div>
          <div className="appointment_subtitles">
          {g[status]}
          </div>
        <div className="appointment_content">
          {classduration}
          </div>
          <div className="appointment_subtitles">
          {h[status]}
          </div>
        <div className="appointment_content">
          {agenda}
          </div>
          <div className="appointment_subtitles">
          {i[status]}
          </div>
        <div className="appointment_content">
          {task}
          </div>
          <div className="appointment_subtitles">
          {j[status]}
          </div>
        <div className="appointment_content">
          {notes}
          </div>
          <div className = "wrapappointment">
        <div id="app_send" onClick={actualsend}>
          {k[status]}
          </div>
          </div>
        <div id="registeredsucc">
          
        </div>
      </BootstrapDialog>
      </div>
      <div id="dialog_reg_wrap">
      <BootstrapDialog
        onClose={handlesendmsg}
        id = "dialog_registered"
        aria-labelledby="customized-dialog-title"
        open={openmsgsend}
      >
        <div id="app_succ">
          {l[status]}
          </div>
        
      </BootstrapDialog>
      </div>
        <div className='googlemeet'>
          <div className='con'>
          <div className="image_app">
              <FaUser className = "icon_app"/>
              </div>
          <div className='namesection_app'>
            <div className="app_name">{contactInfo["0"].studentname}</div>
          </div>
          </div>
          <div className="meet" onClick={meet}>{m[status]}</div>
        </div>
        <div className='classdate'>
          <div className="app_title">{f[status]}</div>
          <Divider className="app_line"></Divider>
          <input
            id="editdate"
            type="tel"
            maxLength={40}
            value={classDate}
            placeholder={n[status]}
            onChange={(e) => {
              setClassDate(e.target.value)
            }}
          />
        </div>
        <div className='classduration'>
          <div className="app_title">{g[status]}</div>
          <Divider className="app_line"></Divider>
          <input
            id="editdate"
            type="number"
            value={classduration}
            placeholder={o[status]}
            onChange={(e) => {
              setClassduration(e.target.value)
            }}
          />
        </div>
        <div className='agenda'>
          <div className="app_title">{h[status]}</div>
          <Divider className="app_line"></Divider>
          <div className="wraptodos">
          <textarea
              id="edittodos"
              type="text"
              value={agenda}
              placeholder={p[status]}
              onChange={(e) => {
                setAgenda(e.target.value)
              }}
            />
            </div>
        </div>
        <div className='task'><div className="app_title">{i[status]}</div>
        <Divider className="app_line"></Divider>
          <div className="wraptodos">
          <textarea
              id="edittodos"
              type="text"
              value={task}
              placeholder= {q[status]}
              onChange={(e) => {
                setTask(e.target.value)
              }}
            /></div>
            </div>
        <div className='notes'><div className="app_title">{j[status]}</div>
        <Divider className="app_line"></Divider>
          <div className="wraptodos">
          <textarea
              id="edittodos"
              type="text"
              value={notes}
              placeholder={r[status]}
              onChange={(e) => {
                setNotes(e.target.value)
              }}
            />
            </div>
        </div>
        <div className='buttonwrapapp'>
          <div className="sendapp" onClick={updateRecord}>{k[status]}</div>
        </div>
      </div>
    )
  }
}}
export default Appointmentmeet;