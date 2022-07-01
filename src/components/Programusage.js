import React, { useState, useEffect, useLayoutEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import './Programusage.css'
import '../App.css'
import { FaUser } from 'react-icons/fa'

import { Multi_Students } from './Multi_Students'
import Loading from './Loading'
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

let studentnum = 2
let studentnamemulti = 'name'
function Programusage() {
  const [status, setStatus] = useState(0)
  const [contactInfo, setContactInfo] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [stpair, setStpair] = useState([])

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

  useLayoutEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        username = response.data.user[0].username
        if (response.data.user[0].lang == 'chinese') setStatus(1)
        else setStatus(0)

        return Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
          username: username,
        })
      }).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          const student = response.data[i]
          setStpair((stpair) => [...stpair, student])
          console.log(student)
          Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getRecord',
            {
              username: student.username,
              studentname: student.studentname,
              studentmail: student.studentmail,
            },
          ).then((response) => {
            if (response.data.length)
              setContactInfo((contactInfo) => [...contactInfo, response.data])
          })
        }
        setLoading(false)
      })
  }, [])

  const contacttemp = contactInfo.map((item) => item).reverse()

  const showContactInfo = () => {
    console.log(contactInfo)
  }

  let num = [1, 2, 3]
  let rec = [1, 2, 3, 4, 5]

  const showContact = (contact) => {
    console.log(contact)
  }

  const hoursleft = () => {}

  if (isLoading) {
    return <Loading />
  } else if (stpair.length == 0) {
    console.log('isLoading')
    return (
      <div className="nokid">
        <div className="noStudentFont">{a[status]}</div>
        <div className="noStudentFont2">{b[status]}</div>
      </div>
    )
  } else if (contactInfo.length == 0) {
    console.log('isLoading')
    console.log('stpair')
    console.log(stpair)
    return (
      <div className="outcontainerprog">
        {/* <div className="searchprog" onClick={showContactInfo}>
          Find subjects
          <BiSearchAlt className="searchicon"></BiSearchAlt>
        </div> */}

        <div className="subjectlist">
          {stpair.map((st) => {
            return (
              <div className="outsidewrapsub">
                <div className="wrapsubj">
                  <div className="subject">
                    <div className="second">
                      <div className="imageprog">
                        <FaUser className="prog_avatar" />
                      </div>
                      <div className="total">
                        <div className="sub" onClick={() => showContact(st)}>
                          {st.studentname}
                        </div>
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
                <div className="rowwrap">
                  <div className="row1">
                    <div className="title_rec">{e[status]}</div>
                    <div className="title_not">{f[status]}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  } else {
    console.log('finish Loading')
    console.log(contactInfo)

    return (
      <div className="outcontainerprog">
        {/* <div className="searchprog" onClick={showContactInfo}>
          Find subjects
          <BiSearchAlt className="searchicon"></BiSearchAlt>
        </div> */}
        <div className="subjectlist">
          {contacttemp.map((contact) => {
            return (
              <div className="outsidewrapsub">
                <div className="wrapsubj">
                  <div className="subject">
                    <div className="second">
                      <div className="imageprog">
                        <FaUser className="prog_avatar" />
                      </div>
                      <div className="total">
                        <div
                          className="sub"
                          onClick={() => showContact(contact)}
                        >
                          {contact['0'].studentname}
                        </div>
                        <div className="time">
                          {c[status]}
                          {(contact[contact.length - 1].hoursleft) % 8}
                          {d[status]}
                        </div>
                      </div>
                    </div>
                    <div className="progressbar">
                      <Progress done={(contact[contact.length - 1].hoursleft) % 8} />
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
                    {contact.map((record) => {
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
                              <div className="content_not">{record.agenda}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
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

export default Programusage
