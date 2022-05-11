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
  const [hasSetStatus, setHasSetStatus] = useState(false);
  const [status, setStatus] = useState(0);
  const [name, setname] = useState('VolunTutor Cloud')
  const [phone, setphone] = useState('0912345678')
  const [email, setemail] = useState('vc@gmail.com')
  const [gender, setgender] = useState('other')
  const [birthday, setbirthday] = useState('20040101')
  const [grade, setgrade] = useState('11th')
  const [school, setschool] = useState('Wego Private High School')
  const [bio, setbio] = useState('For Better Unity, Help Your Community ')
  const [about, setabout] = useState('Join Voluntutor Cloud!')
  let a = [
    "Oops, you are not paired with a teacher yet!",
    '噢, 目前您還未和老師成功配對！',
  ]
  let b = ['We will assign you a teacher soon!', '我們會盡快配對一位老師給您！']
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
  let ef = ["None :)","還沒有填寫喔 :)"]
  let studentname = "", teacherusername = "";

  useEffect(() => {
    if(isLoading) {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
        username = response.data.user[0].username

        if(!hasSetStatus) {
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getLang', {
            username: username,
          }).then((response) => {
            console.log(response.data);
            if(response.data == "chinese") setStatus(1);
            else setStatus(0);
            setHasSetStatus(1);
            console.log(status);
          })
        }

        Axios.post('https://voluntutorcloud-server.herokuapp.com/getUserProfile', {
          username: username,
        }).then((response) => {
          console.log(response.data[0]);
          studentname = response.data[0].lastname + response.data[0].firstname;
          console.log("studentname:");
          console.log(studentname);
          setLoading(false)
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getTeacher', {
            studentname: studentname,
          }).then((response) => {
            teacherusername = response.data[0].username;
            console.log("teacherusername");
            console.log(teacherusername);
            Axios.post('https://voluntutorcloud-server.herokuapp.com/getUserProfile', {
              username: teacherusername,
            }).then((response) => {
              console.log(response.data[0]);
              setname(response.data[0].lastname + response.data[0].firstname);
              setphone(response.data[0].phone)
              setemail(response.data[0].email)
              setgender(response.data[0].gender);
              setbirthday(response.data[0].birthday)
              setgrade(response.data[0].grade)
              setschool(response.data[0].schoolname)
              (response.data[0].bio != "") ? setbio(response.data[0].bio) : setbio(bio);
              (response.data[0].about != "") ? setabout(response.data[0].about) : setabout(about);
              console.log(name, phone, email, gender, birthday, grade, school, bio, about);
              setLoading(false)
            })
          })
        })
      })
    }
  }, [])

  if (isLoading){
    console.log('is loading')
    return(
      <Loading/>
    )
  } else {
    console.log('finish loading')
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
