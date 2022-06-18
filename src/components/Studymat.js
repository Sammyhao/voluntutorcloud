import * as React from 'react'
import { useState, useEffect, ChangeEvent, ChangeEventHandler } from 'react'
import './Studymat.css'
import PropTypes from 'prop-types'
import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Axios from 'axios'
import { Studygrid } from './Studygrid'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
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

export default function Studymat() {
  const [open, setopen] = useState(false)
  const [grade, setgradestate] = useState({
    一年級: false,
    二年級: false,
    三年級: false,
    四年級: false,
    五年級: false,
    六年級: false,
  })
  const [subject, setsubjectstate] = useState({
    國文: false,
    數學: false,
    英文: false,
    生活: false,
    社會: false,
    自然: false,
  })
  const [school, setschoolstate] = useState({
    大溪國小: false,
    廣興國小: false,
  })
  const { 一年級, 二年級, 三年級, 四年級, 五年級, 六年級 } = grade

  const { 國文, 數學, 英文, 生活, 社會, 自然 } = subject

  const { 大溪國小, 廣興國小 } = school

  let aa = ['Filter Study Materials', '分類課堂教材']
  let a = ['By Grades', '依年級分類']
  let b = ['By Subjects', '依科目分類']
  let bb = ['By Schools', '依學校分類']
  let c = ['Study Materials', '志工教學教材']
  let d = [
    'Study Materials can only be used for volunteering session purposes.',
    '教學教材只限使用於志工教學，請勿濫用。',
  ]
  let e = ['Grade 1', '一年級']
  let f = ['Grade 2', '二年級']
  let g = ['Grade 3', '三年級']
  let h = ['Grade 4', '四年級']
  let i = ['Grade 5', '五年級']
  let j = ['Grade 6', '六年級']
  let k = ['Chinese', '國文']
  let l = ['Math', '數學']
  let m = ['English', '英文']
  let n = ['Social Studies', '社會']
  let o = ['Science', '自然']
  let p = ['Life Curriculum', '生活']

  const [studyarray, setstudyarray] = useState([])

  const subtrans = {
    Chinese: '國文',
    Math: '數學',
    English: '英文',
    Science: '自然',
    Social_Studies: '社會',
    Life_Curriculum: '生活',
  }

  const gratrans = {
    1: '一年級',
    2: '二年級',
    3: '三年級',
    4: '四年級',
    5: '五年級',
    6: '六年級',
  }

  const [filteredarray, setfiltered] = useState([])
  let submat = []
  const [sub, setsub] = useState('')
  const [chinsub, setchinsub] = useState('')
  const [gra, setgra] = useState('')
  let username = ''
  const [isLoading, setLoading] = useState(true)
  const [status, setStatus] = useState(0)

  useEffect(() => {
    console.log('filtered', filteredarray)
    if (isLoading) {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login')
        .then((response) => {
          console.log(response.data)
          username = response.data.user[0].username
          if (response.data.user[0].lang == 'chinese') setStatus(1)
          else setStatus(0)
          return Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getallSubMat',
            {},
          )
        })
        .then((response) => {
          console.log(response.data)
          submat = response.data
          console.log(submat)
          for (let i = 1; i < submat.length; i++) {
            console.log(submat[i])
            // subject
            submat[i].subject = subtrans[submat[i].subject]
            // grade
            submat[i].grade = gratrans[submat[i].grade]
            // school
            const schoollist = submat[i].school.split('|')
            submat[i].school = schoollist
            console.log(submat)
            setstudyarray(submat)
          }
          setopen(true)
          setLoading(false)
        })
    }
    setfiltered(studyarray)
  })

  useEffect(() => {
    let gradearr = []
    let schoolarr = []
    let subjectarr = []
    setfiltered([])
    for (const [key, value] of Object.entries(grade)) {
      if (value == true) {
        gradearr[gradearr.length] = key
      }
    }
    for (const [key, value] of Object.entries(school)) {
      if (value == true) {
        schoolarr[schoolarr.length] = key
      }
    }
    for (const [key, value] of Object.entries(subject)) {
      if (value == true) {
        subjectarr[subjectarr.length] = key
      }
    }
    if (gradearr.length == 0) {
      for (const [key, value] of Object.entries(grade)) {
        gradearr[gradearr.length] = key
      }
    }
    if (schoolarr.length == 0) {
      for (const [key, value] of Object.entries(school)) {
        schoolarr[schoolarr.length] = key
      }
    }
    if (subjectarr.length == 0) {
      for (const [key, value] of Object.entries(subject)) {
        subjectarr[subjectarr.length] = key
      }
    }
    console.log(gradearr)
    console.log(schoolarr)
    console.log(subjectarr)
    for (let ind = 0; ind < studyarray.length; ind++) {
      let obj = studyarray[ind]
      let gradeflag = false
      let schoolflag = false
      let subflag = false
      for (let s = 0; s < gradearr.length; s++) {
        if (obj.grade == gradearr[s]) {
          gradeflag = true
        }
      }
      for (let s = 0; s < schoolarr.length; s++) {
        if (obj.school == schoolarr[s]) {
          schoolflag = true
        }
      }
      for (let s = 0; s < subjectarr.length; s++) {
        if (obj.subject == subjectarr[s]) {
          subflag = true
        }
      }
      console.log(schoolflag)
      console.log(gradeflag)
      console.log(subflag)
      if (gradeflag && schoolflag && subflag) {
        setfiltered((filteredarray) => [...filteredarray, obj])
      }
    }

    console.log('filteredarray', filteredarray)
  }, [grade, subject, school])

  if (isLoading) {
    return <Loading />
  } else {
    return (
      <div className="outerwrapstudy">
        <div className="filter">
          <div className="filtertitle">{aa[status]}</div>
          <div className="filterunit">
            <div className="filtersub">{a[status]}</div>
            <Divider className="filterline"></Divider>
            <div className="spacing"></div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={一年級}
                    name="一年級"
                    onChange={(e) => {
                      setgradestate({
                        ...grade,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={e[status]}
                sx={{
                  color: '#745140',
                  height: '30px',
                  fontFamily: 'Lora',
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={二年級}
                    name="二年級"
                    onChange={(e) => {
                      setgradestate({
                        ...grade,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={f[status]}
                sx={{
                  color: '#745140',
                  height: '30px',
                  fontFamily: 'Lora',
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={三年級}
                    name="三年級"
                    onChange={(e) => {
                      setgradestate({
                        ...grade,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={g[status]}
                sx={{
                  color: '#745140',
                  height: '30px',
                  fontFamily: 'Lora',
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={四年級}
                    name="四年級"
                    onChange={(e) => {
                      setgradestate({
                        ...grade,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={h[status]}
                sx={{
                  color: '#745140',
                  fontFamily: 'Lora',
                  height: '30px',
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={五年級}
                    name="五年級"
                    onChange={(e) => {
                      setgradestate({
                        ...grade,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={i[status]}
                sx={{
                  color: '#745140',
                  fontFamily: 'Lora',
                  height: '30px',
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={六年級}
                    name="六年級"
                    onChange={(e) => {
                      setgradestate({
                        ...grade,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={j[status]}
                sx={{
                  color: '#745140',
                  fontFamily: 'Lora',
                  height: '30px',
                }}
              />
            </FormGroup>
          </div>
          <div className="filterunit">
            <div className="filtersub">{b[status]}</div>
            <Divider className="filterline"></Divider>
            <div className="spacing"></div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={國文}
                    name="國文"
                    onChange={(e) => {
                      setsubjectstate({
                        ...subject,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={k[status]}
                sx={{
                  color: '#745140',
                  height: '30px',
                  fontFamily: 'Lora',
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={數學}
                    name="數學"
                    onChange={(e) => {
                      setsubjectstate({
                        ...subject,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={l[status]}
                sx={{
                  color: '#745140',
                  height: '30px',
                  fontFamily: 'Lora',
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={英文}
                    name="英文"
                    onChange={(e) => {
                      setsubjectstate({
                        ...subject,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={m[status]}
                sx={{
                  color: '#745140',
                  height: '30px',
                  fontFamily: 'Lora',
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={生活}
                    name="生活"
                    onChange={(e) => {
                      setsubjectstate({
                        ...subject,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={p[status]}
                sx={{
                  color: '#745140',
                  height: '30px',
                  fontFamily: 'Lora',
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={社會}
                    name="社會"
                    onChange={(e) => {
                      setsubjectstate({
                        ...subject,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={n[status]}
                sx={{
                  color: '#745140',
                  fontFamily: 'Lora',
                  height: '30px',
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={自然}
                    name="自然"
                    onChange={(e) => {
                      setsubjectstate({
                        ...subject,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label={o[status]}
                sx={{
                  color: '#745140',
                  fontFamily: 'Lora',
                  height: '30px',
                }}
              />
            </FormGroup>
          </div>
          <div className="filterunit">
            <div className="filtersub">{bb[status]}</div>
            <Divider className="filterline"></Divider>
            <div className="spacing"></div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={大溪國小}
                    name="大溪國小"
                    onChange={(e) => {
                      setschoolstate({
                        ...school,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label="大溪國小"
                sx={{
                  color: '#745140',
                  height: '30px',
                  fontFamily: 'Lora',
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={廣興國小}
                    name="廣興國小"
                    onChange={(e) => {
                      setschoolstate({
                        ...school,
                        [e.target.name]: e.target.checked,
                      })
                    }}
                    style={{
                      color: '#745140',
                    }}
                  />
                }
                label="廣興國小"
                sx={{
                  color: '#745140',
                  height: '30px',
                  fontFamily: 'Lora',
                }}
              />
            </FormGroup>
          </div>
        </div>
        <div className="studymatsecondwrap">
          <Grid container spacing={4}>
            {filteredarray.map((e) => {
              return <Studygrid studymt={e} status={status}></Studygrid>
            })}
          </Grid>
        </div>
      </div>
    )
  }
}
