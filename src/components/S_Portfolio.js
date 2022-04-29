import React, { useEffect, useState } from 'react'
import './Portfolio.css'
import Axios from 'axios'
import { FaUser } from 'react-icons/fa'
import Loading from './Loading'

import { Divider } from '@mui/material'
import { CgNametag } from 'react-icons/cg'
export default function S_Portfolio() {
  let username = ''
  let contactInfo = []
  const [studentProfolio, setStudentProfolio] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [status, setStatus] = useState(0);
  const [name, setname] = useState('VolunTutor Cloud')
  const [phone, setphone] = useState('0912345678')
  const [email, setemail] = useState('vc@gmail.com')
  const [gender, setgender] = useState('other')
  const [birthday, setbirthday] = useState('20040101')
  const [grade, setgrade] = useState('11th')
  const [school, setschool] = useState('Wego Private High School')
  const [preferredsubject, setpreferredsubject] = useState('Math')
  const [studentage, setstudentage] = useState('3th')
  const [studentgender, setstudentgender] = useState('No preference')
  const [studentpers, setstudentpers] = useState('outgoing')
  const [bio, setbio] = useState('For Better Unity, Help Your Community ')
  const [about, setabout] = useState('Join Voluntutor Cloud!')
  
  let a = ["Oops, seems like you don't have any student yet.","噢, 看來您還沒有任何學生呢。"]
  let b = ["Go and Join a Volunteering Program!!", "趕快去報名志工活動吧！！"]
  let c = ["Teacher's Portfolio","老師檔案"]
  let d = ["Learn More About Your Teacher!!","來了解你的老師吧！"]
  let f = ['Contact Information', '聯絡資訊']
  let g = ['Phone: ', '手機號碼：']
  let i = ['Email: ', 'Email帳號：']
  let j = ['Personal Information', '個人資料']
  let k = ['Gender: ', '性別：']
  let m = ['Birthday: ', '生日：']
  let o = ['Grade: ', '年級：']
  let q = ['School: ', '學校：']
  let bc = ['Bio', '自介']
  let de = ['About me', '關於我']
  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
      if (response.data.isLoggedIn) {
        username = response.data.user[0].username
        console.log(username)
      }
      Axios.post('https://voluntutorcloud-server.herokuapp.com/getLang', {
        username: username,
      }).then((response) => {
        console.log(response.data);
        if(response.data == "chinese") setStatus(1);
        else setStatus(0);
        console.log(status);
      })
      Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
        username: username,
      }).then((response) => {
        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
          // console.log(i);
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getProfolio', {
            name: response.data[i].studentname,
          }).then((response) => {
            if (response.data.length) {
              setStudentProfolio((studentProfolio) => [
                ...studentProfolio,
                response.data,
              ])
            }
          })
        }
        setLoading(false)
      })
    })
  }, [])

  if (isLoading){
    return(
      <Loading/>
    )
  }else if(studentProfolio.length == 0) {
    return (
      <div className = "outcontainer_port">
      <div className="top_bar">
          <div className="image_port">
            <img className="pic_port" src="/images/children_learning.png" />
          </div>
          <div className="words_port">
            <div className="t_port">{c[status]}</div>
            <div className="sub_port">{d[status]}</div>
          </div>
        </div>
      <div className = "nokidport">
        <div className="noStudentFont">{a[status]}</div>
        <div className="noStudentFont2">{b[status]}</div>
      </div>
      </div>
    )
  } else {
    console.log('finish loading')
    console.log(studentProfolio)
    return (
      <div className="outcontainer_port">
        <div className="top_bar">
          <div className="image_port">
            <img className="pic_port" src="/images/children_learning.png" />
          </div>
          <div className="words_port">
            <div className="t_port">{c[status]}</div>
            <div className="sub_port">{d[status]}</div>
          </div>
        </div><div className="frameteacherport">
        <div className="backgroundteacher">
        <div className="profile">
          <div className="imageprofile">
            <FaUser className="prof_icon_main" />
          </div>
          <div className="nameprof">
            <div className="editn">{name}</div>
          </div>
        </div>
        <div className="containerprofile">
          <div className="left">
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{f[status]}</div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                <div className="wrapprof">
                  <div className="textbef">{g[status]} </div>
                  <div className="edittablen">{phone}</div>
                </div>
                <div className="wrapprof">
                  <div className="textbef">{i[status]}</div>
                  <div className="edittablen">{email}</div>
                </div>
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{j[status]}</div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                <div className="wrapprof">
                  <div className="textbef">{k[status]} </div>
                  <div className="edittablen">{gender}</div>
                </div>
                <div className="wrapprof">
                  <div className="textbef">{m[status]} </div>
                  <div className="edittablen">{birthday}</div>
                </div>
                <div className="wrapprof">
                  <div className="textbef">{o[status]}</div>
                  <div className="edittablen">{grade}</div>
                </div>
                <div className="wrapprof">
                  <div className="textbef">{q[status]} </div>
                  <div className="edittablen">{school}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="contact" id="bio_contact">
              <div className="titleprofile">
                <div className="titlepro">{bc[status]}</div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">

                <div className="wrapprof">
                  <div className="textn">{bio}</div>
                </div>
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile" id="aboutmetitle">
                <div className="titlepro">{de[status]}</div>
              </div>
              <Divider className="line"></Divider>
              <div className="information" id="bioandhobby">

                <div className="wrapprof">
                  <div className="textn">{about}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    )
  }
}
