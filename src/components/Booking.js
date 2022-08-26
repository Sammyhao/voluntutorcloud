import React, { useState, useEffect } from 'react'
import { Divider } from '@mui/material'
import './Booking.css'
import emailjs from 'emailjs-com'
import Loading from './Loading'
import Axios from 'axios'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { Bookingcomp } from './Bookingcomp'
import { format } from 'date-fns'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import Select from '@mui/material/Select'
import { useSelector } from 'react-redux'
import MenuItem from '@mui/material/MenuItem'

import { TimePicker } from '@mui/x-date-pickers/TimePicker'

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

export default function Booking() {
  const [chosenStuname, setChosenStuname] = useState('')
  const [noneopen, setnoneopen] = useState(false)
  const [bookedwarn, setbookedwarn] = useState(false)
  const [open, setOpen] = useState(false)
  const [timeopen, settimeopen] = useState(false)
  const [finalopen, setfinalopen] = useState(false)
  const [starttime, setstarttime] = useState(
    new Date('2018-01-01T00:00:00.000Z'),
  )
  const [endtime, setendtime] = useState(new Date('2018-01-01T00:00:00.000Z'))
  const [status, setStatus] = useState(1)
  const [isLoading, setLoading] = useState(true)
  const [contactInfo, setContactInfo] = useState([])
  const [bookingInfo, setBookingInfo] = useState([])
  const [bookingInfoLen, setBookingInfoLen] = useState(0)
  const [chosenEmail, setChosenEmail] = useState('')
  const [pendingBookingInfo, setPendingBookingInfo] = useState([])
  const [name, setName] = useState('')
  const [formatteddate, setformatteddate] = useState('')
  const [formattedstart, setformattedstart] = useState('')
  const [formattedend, setformattedend] = useState('')
  const [formattedduration, setformattedduration] = useState(0.0)
  const [formatteddurationmin, setformatteddurationmin] = useState(0)
  const [formatteddurationhrs, setformatteddurationhrs] = useState(0)
  const [datedate, setdatedate] = useState(new Date())
  const [selectedstudentname, setstudentname] = useState('')
  const [selectedstudentid, setstudentid] = useState(0)

  let username = ''
  let studentname = ''
  let datearr = []

  // titles
  let n = [
    "Oops, seems like you don't have any student yet.",
    '噢, 看來您還沒有任何學生呢。',
  ]

  const [studentnamelist, setstudentnamelist] = useState([])
  let rr = [
    'Which student are you sending the request to?',
    '要傳送會議邀請給誰？',
  ]
  let o = ['Go and Join a Volunteering Program!!', '趕快去報名志工活動吧！！']
  let a = ['Book A Meeting', '預約會議']
  let b = ['Send Invitation', '傳送邀請']
  let c = ['Date: ', '日期：']
  let cc = ["Student's name: ", '學生姓名：']
  let d = [
    'Enter the Date (Format: 2022/05/01)',
    '請輸入日期 (格式：2022/05/01)',
  ]
  let ee = ['The time you entered is invalid', '您輸入的時間不正確']
  let e = ['Time: ', '時間：']
  let f = [
    'Enter the Time (Format: 18:00~19:00)',
    '請輸入時間 (格式：18:00~19:00)',
  ]
  let g = ['Duration: ', '課程時長：']
  let h = [
    'Enter the Duration (Numbers only, format: 1.5)',
    '請輸入課程時長 (僅限數字，格式：1.5)',
  ]
  let hh = ["Student's name: ", '學生姓名：']
  let i = [
    'Please double check before you send the invitation.',
    '在傳送前請再次確認資料是否有誤。',
  ]
  let j = ['Please fill in all the fields.', '請完整填入資訊']
  let k = [
    'Booking Invitation sent. Please check the message box if the student is unavailable during the time.',
    '會議邀請已傳送，請留意聊天室訊息以確定學生能參加此時段的會議。',
  ]
  let mm = [
    "There isn't any upcoming meetings yet :)",
    '目前沒有即將到來的會議 :)',
  ]
  let nn = ["There isn't any pending requests :)", '目前沒有待確認的會議邀請']
  let l = ['Upcoming Meetings', '即將到來的會議']
  let q = ['Pending Requests', '待確認的會議邀請']
  let x = ['Ending time: ', '課堂結束時間：']
  let z = ['Starting time: ', '課堂開始時間：']
  // dialog
  const handleClose = () => {
    setOpen(false)
  }
  const handleBook = () => {
    setbookedwarn(false)
  }
  const handlenoneclose = () => {
    setnoneopen(false)
  }
  const handlefinalclose = () => {
    setfinalopen(false)
  }
  const handletimeclose = () => {
    settimeopen(false)
  }

  // functions
  const sendfirst = () => {
    //console.log('Date entered')
    if (selectedstudentname === '') {
      setnoneopen(true)
    } else {
      if (endtime.getTime() < starttime.getTime()) {
        settimeopen(true)
      } else {
        setformatteddate(format(datedate, 'yyyy-MM-dd'))
        setformattedstart(format(starttime, 'HH:mm'))
        setformattedend(format(endtime, 'HH:mm'))
        let hrs = 0
        let mins = 0
        if (endtime.getMinutes() < starttime.getMinutes()) {
          mins = endtime.getMinutes() - starttime.getMinutes() + 60
          hrs = endtime.getHours() - starttime.getHours() - 1
        } else {
          mins = endtime.getMinutes() - starttime.getMinutes()
          hrs = endtime.getHours() - starttime.getHours()
        }
        setformatteddurationmin(mins)
        setformatteddurationhrs(hrs)
        setformattedduration((hrs + mins / 60).toFixed(2))
        //console.log(formattedduration)
        //console.log(formatteddurationhrs)
        //console.log(formatteddurationmin)
        setOpen(true)
      }
    }
  }

  const sendsecond = () => {
    setOpen(false)
    // save the data here (date,time,duration)
    //console.log('You better come in')
    updateBooking()
    //console.log('bookingdone')
    setfinalopen(true)
  }

  function deleteBooking(booking) {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/deleteBooking', {
      username: booking.username,
      studentname: booking.studentname,
      status: booking.status,
      date: booking.date,
      time: booking.time,
      duration: booking.duration,
    })
  }

  function checkBookingInfoValidity(bkinfo) {
    setBookingInfoLen(bkinfo.length)
    for (let i = 0; i < bkinfo.length; i++) {
      var date = bkinfo[i].date
      datearr = date.split('-')
      for (let j = 0; j < date.length; j++) {
        datearr[j] = Number(datearr[j])
      }
      datearr = datearr.slice(0, 3)
      //console.log(datearr)
      let d = new Date().getDate()
      let m = new Date().getMonth() + 1
      let y = new Date().getFullYear()
      //console.log("today's date: ", d, m, y)
      if (datearr[0] < y) {
        //console.log(y + ' is greater than ' + datearr[0])
        // delete booking
        deleteBooking(bkinfo[i])
        bkinfo.splice(i, 1)
        setBookingInfoLen(bkinfo.length - 1)
        i--
      } else if (datearr[0] === y) {
        if (datearr[1] < m) {
          // delete booking
          //console.log(m + ' is greater than ' + datearr[1])
          deleteBooking(bkinfo[i])
          bkinfo.splice(i, 1)
          setBookingInfoLen(bkinfo.length - 1)
          i--
        } else if (datearr[1] === m) {
          if (datearr[2] < d) {
            // delete booking
            //console.log(d + ' is greater than ' + datearr[2])
            deleteBooking(bkinfo[i])
            bkinfo.splice(i, 1)
            setBookingInfoLen(bkinfo.length - 1)
            i--
          }
        }
      }
    }
    return bkinfo
  }

  const updateBooking = () => {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateBooking', {
      username: name,
      studentname: selectedstudentname,
      date: formatteddate,
      time: formattedstart + '~' + formattedend,
      duration: formattedduration,
      status: 'pending',
    }).then((response) => {
      //console.log(response)
      var templateParams = {
        parent_email: chosenEmail,
        student: selectedstudentname,
        teacher: name,
      }
      //console.log(templateParams)
      emailjs
        .send(
          'service_z12yzef',
          'template_86pdu89',
          templateParams,
          'QZBU3bIops8KtosSX',
        )
        .then(
          function (response) {
            //console.log('SUCCESS!', response.status, response.text)
          },
          function (error) {
            //console.log('FAILED...', error)
          },
        )
    })

    let content = name + ' have sent your a booking request'
    Axios.post('https://voluntutorcloud-server.herokuapp.com/addNotif', {
      username: selectedstudentname,
      type: '/book',
      title: 'Booking',
      content: content,
      isnew: true,
    }).then((response) => {
      //console.log(response)
    })

    setdatedate(new Date())
    setstarttime(new Date())
    setendtime(new Date())
  }
  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    setStatus(user.language)
    setName(user.username)
    username = user.username
    console.log(username)
    Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
      username: username,
    }).then((response) => {
      console.log(response.data[0])
      setContactInfo(response.data)
      for (let i = 0; i < response.data.length; i++) {
        setstudentnamelist((studentnamelist) => [
          ...studentnamelist,
          response.data[i].studentname,
        ])
      }
      setstudentname(response.data[0].studentname)
      setChosenStuname(studentname)
      setChosenEmail(response.data[0].studentmail)

      for (let i = 0; i < response.data.length; i++) {
        studentname = response.data[i].studentname
        //console.log(username, studentname)
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getBooking', {
          username: username,
          studentname: studentname,
          status: 'confirmed',
        }).then((response) => {
          //console.log(response)
          setBookingInfo((bookingInfo) => [
            ...bookingInfo,
            checkBookingInfoValidity(response.data),
          ])
          // setBookingInfo(response.data)
        })
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getBooking', {
          username: username,
          studentname: studentname,
          status: 'pending',
        }).then((response) => {
          //console.log(response)
          setPendingBookingInfo((pendingBookingInfo) => [
            ...pendingBookingInfo,
            checkBookingInfoValidity(response.data),
          ])
        })
      }

      setLoading(false)
    })
  }, [])

  // 這裡true的條件改成是否有學生喔
  if (isLoading) {
    //console.log('contactinfo length: ', contactInfo.length)
    return <Loading></Loading>
  } else {
    if (contactInfo.length === 0) {
      return (
        <div className="nokid">
          <div className="noStudentFont">{n[status]}</div>
          <div className="noStudentFont2">{o[status]}</div>
        </div>
      )
    } else {
      //console.log(bookingInfo)
      //console.log(pendingBookingInfo)
      return (
        <div className="outestcontainerbook">
          <div id="dialogcontainer">
            <BootstrapDialog
              onClose={handleClose}
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <div className="bookingprogramdia"> {i[status]}</div>
              <div className="bookingprogramdia_sub">
                {cc[status]}
                {selectedstudentname}
              </div>
              <div className="bookingprogramdia_sub">
                {c[status]}
                {formatteddate}
              </div>
              <div className="bookingprogramdia_sub">
                {z[status]}
                {formattedstart}
              </div>
              <div className="bookingprogramdia_sub">
                {x[status]}
                {formattedend}
              </div>
              <div className="bookingprogramdia_sub">
                {g[status]}
                {formatteddurationhrs} hr {formatteddurationmin} mins
              </div>
              <div className="sendbookwrapper">
                <div className="sendbookingbtn" onClick={sendsecond}>
                  {b[status]}
                </div>
              </div>
            </BootstrapDialog>
          </div>
          <div id="dialogcontainer">
            <BootstrapDialog
              onClose={handletimeclose}
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={timeopen}
            >
              <div className="bookingprogramdia">{ee[status]}</div>
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
            </BootstrapDialog>
          </div>
          <div id="dialogcontainer">
            <BootstrapDialog
              onClose={handlefinalclose}
              id="diabook"
              aria-labelledby="customized-dialog-title"
              open={finalopen}
            >
              <div className="bookingfinal">{k[status]}</div>
            </BootstrapDialog>
          </div>
          <div className="outerbook">
            <div className="topbarbook">
              <div className="titlebook">{a[status]}</div>
              <div className="bookbtn" onClick={sendfirst}>
                {b[status]}
              </div>
            </div>
            <Divider></Divider>
            <div className="inputbook_outercont">
              <div className="titlebooksub">{hh[status]} </div>
              <div className="enterwrap">
                <Select
                  labelId="demo-simple-select-helper-label"
                  variant="standard"
                  className="inputstudentname"
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={selectedstudentname}
                  onChange={(e, child) => {
                    setstudentname(e.target.value)
                    setstudentid(child.props.id)
                  }}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <div className="selectplace">{rr[status]}</div>
                    }
                    return selected
                  }}
                  sx={{
                    color: '#b25634',
                    fontFamily: 'Lora',
                    letterSpacing: '2px',
                    fontSize: '20px',
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
                      color: '#b25634',
                    },
                    '& .MuiSvgIcon-root::before': {
                      borderBottom: '1.5px solid #D6A796',
                    },
                    '& .MuiSvgIcon-root::after': {
                      borderBottom: '1.5px solid #74514080',
                    },
                  }}
                >
                  {studentnamelist.map((e, i) => {
                    return (
                      <MenuItem id={i} value={e}>
                        {e}
                      </MenuItem>
                    )
                  })}
                </Select>
              </div>
            </div>
            <Divider></Divider>
            <div className="inputbook_outercont">
              <div className="titlebooksub">{c[status]} </div>
              <div className="enterwrap">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={datedate}
                    onChange={(newValue) => {
                      setdatedate(newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        className="inputbooking"
                        variant="standard"
                        sx={{
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
                            color: '#b25634',
                            fontFamily: 'Lora',
                            paddingLeft: '10px',
                            letterSpacing: '2px',
                            fontSize: '20px',
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
            <Divider></Divider>
            <div className="inputbook_outercont">
              <div className="titlebooksub">{z[status]} </div>
              <div className="enterwrap">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    value={starttime}
                    onChange={(newValue) => {
                      setstarttime(newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        className="inputbooking"
                        variant="standard"
                        sx={{
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
                            color: '#b25634',
                            fontFamily: 'Lora',
                            paddingLeft: '10px',
                            letterSpacing: '2px',
                            fontSize: '20px',
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
            <Divider></Divider>
            <div className="inputbook_outercont">
              <div className="titlebooksub">{x[status]} </div>
              <div className="enterwrap">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    value={endtime}
                    onChange={(newValue) => {
                      setendtime(newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        className="inputbooking"
                        variant="standard"
                        sx={{
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
                            color: '#b25634',
                            fontFamily: 'Lora',
                            paddingLeft: '10px',
                            letterSpacing: '2px',
                            fontSize: '20px',
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
          </div>
          <div className="outerbook_upcoming">
            <div className="topbarbook">
              <div className="titlebook">{l[status]}</div>
            </div>
            <Divider></Divider>
            <Bookingcomp
              msg={mm[status]}
              bookingInfo={bookingInfo}
            ></Bookingcomp>
          </div>
          <div className="outerbook_upcoming">
            <div className="topbarbook">
              <div className="titlebook">{q[status]}</div>
            </div>
            <Divider></Divider>
            <Bookingcomp
              msg={nn[status]}
              bookingInfo={pendingBookingInfo}
            ></Bookingcomp>
          </div>
        </div>
      )
    }
  }
}
