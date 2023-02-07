import React, { useState, useEffect } from 'react'
import './Programusage.css'
import '../App.css'
import MenuItem from '@mui/material/MenuItem'
import { FaUser } from 'react-icons/fa'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import Select from '@mui/material/Select'
import Axios from 'axios'
const Progress = ({ done }) => {
  const [style, setStyle] = React.useState({})

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${(100 * done) / 8}%`,
    }

    setStyle(newStyle)
  }, 200)

  return (
    <div className="progress">
      <div className="progress-done" style={style}>
        {done} hr
      </div>
    </div>
  )
}

let username = ''
let studentname = ''
function Programusage() {
  const [status, setStatus] = useState(1)
  const [contactInfo, setContactInfo] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [stpair, setStpair] = useState([])
  const [role, setRole] = useState(true)
  const [months, setmonths] = useState('5/1~6/30')

  const monthlist = ['5/1~6/30', '7/1~8/31', '9/1~10/31', '11/1~1/31']
  let a = [
    "Oops, seems like you don't have any student yet.",
    '噢, 看來您還沒有任何學生呢',
  ]
  let b = ['Go and Join a Volunteering Program!!', '趕快去報名志工活動吧！！']
  let c = ['Total hours left: ', '剩餘小時數：']
  let d = [' hrs', '小時']
  let e = ['Records', '課堂紀錄']
  let f = ['Agenda', '課堂進度']
  let g = ['Date', '課堂日期']
  let h = ['Notes', '課堂筆記']
  let i = ['No records yet', '暫無紀錄']
  let j = ['Search records: ', '查詢服務歷史：']
  let k = ['Select a time', '請選擇欲查詢時間']
  let l = ['Homework', '作業']
  let m = ['Homework upload link', '作業上傳連結']

  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    setStatus(user.language)
    setRole(user.role)
    if (user.role) {
      username = user.username
      Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
        username: username,
      }).then((response) => {
        const student = response.data[0]
        setStpair((stpair) => [...stpair, student])
        for (let i = 1; i <= monthlist.length; i++) {
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getRecord', {
            username: student.username,
            studentname: student.studentname,
            studentmail: student.studentmail,
            echelon: i,
          }).then((response) => {
            if (response.data.length) {
              setContactInfo((contactInfo) => [...contactInfo, response.data])
              // setlength(true)
            } else {
              setContactInfo((contactInfo) => [
                ...contactInfo,
                [
                  {
                    classdate: 'no class',
                    hoursleft: 8,
                    studentname: student.studentname,
                    username: student.username,
                  },
                ],
              ])
            }
            if (i === monthlist.length) setLoading(false)
          })
        }
        if (monthlist.length === 0) setLoading(false)
      })
    } else {
      studentname = user.name
      Axios.post(
        'https://voluntutorcloud-server.herokuapp.com/findContactbyName',
        {
          studentname: studentname,
        },
      ).then((response) => {
        if (response.data.length === 0) setLoading(false)
        let student = response.data[0]
        setStpair((stpair) => [...stpair, student])
        for (let i = 1; i <= monthlist.length; i++) {
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getRecord', {
            username: student.username,
            studentname: student.studentname,
            studentmail: student.studentmail,
            echelon: i,
          }).then((response) => {
            if (response.data.length) {
              setContactInfo((contactInfo) => [...contactInfo, response.data])
              // setlength(true)
            } else {
              setContactInfo((contactInfo) => [
                ...contactInfo,
                [
                  {
                    classdate: 'no class',
                    hoursleft: 8,
                    studentname: student.studentname,
                    username: student.username,
                  },
                ],
              ])
            }
            if (i === monthlist.length) setLoading(false)
          })
        }
        if (monthlist.length === 0) setLoading(false)
      })
    }
  }, [user])

  // const contacttemp = contactInfo.map((item) => item).reverse()
  const contacttemp = contactInfo
  const noRecord = (stname) => {
    return (
      <div className="outsidewrapsub">
        <div className="wrapsubj">
          <div className="subject">
            <div className="second">
              <div className="imageprog">
                <FaUser className="prog_avatar" />
              </div>
              <div className="total">
                <div className="sub">{stname}</div>
                <div className="time">
                  {c[status]}8{d[status]}
                </div>
              </div>
            </div>
            <div className="progressbar">
              <Progress done="8" />
            </div>
          </div>
        </div>
        <div className="outestwrapprogram">
          <div className="rowwrap">
            <div className="row1">
              <div className="title_rec">{e[status]}</div>
              <div className="title_not">{f[status]}</div>
            </div>
          </div>
          <div className="programusagewr">
            <div className="wrapwrap">
              <div className="gridwrapprog">
                <div className="row_none">{i[status]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const [echelon, setechelon] = useState(0)

  if (isLoading) {
    return <Loading />
  } else if (stpair.length === 0) {
    return (
      <div className="nokid">
        <div className="noStudentFont">{a[status]}</div>
        <div className="noStudentFont2">{b[status]}</div>
      </div>
    )
  } else {
    return (
      <div className="outcontainerprog">
        <div className="selectorwrap_pu">
          <div className="helpertitle">{j[status]}</div>
          <div className="">
            <Select
              labelId="demo-simple-select-helper-label"
              variant="standard"
              className="inputstudentname"
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              value={months}
              onChange={(e, child) => {
                setmonths(e.target.value)
                setechelon(child.props.id)
              }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <div className="selectplaceholder">{k[status]}</div>
                }
                return selected
              }}
              sx={{
                color: '#745140',
                fontFamily: 'Lora',
                fontSize: '15px',
                padding: '0px',
                paddingLeft: '5px',
                paddingRight: '5px',
                width: '150px',
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
                  color: '#745140',
                },
                '& .MuiSvgIcon-root::before': {
                  borderBottom: '1.5px solid #745140',
                },
                '& .MuiSvgIcon-root::after': {
                  borderBottom: '1.5px solid #745140',
                },
              }}
            >
              {monthlist.map((e, i) => {
                return (
                  <MenuItem id={i} value={e}>
                    {e}
                  </MenuItem>
                )
              })}
            </Select>
          </div>
        </div>
        <div className="subjectlist">
          {contacttemp[echelon][0].classdate === 'no class' ? (
            noRecord(contacttemp[echelon][0].studentname)
          ) : (
            <div className="outsidewrapsub">
              <div className="wrapsubj">
                <div className="subject">
                  <div className="second">
                    <div className="imageprog">
                      <FaUser className="prog_avatar" />
                    </div>
                    <div className="total">
                      <div className="sub">
                        {contacttemp[echelon][0].studentname}
                      </div>
                      <div className="time">
                        {c[status]}
                        {
                          contacttemp[echelon][contacttemp[echelon].length - 1]
                            .hoursleft
                        }
                        {d[status]}
                      </div>
                    </div>
                  </div>
                  <div className="progressbar">
                    <Progress
                      done={
                        contacttemp[echelon][contacttemp[echelon].length - 1]
                          .hoursleft
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="outestwrapprogram">
                <div className="rowwrap">
                  <div className="row1">
                    <div className="title_rec">{e[status]}</div>
                    <div className="title_not">{f[status]}</div>
                  </div>
                </div>
                <div className="programusagewr">
                  {contacttemp[echelon].map((record) => {
                    console.log(record)
                    return (
                      <div className="wrapwrap">
                        <div className="gridwrapprog">
                          <div className="row_rest">
                            <div className="content_rec">
                              <div className="content_rec_sec">
                                <div className="title_content_rec">
                                  {g[status]}
                                </div>
                                <div className="content_content_rec">
                                  {record.classdate}
                                </div>
                              </div>

                              <div className="content_rec_sec">
                                <div className="title_content_rec">
                                  {h[status]}
                                </div>
                                <div className="content_content_rec">
                                  {record.notes}
                                </div>
                              </div>

                              {record.task ? (
                                <div className="content_rec_sec">
                                  <div className="title_content_rec">
                                    {l[status]}
                                  </div>
                                  <div className="content_content_rec">
                                    {record.task}
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}

                              {record.link ? (
                                <div className="content_rec_sec">
                                  <div className="title_content_rec">
                                    {m[status]}
                                  </div>
                                  <div className="content_content_rec">
                                    <a
                                      style={{
                                        textDecoration: 'none',
                                        color: '#745140',
                                      }}
                                      href={record.link}
                                    >
                                      {record.link}
                                    </a>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="content_not">{record.agenda}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Programusage
