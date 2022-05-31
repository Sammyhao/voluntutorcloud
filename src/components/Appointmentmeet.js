import React, { useState, useEffect, useLayoutEffect } from 'react'
import emailjs from 'emailjs-com'
import './Appointmentmeet.css'
import { MdOutlineArrowForwardIos, MdArrowBackIos } from 'react-icons/md'
import { Divider } from '@mui/material'
import Axios from 'axios'
import { MdSettingsPhone } from 'react-icons/md'
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
import { Multi_Students } from './Multi_Students'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { popoverClasses } from '@mui/material'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

function Appointmentmeet() {
  const [status, setStatus] = useState(0)
  let a = [
    "Oops, seems like you don't have any student yet.",
    '噢, 看來您還沒有任何學生呢。',
  ]
  let b = ['Go and Join a Volunteering Program!!', '趕快去報名志工活動吧！！']
  let c = [
    'Please fill in everything before you submit the form.',
    '請在傳送前完整填寫教學紀錄。',
  ]
  let d = [
    'You are allowed to enter NONE for tasks and notes only.',
    '您只能在學生回家作業以及課堂筆記欄填寫無。',
  ]
  let e = [
    "This form will be sent to student's parents and as records of your volunteering work. Please double check before sending.",
    '此教學紀錄單會傳送給家長以及當作志工計畫的紀錄，請務必確實填寫，也嚴禁謊報。',
  ]
  let f = ['Class Date and Time', '課堂日期以及時間']
  let g = ['Class Duration (hrs)', '課堂時長 (小時)']
  let h = ['Agenda', '課堂進度']
  let i = ['Student Tasks', '學生回家作業']
  let j = ['Notes', '課堂筆記']
  let k = ['SEND', '傳送']
  let l = ['Report Sent Successfully!', '教學記錄成功傳送！']
  let m = ['Join', '加入會議']
  let n = [
    'Enter the Class Date and Time (Format: 2022/05/01 12:00 ~ 13:30)',
    '請輸入上課日期以及時間 (格式：2022/05/01 12：00~13：30)',
  ]
  let o = [
    'Enter the class duration (hrs) (numbers only, format: 1.5)',
    '請輸入課程時長 (小時) (僅允許數字，格式：1.5)',
  ]
  let p = ['1. Review math final exam.', '1. 複習數學段考']
  let q = ['1. Read one English book.', '1. 閱讀一本英文繪本']
  let r = ['Add additional notes!!', '請輸入課堂筆記']
  const [studentabsence, setstudentabscene] = useState('')

  let tu = [
    "Please select student's attendence status",
    '請選擇學生今日上課出席狀況',
  ]
  let pr = ['On time', '準時上課']
  let sr = ['Late for 5 minutes', '遲到五分鐘']
  let st = ['Late for 10 minutes', '遲到十分鐘']
  let su = ['Late for 30 minutes', '遲到三十分鐘']
  let us = ['Attendence', '學生出席狀況']

  let username = ''
  const [contactInfo, setContactInfo] = useState([])
  let totalhour = 8
  const [classDate, setClassDate] = useState('')
  const [agenda, setAgenda] = useState('')
  const [task, setTask] = useState('')
  const [notes, setNotes] = useState('')
  const [classduration, setClassduration] = useState('')
  const [googleMeetLink, setGoogleMeetLink] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [open_send, setOpen_send] = useState(false)
  const [openmsgsend, setopenmsgsend] = useState(false)
  const [chosenContact, setChosenContact] = useState({})
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
  const handleClose = () => {
    setOpen(false)
  }
  const handlesendclose = () => {
    setOpen_send(false)
  }
  const handlesendmsg = () => {
    setopenmsgsend(false)
  }

  // var googlemeetlinkalt = "";

  useEffect(() => {
    if (isLoading) {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
        (response) => {
          username = response.data.user[0].username
          setGoogleMeetLink(response.data.user[0].googlemeetlink)
          if (response.data.user[0].lang == 'chinese') setStatus(1)
          else setStatus(0)
          Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/findContact',
            {
              username: username,
            },
          ).then((response) => {
            console.log('Student number: ')
            console.log(response.data.length)
            if (response.data.length == 2) {
              setMultistudentname([response.data[1].studentname])
            }
            setContactInfo(response.data)
            setChosenContact(response.data[0])
            setLoading(false)
          })
        },
      )
    }
  }, [])

  const meet = () => {
    console.log('google meet link is ', googleMeetLink)
    // console.log("google meet link alt is ", googleMeetLinkalt);
    // if(googleMeetLink) window.location.replace(googleMeetLink);
    if (googleMeetLink)
      window.open(googleMeetLink, '_blank', 'noopener,noreferrer')
    // else window.location.replace(googlemeetlinkalt);
  }

  function updateRecord() {
    console.log(
      chosenContact.username,
      chosenContact.studentname,
      chosenContact.studentmail,
      classDate,
      classduration,
      agenda,
      task,
      notes,
    )

    if (classduration != '' && agenda != '' && task != '') {
      setOpen_send(true)
    } else {
      console.log('false')
      setOpen(true)
    }
  }

  const actualsend = () => {
    console.log(
      chosenContact.username,
      chosenContact.studentname,
      chosenContact.studentmail,
      classDate,
      classduration,
      agenda,
      task,
      notes,
    )
    var templateParams = {
      parent_email: chosenContact.studentmail,
      children_name: chosenContact.studentname,
      class_date: classDate,
      class_duration: classduration,
      agenda: agenda,
      task: task,
      notes: notes,
    }
    console.log(templateParams)

    Axios.post('https://voluntutorcloud-server.herokuapp.com/getRecord', {
      username: chosenContact.username,
      studentname: chosenContact.studentname,
      studentmail: chosenContact.studentmail,
    }).then((response) => {
      //         if(response.data.length) {
      //           totalhour = response.data[response.data.length-1].hoursleft
      //         }
      //        else totalhour = 8;
      console.log(totalhour)

      for (let i = 0; i < response.data.length; i++) {
        totalhour -= response.data[i].duration
        console.log(totalhour)
      }

      console.log(totalhour)

      Axios.post('https://voluntutorcloud-server.herokuapp.com/updateRecord', {
        username: chosenContact.username,
        studentname: chosenContact.studentname,
        studentmail: chosenContact.studentmail,
        classDate: classDate,
        duration: classduration,
        agenda: agenda,
        task: task,
        notes: notes,
        hoursleft: totalhour - classduration,
      }).then((response) => {
        console.log(response)
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
    setOpen_send(false)
    setopenmsgsend(true)
    setAgenda('')
    setTask('')
    setNotes('')
    setClassDate('')
    setClassduration('')
  }

  const [nameclick, setnameclick] = useState(false)

  function multistyle() {
    console.log('into function')
    console.log(multistudentname)
    if (multistudentname.length == 0) {
      return <div></div>
    } else {
      console.log(multistudentname[0])
      return (
        <div className={nameclick ? 'choosekid active' : 'choosekid'}>
          <div className="multi">
            <div
              className="borderstudent"
              onClick={() => updateMultistudentname(multistudentname[0])}
            >
              {multistudentname[0]}
            </div>
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

  const [multistudentname, setMultistudentname] = useState([])

  const updateMultistudentname = (e) => {
    console.log(e)
    if (e == contactInfo[1].studentname) {
      console.log('zero change to one')
      setMultistudentname([contactInfo[0].studentname])
      setChosenContact(contactInfo[1])
    } else {
      console.log('one change to zero')
      setMultistudentname([contactInfo[1].studentname])
      setChosenContact(contactInfo[0])
    }
  }

  if (isLoading) {
    return <Loading />
  } else {
    if (contactInfo.length == 0) {
      return (
        <div className="nokid">
          <div className="noStudentFont">{a[status]}</div>
          <div className="noStudentFont2">{b[status]}</div>
        </div>
      )
    } else {
      console.log(contactInfo)
      console.log(chosenContact)
      return (
        <div className="outsidecontainerapp">
          {multistyle()}
          <div id="dialog_reg_wrap">
            <BootstrapDialog
              onClose={handleClose}
              id="dialog_registered"
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <div id="app_registeredsucc">{c[status]}</div>
              <div id="app_return">{d[status]}</div>
              <div id="registeredsucc"></div>
            </BootstrapDialog>
          </div>
          <div id="dialog_reg_wrap">
            <BootstrapDialog
              onClose={handlesendclose}
              id="dialog_registered"
              aria-labelledby="customized-dialog-title"
              open={open_send}
            >
              <div id="appointment_sendtitle">{e[status]}</div>
              <div className="appointment_subtitles">{f[status]}</div>
              <div className="appointment_content">{classDate}</div>
              <div className="appointment_subtitles">{g[status]}</div>
              <div className="appointment_content">{classduration}</div>
              <div className="appointment_subtitles">{h[status]}</div>
              <div className="appointment_content">{agenda}</div>
              <div className="appointment_subtitles">{i[status]}</div>
              <div className="appointment_content">{task}</div>
              <div className="appointment_subtitles">{j[status]}</div>
              <div className="appointment_content">{notes}</div>
              <div className="wrapappointment">
                <div id="app_send" onClick={actualsend}>
                  {k[status]}
                </div>
              </div>
              <div id="registeredsucc"></div>
            </BootstrapDialog>
          </div>
          <div id="dialog_reg_wrap">
            <BootstrapDialog
              onClose={handlesendmsg}
              id="dialog_registered"
              aria-labelledby="customized-dialog-title"
              open={openmsgsend}
            >
              <div id="app_succ">{l[status]}</div>
            </BootstrapDialog>
          </div>
          <div className="googlemeet">
            <div className="con">
              <div className="image_app">
                <FaUser className="icon_app" />
              </div>
              <div className="namesection_app">
                <div className="app_name">{chosenContact.studentname}</div>
              </div>
            </div>
            <div className="meet" onClick={meet}>
              {m[status]}
            </div>
          </div>
          <div className="classdate">
            <div className="app_title">{us[status]}</div>
            <Divider className="app_line"></Divider>
            <Select
              labelId="demo-simple-select-helper-label"
              variant="standard"
              id="editdate"
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              value={studentabsence}
              onChange={(e) => {
                setstudentabscene(e.target.value)
              }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <div className="selectplace">{tu[status]}</div>
                }

                return selected
              }}
              sx={{
                color: '#b25634',
                paddingLeft: '10px',
                paddingBottom: '5px',
                fontFamily: 'Lora',
                letterSpacing: '2px',
                fontSize: '20px',
                '&:hover': {
                  color: '#b25634',
                },
                '&:focus': {
                  backgroundColor: '#00000000',
                },
                '&:not(.Mui-disabled):hover::before': {
                  borderBottom: '0px',
                },
                '&:before': {
                  borderBottom: '0px',
                },
                '&:after': {
                  borderBottom: '0px',
                },
                '& .MuiSvgIcon-root': {
                  marginRight: '20px',
                  marginTop: '10px',
                  fontSize: '30px',
                  color: '#b25634',
                  fill: '#b25634',
                },
                '& .MuiSvgIcon-root::before': {
                  border: '1.5px solid #D6A796',
                },
                '& .MuiSvgIcon-root::after': {
                  border: '1.5px solid #D6A796',
                },
              }}
            >
              <MenuItem value={pr[status]}>{pr[status]}</MenuItem>
              <MenuItem value={sr[status]}>{sr[status]}</MenuItem>
              <MenuItem value={st[status]}>{st[status]}</MenuItem>
              <MenuItem value={su[status]}>{su[status]}</MenuItem>
            </Select>
          </div>
          <div className="classdate">
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
          <div className="classduration">
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
          <div className="agenda">
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
          <div className="task">
            <div className="app_title">{i[status]}</div>
            <Divider className="app_line"></Divider>
            <div className="wraptodos">
              <textarea
                id="edittodos"
                type="text"
                value={task}
                placeholder={q[status]}
                onChange={(e) => {
                  setTask(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="notes">
            <div className="app_title">{j[status]}</div>
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
          <div className="buttonwrapapp">
            <div className="sendapp" onClick={updateRecord}>
              {k[status]}
            </div>
          </div>
        </div>
      )
    }
  }
}
export default Appointmentmeet
