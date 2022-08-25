import React, { useState, useEffect } from 'react'
import './Admin_user.css'
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
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true)

  const closeopen = () => {
    setopen(false)
  }

  useEffect(() => {
    //fetch data here
    Axios.post('https://voluntutorcloud-server.herokuapp.com/getUser').then((response) => {
      setUserList(response.data);
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
        preferredsubjects: userList[i].preferredsubjects
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
    })
  }, [clickednum])

  if (isLoading) return <Loading />

  return (
    <></>
  )
}
