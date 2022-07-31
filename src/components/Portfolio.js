// imports
import React, { useEffect, useState } from 'react'
import './Portfolio.css'
import Axios from 'axios'
import Loading from './Loading'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { MdOutlineArrowForwardIos, MdArrowBackIos } from 'react-icons/md'
import { Divider } from '@mui/material'
import { useSelector } from 'react-redux'

export default function Portfolio() {
  let username = ''
  let studentname = '',
    teacherusername = ''
  const [contactInfo, setContactInfo] = useState([])
  const [studentProfolio, setStudentProfolio] = useState([])
  const [status, setStatus] = useState(1)
  const [chosenContactIdx, setChosenContactIdx] = useState(0)
  const [nameclick, setnameclick] = useState(false)
  const [multistudentname, setMultistudentname] = useState([])
  const [role, setrole] = useState(true)
  const [isLoading, setLoading] = useState(true)

  const [name, setname] = useState('VolunTutor Cloud')
  const [phone, setphone] = useState('0912345678')
  const [email, setemail] = useState('vc@gmail.com')
  const [gender, setgender] = useState('other')
  const [birthday, setbirthday] = useState('20040101')
  const [grade, setgrade] = useState('11th')
  const [school, setschool] = useState('Wego Private High School')
  const [bio, setbio] = useState('Learn with us!!')
  const [about, setabout] = useState('Join Voluntutor Cloud!')
  // titles
  let a = [
    "Oops, seems like you don't have any student yet.",
    '噢, 看來您還沒有任何學生呢。',
  ]
  let b = ['Go and Join a Volunteering Program!!', '趕快去報名志工活動吧！！']
  let c = ["Student's Portfolio", '學生檔案']
  let d = ['Learn More About Your Student!!', '來了解你的學生吧！']
  let cc = ["Teacher's Portfolio", '老師檔案']
  let dd = ['Learn More About Your Teacher!!', '來了解你的老師吧！']
  let e = ['School: ', '學校：']
  let f = ['Grade: ', '年級：']
  let g = ['Age: ', '年紀：']
  let h = [
    'Do you want to learn more about your student?',
    '你想要更了解你的學生嗎？',
  ]
  let i = ['Learn more...', '了解更多...']
  let j = ['Personal Information', '個人資料']
  let k = ['Gender: ', '性別：']
  let l = ['Birthday: ', '生日：']
  let m = ['Contact Information', '聯絡資料']
  let n = ['Student', '學生']
  let o = ['Email: ', 'Email：']
  let p = ['Phone/Line ID: ', '電話號碼/Line ID：']
  let q = ['Parents', '學生家長']
  let r = ['Academics', '課程準備']
  let s = ['Required Subjects', '志工課程科目']
  let t = ['Teaching Material', '教學教材']
  let u = ['Additional Notes', '其他']
  let v = ['About The Student...', '關於學生']
  let w = ['Hobbies', '興趣']
  let x = ['Favorites', '喜好']
  let y = ['Subjects...', '科目...']
  let z = ['Colors...', '顏色...']
  let ab = ['Animals...', '動物...']
  let bc = ['Food...', '食物...']
  let cd = ['Idols...', '偶像...']
  let de = ['Something you are afraid of...', '害怕的事物...']
  let ef = ["The proudest thing you've accomplished...", '最驕傲的事...']
  let fg = ['Dreams and Goals...', '夢想和目標...']
  let gh = ['The most memorable thing in your life...', '最印象深刻的事...']
  let hi = [
    'The most precious things in the world...',
    '生命中最重要的人事物...',
  ]
  let ff = ['Contact Information', '聯絡資訊']
  let gg = ['Phone: ', '手機號碼：']
  let ii = ['Email: ', 'Email帳號：']
  let jj = ['Personal Information', '個人資料']
  let kk = ['Gender: ', '性別：']
  let mm = ['Birthday: ', '生日：']
  let oo = ['Grade: ', '年級：']
  let qq = ['School: ', '學校：']
  let bcc = ['Bio', '自介']
  let dee = ['About me', '關於我']
  let eff = ['Teacher', '老師/大學伴']
  let zzz = ['None', '無']
  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    setStatus(user.language)
    setrole(user.role)
    username = user.username
    if (user.role) {
      Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
        username: username,
      }).then((response) => {
        setContactInfo(response.data)
        if (response.data.length == 2) {
          setMultistudentname([response.data[1].studentname])
        }
        for (let i = 0; i < response.data.length; i++) {
          Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getProfolio',
            {
              name: response.data[i].studentname,
            },
          ).then((response) => {
            if (response.data.length) {
              setStudentProfolio((studentProfolio) => [
                ...studentProfolio,
                response.data,
              ])
            }
          })
        }
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
          teacherusername = response.data[0].username
          return Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getUserProfile',
            {
              username: teacherusername,
            },
          )
        })
        .then((response) => {
          setname(response.data[0].firstname + ' ' + response.data[0].lastname)
          setphone(response.data[0].phone)
          setemail(response.data[0].email)
          setgender(response.data[0].gender)
          setbirthday(response.data[0].birthday)
          setgrade(response.data[0].grade)
          setschool(response.data[0].schoolname)
          if (response.data[0].bio != '') setbio(response.data[0].bio)
          else setbio(bio)
          if (response.data[0].about != '') setabout(response.data[0].about)
          else setabout(about)
        })
    }
    setLoading(false)
  }, [])

  // multi students
  function multistyle() {
    console.log('into function')
    console.log(multistudentname)
    if (multistudentname.length == 0) {
      return <div></div>
    } else {
      console.log(multistudentname[0])
      return (
        <div className={nameclick ? 'choosekid active' : 'choosekid'}>
          <div className="multi">
            <div
              className="borderstudent"
              onClick={() => updateMultistudentname(multistudentname[0])}
            >
              {multistudentname[0]}
            </div>
          </div>
          {nameclick ? (
            <MdArrowBackIos
              className="kidicon"
              onClick={() => {
                setnameclick(!nameclick)
              }}
            ></MdArrowBackIos>
          ) : (
            <MdOutlineArrowForwardIos
              className="kidicon"
              onClick={() => {
                setnameclick(!nameclick)
              }}
            ></MdOutlineArrowForwardIos>
          )}
        </div>
      )
    }
  }

  const updateMultistudentname = (e) => {
    console.log(e)
    if (e == contactInfo[1].studentname) {
      console.log('zero change to one')
      setMultistudentname([contactInfo[0].studentname])
      setChosenContactIdx(1)
    } else {
      console.log('one change to zero')
      setMultistudentname([contactInfo[1].studentname])
      setChosenContactIdx(0)
    }
  }
  const checkblank = (content) => {
    if (content == '') {
      return zzz[status]
    } else {
      return content
    }
  }
  // final renders
  if (isLoading) {
    return <Loading />
  } else if (studentProfolio.length == 0) {
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
        </div>
        <div className="nokidport">
          <div className="noStudentFont">{a[status]}</div>
          <div className="noStudentFont2">{b[status]}</div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="outcontainer_port">
        {role ? <>{multistyle()}</> : <></>}
        <div className="top_bar">
          <div className="image_port">
            <img className="pic_port" src="/images/children_learning.png" />
          </div>
          <div className="words_port">
            <div className="t_port">
              {role ? <>{c[status]}</> : <>{cc[status]}</>}
            </div>
            <div className="sub_port">
              {role ? <>{d[status]}</> : <>{dd[status]}</>}
            </div>
          </div>
        </div>

        {role ? (
          <>
            <div className="basics">
              <div className="image_port_cont">
                <FaUser className="stuprof_icon" />
              </div>
              <div className="basicinfo_student">
                <div className="name_port">
                  {checkblank(studentProfolio[chosenContactIdx]['0'].name)}
                </div>
                <div className="others_port">
                  {e[status]}{' '}
                  {checkblank(studentProfolio[chosenContactIdx]['0'].school)}
                </div>
                <div className="others_port">
                  {f[status]}
                  {checkblank(studentProfolio[chosenContactIdx]['0'].grade)}
                </div>
                <div className="others_port">
                  {g[status]}{' '}
                  {checkblank(studentProfolio[chosenContactIdx]['0'].age)}
                </div>
              </div>
            </div>
            <div className="grid_port">
              <div className="first_port">
                <div className="infobox">
                  <div className="title_port">{j[status]}</div>
                  <Divider className="primline"></Divider>
                  <div className="content_port">
                    {k[status]}{' '}
                    {checkblank(studentProfolio[chosenContactIdx]['0'].gender)}
                  </div>
                  <div className="content_port">
                    {l[status]}{' '}
                    {checkblank(
                      studentProfolio[chosenContactIdx]['0'].birthday,
                    )}
                  </div>
                </div>
                <div className="infobox">
                  <div className="title_port">{m[status]}</div>
                  <Divider className="primline"></Divider>
                  <div className="subtitle_port">{n[status]}</div>
                  <div className="content_port">
                    {o[status]}{' '}
                    {checkblank(
                      studentProfolio[chosenContactIdx]['0'].studentmail,
                    )}
                  </div>
                  <div className="subtitle_port">{q[status]}</div>
                  <div className="content_port">
                    {p[status]}{' '}
                    {checkblank(
                      studentProfolio[chosenContactIdx]['0'].parentcontactnum,
                    )}
                  </div>
                  <div className="content_port">
                    {o[status]}{' '}
                    {checkblank(
                      studentProfolio[chosenContactIdx]['0'].parentmail,
                    )}
                  </div>
                </div>
                <div className="infobox">
                  <div className="title_port">{r[status]}</div>
                  <Divider className="primline"></Divider>
                  <div className="subtitle_port">{s[status]}</div>
                  <div className="content_port">
                    {checkblank(
                      studentProfolio[chosenContactIdx]['0'].requiredsub,
                    )}
                  </div>
                  <div className="subtitle_port">{t[status]}</div>
                  <Link className="studymat" to="/studymat">
                    <div className="learn_more_second">{i[status]}</div>
                  </Link>
                  <div className="subtitle_port">{u[status]}</div>
                  <div className="content_port">{zzz[status]}</div>
                </div>
              </div>
              <div className="second_port">
                <div className="infobox">
                  <div className="title_port">{v[status]}</div>
                  <Divider className="primline"></Divider>
                  <div className="subtitle_port">{w[status]}</div>
                  <div className="content_port_abt">
                    {checkblank(studentProfolio[chosenContactIdx]['0'].hobbies)}
                  </div>
                  <Divider className="subline"></Divider>

                  <div className="subtitle_port">{x[status]}</div>
                  <div className="subtitle_sub_port">{y[status]}</div>
                  <div className="content_port_abt">
                    {checkblank(studentProfolio[chosenContactIdx]['0'].favsub)}
                  </div>
                  <Divider className="subline"></Divider>
                  <div className="subtitle_sub_port">{z[status]}</div>
                  <div className="content_port_abt">
                    {checkblank(studentProfolio[chosenContactIdx]['0'].color)}
                  </div>
                  <Divider className="subline"></Divider>
                  <div className="subtitle_sub_port">{ab[status]}</div>
                  <div className="content_port_abt">
                    {checkblank(studentProfolio[chosenContactIdx]['0'].animal)}
                  </div>
                  <Divider className="subline"></Divider>
                  <div className="subtitle_sub_port">{bc[status]}</div>
                  <div className="content_port_abt">
                    {checkblank(studentProfolio[chosenContactIdx]['0'].food)}
                  </div>
                  <Divider className="subline"></Divider>
                  <div className="subtitle_sub_port">{cd[status]}</div>
                  <div className="content_port_abt">
                    {checkblank(studentProfolio[chosenContactIdx]['0'].idol)}
                  </div>
                  <Divider className="subline"></Divider>
                  <div className="subtitle_sub_port">{de[status]}</div>
                  <div className="content_port_abt">
                    {checkblank(studentProfolio[chosenContactIdx]['0'].fear)}
                  </div>
                  <Divider className="subline"></Divider>
                  <div className="subtitle_sub_port">{ef[status]}</div>
                  <div className="content_port_abt">
                    {checkblank(studentProfolio[chosenContactIdx]['0'].accom)}
                  </div>
                  <Divider className="subline"></Divider>
                  <div className="subtitle_sub_port">{fg[status]}</div>
                  <div className="content_port_abt">
                    {checkblank(studentProfolio[chosenContactIdx]['0'].dream)}
                  </div>
                  <Divider className="subline"></Divider>
                  <div className="subtitle_sub_port">{gh[status]}</div>
                  <div className="content_port_abt">
                    {checkblank(studentProfolio[chosenContactIdx]['0'].memor)}
                  </div>
                  <Divider className="subline"></Divider>
                  <div className="subtitle_sub_port">{hi[status]}</div>
                  <div className="content_port_abt">
                    {checkblank(studentProfolio[chosenContactIdx]['0'].prec)}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="frameteacherport">
              <div className="backgroundteacher">
                <div className="grid_port_student">
                  <div className="first_port">
                    <div className="infobox">
                      <div className="title_port">{eff[status]}</div>
                      <Divider className="primline"></Divider>
                      <div className="teachername">{name}</div>
                    </div>
                    <div className="infobox">
                      <div className="title_port">{ff[status]}</div>
                      <Divider className="primline"></Divider>
                      <div className="subtitle_port">{gg[status]}</div>
                      <div className="content_port">{phone}</div>
                      <div className="subtitle_port">{ii[status]}</div>
                      <div className="content_port">{email}</div>
                    </div>
                    <div className="infobox">
                      <div className="title_port">{dee[status]}</div>
                      <Divider className="primline"></Divider>
                      <div className="content_port">{about}</div>
                    </div>
                  </div>
                  <div className="second_port">
                    <div className="infobox">
                      <div className="title_port">{jj[status]}</div>
                      <Divider className="primline"></Divider>
                      <div className="subtitle_port">{kk[status]}</div>
                      <div className="content_port">{gender}</div>
                      <div className="subtitle_port">{mm[status]}</div>
                      <div className="content_port">{birthday}</div>
                      <div className="subtitle_port">{oo[status]}</div>
                      <div className="content_port">{grade}</div>
                      <div className="subtitle_port">{qq[status]}</div>
                      <div className="content_port">{school}</div>
                    </div>
                    <div className="infobox">
                      <div className="title_port">{bcc[status]}</div>
                      <Divider className="primline"></Divider>
                      <div className="content_port">{bio}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}
