import React, { useState, useEffect } from 'react'
import './Programusage.css'
import '../App.css'
import { FaUser } from 'react-icons/fa'
import Loading from './Loading'
import { useSelector } from 'react-redux'
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
  // const [contactlength, setlength] = useState(false)
  // let flag = false
  let a = [
    "Oops, seems like you don't have any student yet.",
    '噢, 看來您還沒有任何學生呢。',
  ]
  let b = ['Go and Join a Volunteering Program!!', '趕快去報名志工活動吧！！']
  let c = ['Total hours left: ', '剩餘小時數：']
  let d = [' hrs', '小時']
  let e = ['Records', '課堂紀錄']
  let f = ['Agenda', '課堂進度']
  let g = ['Date', '課堂日期']
  let h = ['Notes', '課堂筆記']

  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    setStatus(user.language)
    setRole(user.role)
    if (user.role) {
      username = user.username
      Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
        username: username,
      }).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          const student = response.data[i]
          setStpair((stpair) => [...stpair, student])
          console.log(student)
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getRecord', {
            username: student.username,
            studentname: student.studentname,
            studentmail: student.studentmail,
            echelon: 2,
          }).then((response) => {
            console.log(response.data);
            if (response.data.length) {
              setContactInfo((contactInfo) => [...contactInfo, response.data])
              // setlength(true)
            } else {
              setContactInfo((contactInfo) => [...contactInfo, {hoursleft: 8, studentname: student.studentname, username: student.username}])
            }
          })
        }
        setLoading(false)
      })
    } else {
      studentname = user.name
      Axios.post(
        'https://voluntutorcloud-server.herokuapp.com/findContactbyName',
        {
          studentname: studentname,
        },
      )
        .then((response) => {
          if (response.data.length === 0) setLoading(false)
          let student = response.data[0]
          setStpair((stpair) => [...stpair, student])
          Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getRecord',
            {
              username: student.username,
              studentname: student.studentname,
              studentmail: student.studentmail,
              echelon: 2,
            },
          ).then((response) => {
            if (response.data.length) {
              setContactInfo((contactInfo) => [...contactInfo, response.data])
              // setlength(true)
            } else {
              setContactInfo((contactInfo) => [...contactInfo, [{classdate: "no class", hoursleft: 8, studentname: student.studentname, username: student.username}]])
            }
            setLoading(false)
          })
        })
    }
  }, [user])
  const contacttemp = contactInfo.map((item) => item).reverse()

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
        </div>
      </div>
    )
  }

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
    console.log(contactInfo);
    console.log(contacttemp);
    return (
      <div className="outcontainerprog">
        <div className="subjectlist">
          {contacttemp.map((st) => {
            console.log(st);
            if(st[0].classdate === "no class") {
              return noRecord(st[0].studentname)
            } else {
              let time = st[st.length - 1].hoursleft
              console.log(time);
              return (
                <div className="outsidewrapsub">
                  <div className="wrapsubj">
                    <div className="subject">
                      <div className="second">
                        <div className="imageprog">
                          <FaUser className="prog_avatar" />
                        </div>
                        <div className="total">
                          <div className="sub">
                              {st[0].studentname}
                          </div>
                          <div className="time">
                            {c[status]}
                            {time}
                            {d[status]}
                          </div>
                        </div>
                      </div>
                      <div className="progressbar">
                        <Progress done={time} />
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
                      {st.map((record) => {
                        console.log(record);
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
                                  <div className="content_rec_sec_ag">
                                    <div className="title_content_rec">
                                      {h[status]}
                                    </div>
                                    <div className="content_content_rec">
                                      {record.notes}
                                    </div>
                                  </div>
                                </div>
                                <div className="content_not">
                                  {record.agenda}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }
}

export default Programusage
