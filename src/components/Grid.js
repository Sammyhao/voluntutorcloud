import React, { useState, useEffect } from 'react'
import './Grid.css'
import { RiHeart3Line, RiHeart3Fill, RiMapPin2Fill } from 'react-icons/ri'
import '../App.css'
import emailjs from 'emailjs-com'
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
import IconButton from '@mui/material/IconButton'
import { popoverClasses } from '@mui/material'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

let subject = ''

const BootstrapDialogTitle = (props) => {
  const { children, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  )
}

function Heart(props) {
  const addedToList = props.addedToList

  function HeartOnClick(e) {
    e.preventDefault()
    addedToList = true
    console.log(addedToList)
  }
  function HeartUndoClick(e) {
    e.preventDefault()
    addedToList = false
    console.log(addedToList)
  }

  if (addedToList) {
    return <RiHeart3Fill className="heart_dialog" onClick={HeartOnClick} />
  }
  return <RiHeart3Line className="heart_dialog" onClick={HeartUndoClick} />
}

let program = 0

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
}

function Grid_sub(props) {
  const numberOfCards = 200
  const [open, setOpen] = useState(false)
  const [check_open_book, setcheckopen] = useState(false)
  const [open_book, setBookOpen] = useState(false)
  const [open_fav, setFavOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handlefav = () => {
    setFavOpen(false)
  }
  const handlebookclose = () => {
    setBookOpen(false)
  }
  const handlefinalclose = () => {
    setcheckopen(false)
  }
  // const bookingprogram = (program) => {
  //   setcheckopen(true)
  //   p = program
  // }
  // const [subject, setSubject] = useState('Math') // change the subject from here
  const [subject, setSubject] = useState(props.sub)
  const [programInfo, setProgramInfo] = useState([])
  const [schoolname, setSchoolname] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    let subjectFF = ''
    console.log('subject')
    console.log(subject)
    if (subject == '') subjectFF = 'chinese'
    else subjectFF = subject
    console.log(subjectFF)

    Axios.get('https://voluntutorcloud-server.herokuapp.com/program', {
      // subject: subjectFF,
    }).then((response) => {
      if (response.data.length) {
        setProgramInfo(response.data)
      }
    })

    let name = ''

    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        console.log(response)
        if (response.data.isLoggedIn) {
          setUsername(response.data.user[0].username)
          name = response.data.user[0].username
          if (response.data.user[0].lang == 'chinese') setStatus(1)
          else setStatus(0)
        }
      },
    )
  }, [])

  const [username, setUsername] = useState('')

  const updateBookList = () => {
    // Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
    setBookOpen(true)
    //   if (response.data.isLoggedIn) {
    //     var templateParams = {
    //       vc_program: p ,
    //       username: program.username
    //     }
    //     emailjs
    //     .send(
    //       'service_z12yzef',
    //       'template_zg8ezog',
    //       templateParams,
    //       'QZBU3bIops8KtosSX',
    //     )
    //     .then(
    //       function (response) {
    //         console.log('SUCCESS!', response.status, response.text)
    //       },
    //       function (error) {
    //         console.log('FAILED...', error)
    //       },
    //     )
    //   } else {
    //     console.log('user not logged in')
    //   }
    // })
  }

  const updateFavList = (program) => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login')
      .then((response) => {
        console.log(response)
        setFavOpen(true)
        if (response.data.isLoggedIn) {
          return Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/updateFavList',
            {
              username: username,
              program: program,
              isBooked: false,
            },
          )
        } else {
          console.log('user not logged in')
        }
      })
      .then((response) => {
        console.log(response)
      })
  }
  const [status, setStatus] = useState(0)
  let a = [
    "Oops, seems like you don't have any student yet.",
    '噢, 看來您還沒有任何學生呢。',
  ]
  let b = ['Go and Join a Volunteering Program!!', '趕快去報名志工活動吧！！']
  let c = ['My List', '我的最愛']
  let e = [
    'You cannot enroll in two programs at the same time.',
    '目前不得同時報名多個志工計畫',
  ]
  let d = ['You are already enrolled in a program.', '你已經在志工計畫當中囉~']
  let f = ['BOOK NOW!', '現在報名！']
  let g = ['Add to list', '加入最愛']
  let h = ['Dates/Service hours', '日期/服務時間']
  let i = ['Coordinator', '聯絡窗口']
  let j = ['Target Student', '學生年段']
  let k = ['View School', '查看學校']
  let l = ['Learn more...', '了解更多...']
  let n = [
    'Are you sure you want to book this program?',
    '你確定你要報名此志工計畫？按下送出後即無法收回。',
  ]
  let m = ['Yes', '確定送出']
  let o = [
    'There is no volunteering programs yet.',
    '目前沒有進行中的志工計畫。',
  ]
  let q = ['Stay tuned!', '敬請期待！']
  let z = ['Added to favorite list.', '已加入最愛']

  if (programInfo.length == 0) {
    return (
      <div className="nokid">
        <div className="noStudentFont">{o[status]}</div>
        <div className="noStudentFont2">{q[status]}</div>
      </div>
    )
  } else {
    return (
      <div id="outcontainer">
        <div id="dialog_reg_wrap">
          <BootstrapDialog
            onClose={handlefav}
            id="dialog_registered"
            aria-labelledby="customized-dialog-title"
            open={open_fav}
          >
            <div id="favoritetitle">{z[status]}</div>
          </BootstrapDialog>
        </div>
        <div id="dialog_reg_wrap">
          <BootstrapDialog
            onClose={handlebookclose}
            id="dialog_registered"
            aria-labelledby="customized-dialog-title"
            open={open_book}
          >
            <div id="bookingprogramdia">{d[status]}</div>
            <div id="bookingprogramdia_sub">{e[status]}</div>
          </BootstrapDialog>
        </div>
        <div id="dialog_reg_wrap">
          <BootstrapDialog
            onClose={handlefinalclose}
            id="dialog_registered"
            aria-labelledby="customized-dialog-title"
            open={check_open_book}
          >
            <div id="bookingprogramdia"> {n[status]}</div>
            <div id="bookingyet" onClick={updateBookList}>
              {m[status]}
            </div>
          </BootstrapDialog>
        </div>
        <div id="dialogcontainer">
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <div
              id="wrap"
              style={{
                background:
                  program.schoolpic + ' center center/cover no-repeat',
                width: '600px',
              }}
            >
              <div id="innerwrap">
                <Typography id="dialog_topic" variant="h5" component="div">
                  {program.schoolname}
                </Typography>
                <Typography
                  id="dialog_subtitle"
                  variant="subtitle2"
                  component="div"
                >
                  {program.schoolintro}
                </Typography>
                <div id="buttonwrap">
                  <Button
                    id="book"
                    size="small"
                    onClick={() => updateBookList(program)}
                  >
                    {f[status]}
                  </Button>
                  <Button
                    id="dialog_add"
                    size="small"
                    onClick={() => updateFavList(program)}
                  >
                    <RiHeart3Line className="heart_dialog" />
                    {g[status]}
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <div id="lowerwrap">
                <div id="loc">
                  <div id="location_inner">
                    <RiMapPin2Fill className="loc_dialog" />
                    <div id="position">{program.address}</div>
                  </div>
                  <div id="subject">{program.subject}</div>
                </div>
                <div id="content">
                  <div id="school_content">{program.content}</div>
                  <div id="misc">
                    {/* <div className="basicinfo" id="date_topic">
                    {h[status]}
                    </div>
                    <div className="basicinfo" id="day">
                      {program.day}
                    </div>
                    <div className="basicinfo" id="time">
                      {program.sttime}
                    </div> */}
                    <div className="basicinfo" id="coordinator_topic">
                      {i[status]}
                    </div>
                    <div className="basicinfo" id="phone">
                      {program.contactnum}
                    </div>
                    <div className="basicinfo" id="email">
                      {program.email}
                    </div>
                    <div className="basicinfo" id="target_topic">
                      {j[status]}
                    </div>
                    <div className="basicinfo" id="target">
                      {program.targetstudent}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BootstrapDialog>
        </div>
        {/* inMap */}
        <div id="gridcontainer">
          <Grid container id="container" spacing={4}>
            {programInfo.map((e) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} className="column">
                  <Card id="cardbox" justify="space-between">
                    <div id="imageouter">
                      <div id="imagebox">
                        <CardMedia
                          id="image"
                          component="img"
                          height="200"
                          image={e.schoolpicdia}
                          alt="school pic"
                        />
                      </div>
                      <div
                        class="image_overlay image_overlay -- blur"
                        onClick={() => {
                          program = e
                          setOpen(true)
                          console.log(program)
                        }}
                      >
                        <div class="image_text">{l[status]}</div>
                      </div>
                    </div>
                    {/* <Typography className="onhover">Learn more</Typography> */}
                    <CardContent>
                      <Typography
                        id="topic"
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {e.schoolname}
                      </Typography>
                      <Typography
                        id="subtopic"
                        variant="body2"
                        color="text.secondary"
                      >
                        {e.address}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        id="add"
                        size="small"
                        onClick={() => updateFavList(e)}
                      >
                        <RiHeart3Line className="heart" />
                        {g[status]}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    )
  }
}

export default Grid_sub
