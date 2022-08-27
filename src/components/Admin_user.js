import React, { useState, useEffect } from 'react'
import './Admin_appointment'
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

export default function Admin_user() {
  const navigate = useNavigate()
  const [opendialog, setopen] = useState()
  const [clickednum, setclickednum] = useState(0)
  const [userList, setUserList] = useState([])
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    //fetch data here
    Axios.post('https://voluntutorcloud-server.herokuapp.com/addFullName').then((response) => {
      console.log(response.data);
    })
    Axios.post('https://voluntutorcloud-server.herokuapp.com/getUser').then(
      (response) => {
        setUserList(response.data)
        /*
      userList[i] = {
        id: userList[i].id
        username: userList[i].username
        password: userList[i].password
        role: userList[i].role
        firstname: userList[i].firstname
        lastname: userList[i].lastname
        fullname: userList[i].fullname
        gender: userList[i].gender
        phone: userList[i].phone
        email: userList[i].email
        birthday: userList[i].birthday
        grade: userList[i].grade
        schoolname: userList[i].schoolname
        preferredSubjects: userList[i].preferredsubjects
        targetStuAge: userList[i].targetStuAge
        targetStuGen: userList[i].targetStuGen
        targetStuPerso: userList[i].targetStuPerso
        bio: userList[i].bio
        about: userList[i].about
        googlemeetlink: userList[i].googlemeetlink
        lang: userList[i].lang
        curvolprog: userList[i].curvolprog
      }
      */
      },
    )
    setLoading(false)
  }, [clickednum])

  if (isLoading) {
    return <Loading />
  } else {
    console.log(userList)
    return (
      <div className="admin_wrap">
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
            navigate('/pair')
          }}
        >
          查看學生老師配對
        </div>
        <div
          className="backtosignin"
          onClick={() => {
            navigate('/adminbook')
          }}
        >
          查看會議預約
        </div>

        <div
          className="backtosignin"
          onClick={() => {
            navigate('/admin')
          }}
        >
          查看會議記錄表
        </div>
        <div className="admin_title">使用者註冊表</div>
        <div className="chart">
          <div className="admin_chart">
            <div className="content">帳號</div>
            <div className="content">密碼</div>
            <div className="content">老師/學生</div>
            <div className="content">名字</div>
            <div className="content">姓氏</div>
            <div className="content_special">老師就讀學校</div>
            <div className="content_special">欲教導科目</div>
            <div className="content_special">欲教導學生年齡</div>
            <div className="content_special">欲教導學生性別</div>
            <div className="content_special">欲教導學生性格</div>
          </div>
          {userList.reverse().map((e, ind) => {
            return (
              <div className="admin_chart">
                <div className="content">{e.username}</div>
                <div className="content">{e.password}</div>
                <div className="content">{e.role}</div>
                <div className="content">{e.firstname}</div>
                <div className="content">{e.lastname}</div>
                {e.role === 'teacher' ? (
                  <div className="content_special">{e.schoolname}</div>
                ) : (
                  <></>
                )}
                {e.role === 'teacher' ? (
                  <div className="content_special">{e.preferredSubjects}</div>
                ) : (
                  <></>
                )}
                {e.role === 'teacher' ? (
                  <div className="content_special">{e.targetStuAge}</div>
                ) : (
                  <></>
                )}
                {e.role === 'teacher' ? (
                  <div className="content_special">{e.targetStuGen}</div>
                ) : (
                  <></>
                )}
                {e.role === 'teacher' ? (
                  <div className="content_special">{e.targetStuPerso}</div>
                ) : (
                  <></>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
