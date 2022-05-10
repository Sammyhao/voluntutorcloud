import React, { useState, useEffect } from 'react'
import './Studymat.css'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Axios from 'axios'
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
  const handleclose = () => {
    setopen(false)
  }
  let a = ["grade","年級"]
  let b = ["Detailed Materials","教學教材"]
  let c = ["Study Materials","志工教學教材"]
  let d = ["Study Materials can only be used for volunteering session purposes.","教學教材只限使用於志工教學，請勿濫用。"]
  let gradearr_eng = [
    {
      id: 'Grade 1',
      index: ['0', '1', '2', '3'],
      subjects: [
        '/images/home_chine.png',
        '/images/home_math.png',
        '/images/home_eng.png',
        '/images/home_eng.png',
      ],
      subjects_name: ['Chinese', 'Math', 'English', 'Life curriculum'],
    },
    {
      id: 'Grade 2',
      index: ['0', '1', '2', '3'],
      subjects: [
        '/images/home_chine.png',
        '/images/home_math.png',
        '/images/home_eng.png',
        '/images/home_eng.png',
      ],
      subjects_name: ['Chinese', 'Math', 'English', 'Life curriculum'],
    },
    {
      id: 'Grade 3',
      index: ['0', '1', '2', '3', '4'],
      subjects: [
        '/images/home_chine.png',
        '/images/home_math.png',
        '/images/home_eng.png',
        '/images/home_socia.png',
        '/images/home_science.png',
      ],
      subjects_name: [
        'Chinese',
        'Math',
        'English',
        'Social Studies',
        'Science',
      ],
    },
    {
      id: 'Grade 4',
      index: ['0', '1', '2', '3', '4'],
      subjects: [
        '/images/home_chine.png',
        '/images/home_math.png',
        '/images/home_eng.png',
        '/images/home_socia.png',
        '/images/home_science.png',
      ],
      subjects_name: [
        'Chinese',
        'Math',
        'English',
        'Social Studies',
        'Science',
      ],
    },
    {
      id: 'Grade 5',
      index: ['0', '1', '2', '3', '4'],
      subjects: [
        '/images/home_chine.png',
        '/images/home_math.png',
        '/images/home_eng.png',
        '/images/home_socia.png',
        '/images/home_science.png',
      ],
      subjects_name: [
        'Chinese',
        'Math',
        'English',
        'Social Studies',
        'Science',
      ],
    },
    {
      id: 'Grade 6',
      index: ['0', '1', '2', '3', '4'],
      subjects: [
        '/images/home_chine.png',
        '/images/home_math.png',
        '/images/home_eng.png',
        '/images/home_socia.png',
        '/images/home_science.png',
      ],
      subjects_name: [
        'Chinese',
        'Math',
        'English',
        'Social Studies',
        'Science',
      ],
    },
  ]

  
