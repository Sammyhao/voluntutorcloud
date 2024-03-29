import * as React from 'react'
import { useState, useEffect } from 'react'
import './Studymat.css'
import PropTypes from 'prop-types'
import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Axios from 'axios'
import { Studygrid } from './Studygrid'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { KEY_PREFIX } from 'redux-persist'
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
    崁頂國小: false,
    溫泉國小: false,
    義方國小: false,
    東成國小: false,
  })
  const { 一年級, 二年級, 三年級, 四年級, 五年級, 六年級 } = grade

  const { 國文, 數學, 英文, 生活, 社會, 自然 } = subject

  const { 大溪國小, 廣興國小, 崁頂國小, 溫泉國小, 義方國小, 東成國小 } = school

  let aa = ['Filter Study Materials', '分類課堂教材']
  let aaa = ['IMPORTANT!!', '重要通知！！']
  let a = ['By Grades', '依年級分類']
  let b = ['By Subjects', '依科目分類']
  let bb = ['By Schools', '依學校分類']

  let note = ['Notes', '備註']
  let linkssub = ['Links', '相關連結']
  let c = ['Study Materials', '志工教學教材']
  let d = [
    'Study Materials can only be used for volunteering session purposes.',
    '教學教材只限使用於志工教學，請勿濫用',
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
    Life_curriculum: '生活',
    Science: '自然',
    Social_Studies: '社會',
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
  const [isLoading, setLoading] = useState(true)
  const [status, setStatus] = useState(1)

  const user = useSelector((state) => state.user.value)
  const ne = 'https://onebook.oneclass.com.tw/'
  const neopen = () => {
    window.open(ne, '_blank', 'noopener,noreferrer')
  }
  const kx = 'https://digitalmaster.knsh.com.tw/ebook/index.html'
  const hl = 'https://edisc3.hle.com.tw/edisc_v3/index.html?t=1601339224'
  const kxopen = () => {
    window.open(kx, '_blank', 'noopener,noreferrer')
  }
  const hlopen = () => {
    window.open(hl, '_blank', 'noopener,noreferrer')
  }
  useEffect(() => {
    // console.log('filtered', filteredarray)
    if (isLoading) {
      setStatus(user.language)
      Axios.post(
        'https://voluntutorcloud-server.herokuapp.com/getallSubMat',
        {},
      ).then((response) => {
        submat = response.data
        for (let i = 0; i < submat.length; i++) {
          // subject
          submat[i].subject = subtrans[submat[i].subject]
          // grade
          submat[i].grade = gratrans[submat[i].grade]
          // school
          const schoollist = submat[i].school.split('|')
          submat[i].school = schoollist
          console.log(submat)
        }
        if (studyarray.length === 0) setstudyarray(submat)
        setopen(true)
        setLoading(false)
      })
    }
    setfiltered(studyarray)
  }, [studyarray])

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
      let count = 0
      if (gradearr.length === 6) {
        gradeflag = true
      }
      if (schoolarr.length == 6) {
        schoolflag = true
      }
      if (subjectarr.length == 6) {
        subflag = true
      }
      for (let s = 0; s < gradearr.length; s++) {
        if (obj.grade == gradearr[s]) {
          gradeflag = true
        }
      }
      for (let s = 0; s < schoolarr.length; s++) {
        if (obj.school.length == 6) {
          schoolflag = true
        }
        for (let x = 0; x < obj.school.length; x++) {
          if (obj.school[x] == schoolarr[s]) {
            count = count + 1
          }
        }
      }

      if (count >= schoolarr.length) {
        schoolflag = true
      }
      for (let s = 0; s < subjectarr.length; s++) {
        if (obj.subject === subjectarr[s]) {
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

    // console.log('filteredarray', filteredarray)
  }, [grade, subject, school])

  if (isLoading) {
    return <Loading />
  } else {
    return (
      <div className="outerwrapstudy">
        <div className="filterwrap">
          <div className="filter">
            <div className="filtertitle">{aaa[status]}</div>
            <div className="filterunit">
              <div className="filtersub">{note[status]}</div>
              <Divider className="filterline"></Divider>
              <div className="spacing"></div>
              <div
                style={{
                  color: '#745140',
                  fontFamily: 'Lora',
                  marginBottom: '50px',
                  fontSize: '15px',
                }}
              >
                <li
                  style={{
                    marginBottom: '15px',
                  }}
                >
                  南一教科書：能透過網站夠正常開啟
                </li>
                <li
                  style={{
                    marginBottom: '15px',
                  }}
                >
                  康軒教科書：需要請志工在使用教科書之前先至網站上登入帳號，登入後，即可回到網站透過網站打開教科書做使用
                </li>
                <li>
                  翰林教科書：由於帳號登入權限，無法透過網站開啟，請各位志工要使用教材時自行登入翰林教科書頁面並選取欲使用的教科書
                </li>
              </div>
            </div>
            <div className="filterunit">
              <div className="filtersub">{linkssub[status]}</div>
              <Divider className="filterline"></Divider>
              <div className="spacing"></div>
              <div className="linkstyle" onClick={neopen}>
                點我進入南一版網站
              </div>
              <div className="passcodes">
                帳號：hsesteacher<br></br>
                密碼：hses512354
              </div>
              <div className="linkstyle" onClick={kxopen}>
                點我進入康軒版網站
              </div>
              <div className="passcodes">
                帳號：elson0314<br></br> 密碼：0975252670
              </div>
              <div className="linkstyle" onClick={hlopen}>
                點我進入翰林版網站
              </div>
              <div className="passcodes">
                帳號：m6116789@gmail.com <br></br>密碼：666666
              </div>
            </div>
          </div>
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={崁頂國小}
                      name="崁頂國小"
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
                  label="崁頂國小"
                  sx={{
                    color: '#745140',
                    height: '30px',
                    fontFamily: 'Lora',
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={溫泉國小}
                      name="溫泉國小"
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
                  label="溫泉國小"
                  sx={{
                    color: '#745140',
                    height: '30px',
                    fontFamily: 'Lora',
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={義方國小}
                      name="義方國小"
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
                  label="義方國小"
                  sx={{
                    color: '#745140',
                    height: '30px',
                    fontFamily: 'Lora',
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={東成國小}
                      name="東成國小"
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
                  label="東成國小"
                  sx={{
                    color: '#745140',
                    height: '30px',
                    fontFamily: 'Lora',
                  }}
                />
              </FormGroup>
            </div>
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
