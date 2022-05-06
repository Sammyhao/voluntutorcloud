import React, { useState, useEffect } from 'react'
import './Studymat.css'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
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
  let status = 0
  let gradearr_eng = [
    {
      id: 'Grade 1',
      index: ['0', '1', '2', '3'],
      subjects: [
        '/images/home_chine.png',
        '/images/home_math.png',
        '/images/home_eng.png',
        '/images/home_socia.png',
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
        '/images/home_socia.png',
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

  let subMat = [];

  function fetchSubMat(grade, subject) {
    console.log(grade, subject);
    Axios.post("https://voluntutorcloud-server.herokuapp.com/getSubMat", {
      grade: grade,
      subject: subject
    }).then((response) => {
      console.log(response);
      subMat = response.data;
    })
  }

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
            <div id="studydialog">Detailed Materials</div>
            <div id="links">{}</div>
            <div id="links">links</div>
            {subMat.map((mat) => {
              return (
                <>
                  <div id="links">{mat.chapterDesc}: {mat.link}</div>
                </>
              )
            })}

            <div></div>
          </BootstrapDialog>
        </div>
        <div className="titlestudytotal">Study Materials</div>
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
                            setopen(true)
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
  } else {
  }
}

// let gradearr_ch = [
//   {
//     id: '一年級',
//     index: ['0', '1', '2', '3'],
//     subjects: [
//       '/images/home_chine.png',
//       '/images/home_math.png',
//       '/images/home_eng.png',
//       '/images/home_socia.png',
//     ],
//     subjects_name: ['國文', '數學', '英文', '生活'],
//   },
//   {
//     id: '二年級',
//     index: ['0', '1', '2', '3'],
//     subjects: [
//       '/images/home_chine.png',
//       '/images/home_math.png',
//       '/images/home_eng.png',
//       '/images/home_socia.png',
//     ],
//     subjects_name: ['國文', '數學', '英文', '生活'],
//   },
//   {
//     id: '三年級',
//     index: ['0', '1', '2', '3', '4'],
//     subjects: [
//       '/images/home_chine.png',
//       '/images/home_math.png',
//       '/images/home_eng.png',
//       '/images/home_socia.png',
//       '/images/home_science.png',
//     ],
//     subjects_name: ['國文', '數學', '英文', '社會', '自然'],
//   },
//   {
//     id: '四年級',
//     index: ['0', '1', '2', '3', '4'],
//     subjects: [
//       '/images/home_chine.png',
//       '/images/home_math.png',
//       '/images/home_eng.png',
//       '/images/home_socia.png',
//       '/images/home_science.png',
//     ],
//     subjects_name: ['國文', '數學', '英文', '社會', '自然'],
//   },
//   {
//     id: '五年級',
//     index: ['0', '1', '2', '3', '4'],
//     subjects: [
//       '/images/home_chine.png',
//       '/images/home_math.png',
//       '/images/home_eng.png',
//       '/images/home_socia.png',
//       '/images/home_science.png',
//     ],
//     subjects_name: ['國文', '數學', '英文', '社會', '自然'],
//   },
//   {
//     id: '六年級',
//     index: ['0', '1', '2', '3', '4'],
//     subjects: [
//       '/images/home_chine.png',
//       '/images/home_math.png',
//       '/images/home_eng.png',
//       '/images/home_socia.png',
//       '/images/home_science.png',
//     ],
//     subjects_name: ['國文', '數學', '英文', '社會', '自然'],
//   },
// ]
