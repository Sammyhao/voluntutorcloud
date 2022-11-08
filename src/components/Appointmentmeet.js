import React, { useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import './Appointmentmeet.css'
import { Divider } from '@mui/material'
import Axios from 'axios'
import { FaUser } from 'react-icons/fa'
import '../App.css'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import Loading from './Loading.js'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { TimePicker } from '@mui/x-date-pickers/TimePicker'

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
  const [status, setStatus] = useState(1)
  let a = [
    "Oops, seems like you don't have any student yet.",
    '噢, 看來您還沒有任何學生呢',
  ]
  let zzz = ['None', '無']
  let space = [' ']
  let b = ['Go and Join a Volunteering Program!!', '趕快去報名志工活動吧！！']
  let c = [
    'Please fill in everything before you submit the form.',
    '請在傳送前完整填寫教學紀錄',
  ]
  let d = [
    'You are allowed to enter NONE for tasks and notes only.',
    '您只能在學生回家作業以及課堂筆記欄填寫無',
  ]
  let e = [
    "This form will be sent to student's parents and as records of your volunteering work. Please double check before sending.",
    '此教學紀錄單會傳送給家長並當作志工計畫的紀錄，請務必確實填寫，嚴禁謊報',
  ]
  let f = ['Class Date', '課堂日期']
  let g = ['Class Duration (hrs)', '課堂時長 (小時)']
  let h = ['Agenda', '課堂進度']
  let i = ['Student Tasks', '學生回家作業']
  let j = ['Notes', '課堂筆記']
  let jj = ['Course Material Links', '課堂教材連結']
  let jjjjj = ['Student task submission link', '學生回家作業繳交處']
  let jjrr = ['Student task submission link: ', '學生回家作業繳交處：']
  let k = ['SEND', '傳送']
  let l = ['Report Sent Successfully!', '教學記錄成功傳送！']
  let m = ['Join', '加入會議']
  let n = ['Enter the Class Date', '請輸入上課日期']
  let o = [
    'Enter the class duration (hrs) (numbers only, format: 1.5)',
    '請輸入課程時長 (小時) (僅允許數字，格式：1.5)',
  ]
  let p = ['1. Review math final exam.', '1. 複習數學段考']
  let q = ['1. Read one English book.', '1. 閱讀一本英文繪本']
  let r = ['Add additional notes!!', '請輸入課堂筆記！']
  let rrrxx = [
    "Put the links to your course materials here! If it's a local file, please upload it onto your personal Google Drive and paste the sharing link here :)",
    '請輸入課堂教材連結，若課堂教材為本機檔案 (例如：word檔案)，請上傳至私人的Google Drive並且將共用連結貼在這裡喔！',
  ]
  let ras = [
    'Please paste the sharing link to your personal Google Drive here for homework submission.',
    '您的雲端硬碟會是學生作業繳交處，請將共用連結貼於此欄位！',
  ]
  const [studentabsence, setstudentabscene] = useState('')

  let tu = [
    "Please select student's attendance status",
    '請選擇學生今日上課出席狀況',
  ]
  let pr = ['On time (online within 5 minutes)', '準時上課（五分鐘內到達）']
  let sr = ['Late for 6~10 minutes', '遲到六到十分鐘']
  let st = ['Late for 11~15 minutes', '遲到十一到十五分鐘']
  let su = ['Late for 16~30 minutes', '遲到十六到三十分鐘']
  let ee = ['The time you entered is invalid', '您輸入的時間不正確']
  let sv = ['Late for over 30 minutes', '遲到超過三十分鐘']
  let us = ["Student's Attendance", '學生出席狀況']
  let usss = ["Student's Name", '學生姓名']
  let ss = ['Enter the Class Starting Time', '請輸入上課開始時間']
  let sss = ['Enter the Class Ending Time', '請輸入上課結束時間']
  let rr = ["Please select your student's name", '請選擇學生姓名']
  let rrr = ["Student's name", '學生姓名']
  const [studentnamelist, setstudentnamelist] = useState([])
  let username = ''
  let ParticipateTitle = ["Participate level", "學生參與度"]
  let participate = ["Please select student's participate level (worst = 1, best = 10)", 
                     "請選擇學生今日上課參與度(e.g., 回答問題的次數很多)"]
  let pone = ["level 1 (not answering questions)", "第一等 (不回答問題)"]
  let ptwo = ["level 2 (answering one to two questions)", "第二等 (回答一兩的問題) "]
  let pthree = ["level 3 (answer about 30% of questions)", "第三等 (回答30%的問題)"]
  let pfour = ["level 4 (answer about 40% of questions)", "第四等 (回答40%的問題)"]
  let pfive = ["level 5 (answer about 50% of questions)", "第五等 (回答50%的問題)"]
  let psix = ["level 6 (answer about 60% of questions)", "第六等 (回答60%的問題)"]  
  let pseven = ["level 7 (answer about 70% of questions)", "第七等 (回答70%的問題)"]
  let peight = ["level 8 (answer about 80% of questions)", "第八等 (回答80%的問題)"]
  let pnine = ["level 9 (answer about 90% of questions, interact with teacher)",
               "第九等 (回答90%的問題，與老師互動)"]
  let pten = ["level 10 (answer all the questions, fully interact with teacher)",
              "第十等 (回答所有問題，與老師充分互動)"]
  const [contactInfo, setContactInfo] = useState([])
  let totalhour = 8
  const [timeopen, settimeopen] = useState(false)
  const [classDate, setClassDate] = useState(new Date())
  const [agenda, setAgenda] = useState('')
  const [task, setTask] = useState('')
  const [notes, setNotes] = useState('')
  const [links, setLinks] = useState('')
  const [submissionlink, setsubmissionlink] = useState('')
  const [classduration, setClassduration] = useState(0.0)
  const [googleMeetLink, setGoogleMeetLink] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [open_send, setOpen_send] = useState(false)
  const [openmsgsend, setopenmsgsend] = useState(false)
  const [chosenContact, setChosenContact] = useState({})
  const [starting, setstarting] = useState(new Date())
  const [ending, setending] = useState(new Date())
  const [finalformat, setfinalformat] = useState('')
  const [selectedstudentname, setstudentname] = useState('')
  const [selectedparticipate, setparticipate] = useState('')

  // selectedparticipate: if student answered, +200
  // studentabsence: 500 pts

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

  const handletimeclose = () => {
    settimeopen(false)
  }

  const handlesendclose = () => {
    setOpen_send(false)
  }
  const handlesendmsg = () => {
    setopenmsgsend(false)
  }

  const checkblank = (content) => {
    if (content === '') {
      return zzz[status]
    } else {
      return content
    }
  }
  const user = useSelector((state) => state.user.value)
  useEffect(() => {
    setStatus(user.language)
    setGoogleMeetLink(user.googlemeetlink)
    username = user.username
    Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
      username: username,
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        setstudentnamelist((studentnamelist) => [
          ...studentnamelist,
          response.data[i].studentname,
        ])
      }
      setContactInfo(response.data)
      setChosenContact(response.data[0])
      setLoading(false)
    })
  }, [])

  const meet = () => {
    console.log('google meet link is ', googleMeetLink)

    if (googleMeetLink)
      window.open(googleMeetLink, '_blank', 'noopener,noreferrer')
  }
  const [formatteddate, setformatteddate] = useState('')
  const [formattedstart, setformattedstart] = useState('')
  const [formattedend, setformattedend] = useState('')

  function updateRecord() {
    console.log(
      chosenContact.username,
      selectedstudentname,
      chosenContact.studentmail,
      classDate,
      starting,
      ending,
      agenda,
      task,
      notes,
      studentabsence,
      selectedstudentname,
      links,
      submissionlink,
    )

    if (
      selectedstudentname != '' &&
      studentabsence != '' &&
      classDate != '' &&
      agenda != '' &&
      task != ''
    ) {
      if (ending.getTime() < starting.getTime()) {
        settimeopen(true)
      } else {
        setformatteddate(format(classDate, 'yyyy-MM-dd'))
        setformattedstart(format(starting, 'HH:mm'))
        setformattedend(format(ending, 'HH:mm'))
        setfinalformat(
          formatteddate + ' ' + formattedstart + '~' + formattedend,
        )
        let hrs = 0
        let mins = 0
        if (ending.getMinutes() < starting.getMinutes()) {
          mins = ending.getMinutes() - starting.getMinutes() + 60
          hrs = ending.getHours() - starting.getHours() - 1
        } else {
          mins = ending.getMinutes() - starting.getMinutes()
          hrs = ending.getHours() - starting.getHours()
        }
        setClassduration((hrs + mins / 60).toFixed(2))
        console.log(classduration)
        console.log(finalformat)

        setOpen_send(true)
      }
    } else {
      console.log('false')
      setOpen(true)
    }
  }

  const actualsend = () => {
    let emailaddress = ''
    for (let i = 0; i < contactInfo.length; i++) {
      if (contactInfo[i].studentname === selectedstudentname)
        emailaddress = contactInfo[i].studentmail
    }
    let tempFinalFormat =
      formatteddate + ' ' + formattedstart + '~' + formattedend
    console.log({
      username: chosenContact.username,
      studentname: selectedstudentname,
      studentmail: emailaddress,
      classDate: tempFinalFormat,
      duration: classduration,
      studentabsence: studentabsence,
      agenda: agenda,
      sublink: submissionlink,
      task: task,
      link: links,
      notes: notes,
      hoursleft: totalhour - classduration,
      echelon: 4,
    })
    var templateParams = {
      parent_email: emailaddress,
      children_name: selectedstudentname,
      class_date: tempFinalFormat,
      class_duration: classduration,
      attendance: studentabsence,
      agenda: agenda,
      task: task,
      notes: notes,
      sublink: checkblank(submissionlink),
      link: checkblank(links),
    }
    console.log(templateParams)

    Axios.post('https://voluntutorcloud-server.herokuapp.com/getRecord', {
      username: chosenContact.username,
      studentname: selectedstudentname,
      studentmail: emailaddress,
      echelon: 4,
    })
      .then((response) => {
        console.log(totalhour)

        for (let i = 0; i < response.data.length; i++) {
          totalhour -= response.data[i].duration
          console.log(totalhour)
        }

        console.log(totalhour)

        return Axios.post(
          'https://voluntutorcloud-server.herokuapp.com/updateRecord',
          {
            username: chosenContact.username,
            studentname: selectedstudentname,
            studentmail: emailaddress,
            classDate: tempFinalFormat,
            duration: classduration,
            studentabsence: studentabsence,
            agenda: agenda,
            sublink: submissionlink,
            task: task,
            link: links,
            notes: notes,
            hoursleft: totalhour - classduration,
            echelon: 4,
          },
        )
      })
      .then((response) => {
        console.log(response.data)
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
    setsubmissionlink('')
    setLinks('')
    setClassDate(new Date())
    setstarting(new Date())
    setending(new Date())
  }

  const [nameclick, setnameclick] = useState(false)

  if (isLoading) {
    return <Loading />
  } else {
    if (contactInfo.length === 0) {
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
              <div className="appointment_subtitles">{usss[status]}</div>
              <div className="appointment_content">{selectedstudentname}</div>
              <div className="appointment_subtitles">{us[status]}</div>
              <div className="appointment_content">{studentabsence}</div>

              <div className="appointment_subtitles">{f[status]}</div>
              <div className="appointment_content">
                {formatteddate}
                {space}
                {formattedstart} ~ {formattedend}
              </div>
              <div className="appointment_subtitles">{g[status]}</div>
              <div className="appointment_content">{classduration}</div>
              <div className="appointment_subtitles">{h[status]}</div>
              <div className="appointment_content">{agenda}</div>
              <div className='appointment_subtitles'>{ParticipateTitle[status]}</div>
              <div className='appointment_content'>{participate[status]}</div>
              <div className="appointment_subtitles">{jjjjj[status]}</div>
              <div className="appointment_content">
                {checkblank(submissionlink)}
              </div>
              <div className="appointment_subtitles">{i[status]}</div>
              <div className="appointment_content">{task}</div>
              <div className="appointment_subtitles">{jj[status]}</div>
              <div className="appointment_content">{checkblank(links)}</div>
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
              onClose={handletimeclose}
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={timeopen}
            >
              <div id="app_succ">{ee[status]}</div>
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
                <div className="app_name">{selectedstudentname}</div>
              </div>
            </div>
            <div className="meet" onClick={meet}>
              {m[status]}
            </div>
          </div>
          <div className="classdate">
            <div className="app_title">{rrr[status]}</div>
            <Divider className="app_line"></Divider>
            <Select
              labelId="demo-simple-select-helper-label"
              variant="standard"
              id="editdate"
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              value={selectedstudentname}
              onChange={(e) => {
                setstudentname(e.target.value)
              }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <div className="selectplace">{rr[status]}</div>
                }

                return selected
              }}
              sx={{
                color: '#745140',
                paddingLeft: '0px',
                paddingBottom: '5px',
                fontFamily: 'Lora',
                letterSpacing: '0.8px',
                fontSize: '15px',
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
              {studentnamelist.map((e) => {
                return <MenuItem value={e}>{e}</MenuItem>
              })}
            </Select>
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
                color: '#745140',
                paddingLeft: '0px',
                paddingBottom: '5px',
                fontFamily: 'Lora',
                letterSpacing: '0.8px',
                fontSize: '15px',
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
              <MenuItem value={sv[status]}>{sv[status]}</MenuItem>
            </Select>
          </div>
          <div className="classdate">
            <div className="app_title">{f[status]}</div>
            <Divider className="app_line"></Divider>

            <div className="appwrap">
              <LocalizationProvider
                className="datedatewrap"
                dateAdapter={AdapterDateFns}
                sx={{
                  width: '100%',
                  ' .css-1luob6x': {
                    width: '100%',
                  },
                }}
              >
                <DatePicker
                  value={classDate}
                  className="datedatewrap"
                  onChange={(newValue) => {
                    setClassDate(newValue)
                  }}
                  sx={{
                    width: '100%',
                  }}
                  renderInput={(params) => (
                    <TextField
                      className="editrest"
                      variant="standard"
                      sx={{
                        color: '#745140',
                        paddingLeft: '0px',
                        paddingBottom: '5px',
                        fontFamily: 'Lora',
                        letterSpacing: '0.8px',
                        fontSize: '15px',
                        '& .MuiInputLabel-root': { color: '#b25634' },

                        ' .css-1wt0ykv::before': {
                          borderBottom: '1.5px solid #D6A796',
                        },
                        ' .css-1wt0ykv::after': {
                          borderBottom: '1.5px solid #74514080',
                        },
                        '& .css-1wt0ykv:hover:not(.Mui-disabled):before': {
                          borderBottom: '1.5px solid #D6A796',
                        },
                        svg: {
                          color: '#b25634',
                        },

                        input: {
                          color: '#745140',
                          paddingLeft: '0px',
                          paddingBottom: '5px',
                          fontFamily: 'Lora',
                          letterSpacing: '0.8px',
                          fontSize: '15px',
                        },
                        label: {
                          color: '#b25634',
                          fontFamily: 'Lora',
                          '&:hover': {
                            color: '#b25634',
                          },
                          '&:focus': {
                            color: '#b25634',
                          },
                        },
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="classdate">
            <div className="app_title">{ParticipateTitle[status]}</div>
            <Divider className="app_line"></Divider>
            <Select
              labelId="demo-simple-select-helper-label"
              variant="standard"
              id="editdate"
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              value={selectedparticipate}
              onChange={(e) => {
                setparticipate(e.target.value)
              }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <div className="selectplace">{participate[status]}</div>
                }

                return selected
              }}
              sx={{
                color: '#745140',
                paddingLeft: '0px',
                paddingBottom: '5px',
                fontFamily: 'Lora',
                letterSpacing: '0.8px',
                fontSize: '15px',
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
              <MenuItem value={pone[status]}>{pone[status]}</MenuItem>
              <MenuItem value={ptwo[status]}>{ptwo[status]}</MenuItem>
              <MenuItem value={pthree[status]}>{pthree[status]}</MenuItem>
              <MenuItem value={pfour[status]}>{pfour[status]}</MenuItem>
              <MenuItem value={pfive[status]}>{pfive[status]}</MenuItem>
              <MenuItem value={psix[status]}>{psix[status]}</MenuItem>
              <MenuItem value={pseven[status]}>{pseven[status]}</MenuItem>
              <MenuItem value={peight[status]}>{peight[status]}</MenuItem>
              <MenuItem value={pnine[status]}>{pnine[status]}</MenuItem>
              <MenuItem value={pfive[status]}>{pten[status]}</MenuItem>
            </Select>
          </div>
          <div className="classdate">
            <div className="app_title">{ss[status]}</div>
            <Divider className="app_line"></Divider>

            <div className="appwrap">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  value={starting}
                  onChange={(newValue) => {
                    setstarting(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      className="editrest"
                      variant="standard"
                      sx={{
                        color: '#745140',
                        paddingLeft: '0px',
                        paddingBottom: '5px',
                        fontFamily: 'Lora',
                        letterSpacing: '0.8px',
                        fontSize: '15px',
                        '& .MuiInputLabel-root': { color: '#b25634' },

                        ' .css-1wt0ykv::before': {
                          borderBottom: '1.5px solid #D6A796',
                        },
                        ' .css-1wt0ykv::after': {
                          borderBottom: '1.5px solid #74514080',
                        },
                        '& .css-1wt0ykv:hover:not(.Mui-disabled):before': {
                          borderBottom: '1.5px solid #D6A796',
                        },
                        svg: {
                          color: '#b25634',
                        },

                        input: {
                          color: '#745140',
                          paddingLeft: '0px',
                          paddingBottom: '5px',
                          fontFamily: 'Lora',
                          letterSpacing: '0.8px',
                          fontSize: '15px',
                        },
                        label: {
                          color: '#b25634',
                          fontFamily: 'Lora',
                          '&:hover': {
                            color: '#b25634',
                          },
                          '&:focus': {
                            color: '#b25634',
                          },
                        },
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="classdate">
            <div className="app_title">{sss[status]}</div>
            <Divider className="app_line"></Divider>
            <div className="appwrap">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  value={ending}
                  onChange={(newValue) => {
                    setending(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      className="editrest"
                      variant="standard"
                      sx={{
                        color: '#745140',
                        paddingLeft: '0px',
                        paddingBottom: '5px',
                        fontFamily: 'Lora',
                        letterSpacing: '0.8px',
                        fontSize: '15px',
                        '& .MuiInputLabel-root': { color: '#b25634' },

                        ' .css-1wt0ykv::before': {
                          borderBottom: '1.5px solid #D6A796',
                        },
                        ' .css-1wt0ykv::after': {
                          borderBottom: '1.5px solid #74514080',
                        },
                        '& .css-1wt0ykv:hover:not(.Mui-disabled):before': {
                          borderBottom: '1.5px solid #D6A796',
                        },
                        svg: {
                          color: '#b25634',
                        },

                        input: {
                          color: '#745140',
                          paddingLeft: '0px',
                          paddingBottom: '5px',
                          fontFamily: 'Lora',
                          letterSpacing: '0.8px',
                          fontSize: '15px',
                        },
                        label: {
                          color: '#b25634',
                          fontFamily: 'Lora',
                          '&:hover': {
                            color: '#b25634',
                          },
                          '&:focus': {
                            color: '#b25634',
                          },
                        },
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
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
              <div className="submissionlinkwrap">
                <div className="submissiontitle">{jjrr[status]}</div>
                <input
                  id="editlink"
                  type="text"
                  value={submissionlink}
                  placeholder={ras[status]}
                  onChange={(e) => {
                    setsubmissionlink(e.target.value)
                  }}
                />
              </div>
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
            <div className="app_title">{jj[status]}</div>
            <Divider className="app_line"></Divider>
            <div className="wraptodos">
              <textarea
                id="edittodos"
                type="text"
                value={links}
                placeholder={rrrxx[status]}
                onChange={(e) => {
                  setLinks(e.target.value)
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
