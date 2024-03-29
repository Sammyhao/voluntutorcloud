import React, { useState, useEffect } from 'react'
import './Admin_pair.css'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import PropTypes from 'prop-types'
import DialogTitle from '@mui/material/DialogTitle'
import Axios from 'axios'
import Loading from './Loading'

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

let curPair = 0
let role = ''

export default function Admin_pair() {
  const navigate = useNavigate()
  const [opendialog, setopen] = useState()
  const [clickednum, setclickednum] = useState(0)
  const [account, setaccount] = useState('')
  const [password, setpassword] = useState('')

  const closeopen = () => {
    setopen(false)
  }

  const [stpair, setStpair] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    Axios.post(
      'https://voluntutorcloud-server.herokuapp.com/findAllContact',
    ).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let tempStpair = response.data[i]
        console.log(tempStpair)
        Axios.all([
          Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getUserProfile',
            {
              username: tempStpair.username,
            },
          ),
          Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getUserProfile',
            {
              username: tempStpair.studentname,
            },
          ),
        ]).then(
          Axios.spread((response1, response2) => {
            console.log({
              teacher: tempStpair.username,
              teacherRN:
                response1.data[0].lastname + response1.data[0].firstname,
              teacherPW: response1.data[0].password,
              studentRN: tempStpair.studentname,
              meetlink: response1.data[0].googlemeetlink,
              student: response2.data[0].username,
              studentPW: response2.data[0].password,
            })
            setStpair((stpair) => [
              ...stpair,
              {
                teacher: tempStpair.username,
                teacherRN:
                  response1.data[0].lastname + response1.data[0].firstname,
                teacherPW: response1.data[0].password,
                studentRN: tempStpair.studentname,
                meetlink: response1.data[0].googlemeetlink,
                student: response2.data[0].username,
                studentPW: response2.data[0].password,
              },
            ])
          }),
        )
      }
      setLoading(false)
    })
  }, [])

  const [student1, setstudent1] = useState([
    {
      teacher: '老師1',
      student: '學生1',
      link: 'https....',
    },
    {
      teacher: '老師2',
      student: '學生2',
      link: 'https....',
    },
    {
      teacher: '老師3',
      student: '學生3',
      link: 'https....',
    },
  ])
  const [student2, setstudent2] = useState([
    {
      teacher: '老師1',
      student: '學生1',
      link: 'https....',
    },
    {
      teacher: '老師2',
      student: '學生2',
      link: 'https....',
    },
    {
      teacher: '老師3',
      student: '學生3',
      link: 'https....',
    },
  ])
  const [student3, setstudent3] = useState([
    {
      teacher: '老師1',
      student: '學生1',
      link: 'https....',
    },
    {
      teacher: '老師2',
      student: '學生2',
      link: 'https....',
    },
    {
      teacher: '老師3',
      student: '學生3',
      link: 'https....',
    },
  ])
  const [student4, setstudent4] = useState([
    {
      teacher: '老師1',
      student: '學生1',
      link: 'https....',
    },
    {
      teacher: '老師2',
      student: '學生2',
      link: 'https....',
    },
    {
      teacher: '老師3',
      student: '學生3',
      link: 'https....',
    },
  ])
  useEffect(() => {
    setaccount('abc')
    setpassword('abc')
    //fetch data here
  }, [clickednum])

  if (isLoading) return <Loading />

  return (
    <div className="admin_wrap">
      <div id="dialogcontainer">
        <BootstrapDialog
          className="admin_dialog"
          aria-labelledby="customized-dialog-title"
          open={opendialog}
          onClose={closeopen}
        >
          <div className="admin_dialog_wrap">
            {role === 'teacher' ? (
              <>
                <div
                  className="admin_dialog_text"
                  onClick={() => console.log(curPair, ' ', role)}
                >
                  帳號：{curPair.teacher}
                </div>
                <div className="admin_dialog_text">
                  密碼：{curPair.teacherPW}
                </div>
              </>
            ) : (
              <>
                <div
                  className="admin_dialog_text"
                  onClick={() => console.log(curPair, ' ', role)}
                >
                  帳號：{curPair.student}
                </div>
                <div className="admin_dialog_text">
                  密碼：{curPair.studentPW}
                </div>
              </>
            )}
          </div>
        </BootstrapDialog>
      </div>
      <div
        className="backtosignin"
        onClick={() => {
          navigate('/sign-in')
        }}
      >
        回到登入頁面
      </div>
      <div
        className="backtosignin"
        onClick={() => {
          navigate('/admin')
        }}
      >
        查看會議記錄表
      </div>
      <div
        className="backtosignin"
        onClick={() => {
          navigate('/adminuser')
        }}
      >
        查看註冊資料
      </div>
      <div
        className="backtosignin"
        onClick={() => {
          navigate('/adminbook')
        }}
      >
        查看會議預約
      </div>
      <div className="admin_title">學生老師配對</div>
      <div className="admin_notif">點擊老師或學生帳號以查看帳號密碼</div>
      {/* <div className="subtitle">大溪國小</div> */}
      <div className="chart_pair">
        <div className="admin_chart_pair">
          <div className="content_admin">老師</div>
          <div className="content_admin">學生</div>
          <div className="content_admin">Google meet</div>
        </div>
        {stpair.map((e, ind) => {
          return (
            <div className="admin_chart_pair">
              <div
                className="content_pair"
                onClick={() => {
                  curPair = e
                  role = 'teacher'
                  console.log(curPair)
                  setclickednum(ind)
                  setopen(true)
                }}
              >
                {e.teacherRN}
              </div>
              <div
                className="content_pair"
                onClick={() => {
                  curPair = e
                  role = 'student'
                  console.log(curPair)
                  setclickednum(ind)
                  setopen(true)
                }}
              >
                {e.studentRN}
              </div>
              <a className="content_pair" href={e.meetlink} target="_blank">
                打開會議
              </a>
            </div>
          )
        })}
      </div>
      {/* <div className="subtitle">廣興國小</div>
      <div className="chart_pair">
        <div className="admin_chart_pair">
          <div className="content_admin">老師</div>
          <div className="content_admin">學生</div>
          <div className="content_admin">Google meet</div>
        </div>
        {student1.map((e, ind) => {
          return (
            <div className="admin_chart_pair">
              <div
                className="content_pair"
                onClick={() => {
                  setclickednum(ind)
                  setopen(true)
                }}
              >
                {e.teacher}
              </div>
              <div
                className="content_pair"
                onClick={() => {
                  setclickednum(ind)
                  setopen(true)
                }}
              >
                {e.student}
              </div>
              <a className="content_pair" href={e.link} target="_blank">
                打開會議
              </a>
            </div>
          )
        })}
      </div>
      <div className="subtitle">溫泉國小</div>
      <div className="chart_pair">
        <div className="admin_chart_pair">
          <div className="content_admin">老師</div>
          <div className="content_admin">學生</div>
          <div className="content_admin">Google meet</div>
        </div>
        {student1.map((e, ind) => {
          return (
            <div className="admin_chart_pair">
              <div
                className="content_pair"
                onClick={() => {
                  setclickednum(ind)
                  setopen(true)
                }}
              >
                {e.teacher}
              </div>
              <div
                className="content_pair"
                onClick={() => {
                  setclickednum(ind)
                  setopen(true)
                }}
              >
                {e.student}
              </div>
              <a className="content_pair" href={e.link} target="_blank">
                打開會議
              </a>
            </div>
          )
        })}
      </div>
      <div className="subtitle">崁頂國小</div>
      <div className="chart_pair">
        <div className="admin_chart_pair">
          <div className="content_admin">老師</div>
          <div className="content_admin">學生</div>
          <div className="content_admin">Google meet</div>
        </div>
        {student1.map((e, ind) => {
          return (
            <div className="admin_chart_pair">
              <div
                className="content_pair"
                onClick={() => {
                  setclickednum(ind)
                  setopen(true)
                }}
              >
                {e.teacher}
              </div>
              <div
                className="content_pair"
                onClick={() => {
                  setclickednum(ind)
                  setopen(true)
                }}
              >
                {e.student}
              </div>
              <a className="content_pair" href={e.link} target="_blank">
                打開會議
              </a>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}