let gradearr_ch = [
  {
    id: '一年級',
    index: ['0', '1', '2', '3'],
    subjects: [
      '/images/home_chine.png',
      '/images/home_math.png',
      '/images/home_eng.png',
      '/images/home_socia.png',
    ],
    subjects_name: ['國文', '數學', '英文', '生活'],
  },
  {
    id: '二年級',
    index: ['0', '1', '2', '3'],
    subjects: [
      '/images/home_chine.png',
      '/images/home_math.png',
      '/images/home_eng.png',
      '/images/home_socia.png',
    ],
    subjects_name: ['國文', '數學', '英文', '生活'],
  },
  {
    id: '三年級',
    index: ['0', '1', '2', '3', '4'],
    subjects: [
      '/images/home_chine.png',
      '/images/home_math.png',
      '/images/home_eng.png',
      '/images/home_socia.png',
      '/images/home_science.png',
    ],
    subjects_name: ['國文', '數學', '英文', '社會', '自然'],
  },
  {
    id: '四年級',
    index: ['0', '1', '2', '3', '4'],
    subjects: [
      '/images/home_chine.png',
      '/images/home_math.png',
      '/images/home_eng.png',
      '/images/home_socia.png',
      '/images/home_science.png',
    ],
    subjects_name: ['國文', '數學', '英文', '社會', '自然'],
  },
  {
    id: '五年級',
    index: ['0', '1', '2', '3', '4'],
    subjects: [
      '/images/home_chine.png',
      '/images/home_math.png',
      '/images/home_eng.png',
      '/images/home_socia.png',
      '/images/home_science.png',
    ],
    subjects_name: ['國文', '數學', '英文', '社會', '自然'],
  },
  {
    id: '六年級',
    index: ['0', '1', '2', '3', '4'],
    subjects: [
      '/images/home_chine.png',
      '/images/home_math.png',
      '/images/home_eng.png',
      '/images/home_socia.png',
      '/images/home_science.png',
    ],
    subjects_name: ['國文', '數學', '英文', '社會', '自然'],
  },
]

  const [subMat, setSubMat] = useState([]);
  const [sub, setsub] = useState("");
  const [gra, setgra] = useState("");
  let username = "";
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if(isLoading) {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
        console.log(response.data);
        username = response.data.user[0].username;
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getLang', {
          username: username,
        }).then((response) => {
          console.log(response.data);
          if(response.data == "chinese") setStatus(1);
          else setStatus(0);
          console.log(status);
          setLoading(false);
        })
      })
    }
  }, [])

  function fetchSubMat(grade, subject) {
    console.log(grade, subject);
    setsub(subject);
    setgra(grade);
    Axios.post("https://voluntutorcloud-server.herokuapp.com/getSubMat", {
      grade: grade,
      subject: subject
    }).then((response) => {
      console.log(response);
      setSubMat(response.data);
      setopen(true)
    })
  }

  if (isLoading){
    console.log("isLoading");
    return(
      <Loading/>
    )
  }else{
    if (status == 0) {
      return (
        <div className="outerwrapstudy">
          <div id="dialog_reg_wrap">
            <BootstrapDialog
              onClose={handleclose}
              id="dialog_registered"
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <div id="studydialog">{gra} {a[status]} / {sub} {b[status]}</div>
              <div id="warningdialogstudy">{d[status]}</div>
              <div className = "wrapperlinks">
                {subMat.map((mat) => {
                  console.log("mat");
                  console.log(mat);
                  return (
                    <div className='wordlinkwrapping'>
                      <div className = "dotforstudy">• </div>
                      <a id="links"
                      href={mat.link}
                      target="_blank">{mat.chapterDesc}</a>
                    </div>
                  )
                })}
              </div>
              
            </BootstrapDialog>
          </div>
          <div className="titlestudytotal">{c[status]}</div>
          <div className="studymatsecondwrap">
            {gradearr_eng.map((e) => {
              return (
                <div className="studymatwrap">
                  <div className="studymattitle">{e.id}</div>
                  <div className="titleandimg">
                    <div className="studysubjectwrap">
                      {e.index.map((i) => (
                        <div>
                          <img
                            className="studysubject"
                            src={e.subjects[i]}
                            onClick={() => {
                              let grade = e.id.substring(e.id.length - 1);
                              console.log(grade, e.subjects_name[i]);
                              fetchSubMat(grade, e.subjects_name[i]);
                            }}
                          ></img>
                          <div className="subjectwords">{e.subjects_name[i]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }else{
      return (
        <div className="outerwrapstudy">
          <div id="dialog_reg_wrap">
            <BootstrapDialog
              onClose={handleclose}
              id="dialog_registered"
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <div id="studydialog">{gra} {a[status]} / {sub} {b[status]}</div>
              <div id="warningdialogstudy">{d[status]}</div>
              <div className = "wrapperlinks">
                {subMat.map((mat) => {
                  console.log("mat");
                  console.log(mat);
                  return (
                    <div className='wordlinkwrapping'>
                      <div className = "dotforstudy">• </div>
                      <a id="links"
                      href={mat.link}
                      target="_blank">{mat.chapterDesc}</a>
                    </div>
                  )
                })}
              </div>
              
            </BootstrapDialog>
          </div>
          <div className="titlestudytotal">{c[status]}</div>
          <div className="studymatsecondwrap">
            {gradearr_ch.map((e) => {
              return (
                <div className="studymatwrap">
                  <div className="studymattitle">{e.id}</div>
                  <div className="titleandimg">
                    <div className="studysubjectwrap">
                      {e.index.map((i) => (
                        <div>
                          <img
                            className="studysubject"
                            src={e.subjects[i]}
                            onClick={() => {
                              let grade = e.id.substring(e.id.length - 1);
                              console.log(grade, e.subjects_name[i]);
                              fetchSubMat(grade, e.subjects_name[i]);
                            }}
                          ></img>
                          <div className="subjectwords">{e.subjects_name[i]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }
}