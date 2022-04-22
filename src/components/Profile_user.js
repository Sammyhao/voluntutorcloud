import React, { useState, useEffect } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { AiFillLock } from 'react-icons/ai'
import { MdModeEdit } from 'react-icons/md'
import { BsCheckLg } from 'react-icons/bs'

import './Profile_user.css'
import { Divider } from '@mui/material'
import Axios from 'axios'
import '../App.css'
import { Link, useNavigate, Route } from 'react-router-dom'
import validator from 'validator'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { popoverClasses } from '@mui/material';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))
function Profile_user() {
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
  const [errormessage, seterrormessage] = useState('')
  const [contacterror, setcontacterror] = useState('')
  const [personerror, setpersonerror] = useState('')
  const [prefererror, setprefererror] = useState('')
  const [bioerror, setbioerror] = useState('')
  const [abouterror, setabouterror] = useState('')
  const [priverror, setpriverror] = useState('')
  const [readonlycontact, setreadcontact] = useState('disabled')
  const [readonlypersoninfo, setreadpersoninfo] = useState('disabled')
  const [readonlyprefer, setreadprefer] = useState('disabled')
  const [readonlybio, setreadbio] = useState('disabled')
  const [readonlyabout, setreadabout] = useState('disabled')
  const [readonlypriv, setreadpriv] = useState('disabled')
  const [click, setClick] = useState(false)
  const [contactclick, setcontactclick] = useState(false)
  const [personinfoclick, setpersoninfoclick] = useState(false)
  const [preferclick, setpreferclick] = useState(false)
  const [bioclick, setbioclick] = useState(false)
  const [aboutclick, setaboutclick] = useState(false)
  const [privacyclick, setprivacyclick] = useState(false)
  // const [readonly, setread] = useState('')
  const [userInfo, setUserInfo] = useState([])
  const [emailError, setEmailError] = useState('')
  const [iconstyle, seticonstyle] = useState(<div><MdModeEdit/></div>)
  const [contactstyle, setcontactstyle] = useState(<div><BiEdit/></div>)
  const [persostyle, setpersostyle] = useState(<div><BiEdit/></div>)
  const [prefstyle, setprefstyle] = useState(<div><BiEdit/></div>)
  const [biostyle, setbiostyle] = useState(<div><BiEdit/></div>)
  const [aboutstyle, setaboutstyle] = useState(<div><BiEdit/></div>)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  
  // let a = ["Please enter your name.","請輸入你的使用者名稱"]
  let b = ["Please enter a valid email.","請輸入正確的Email"]
  let c = ["Please fill in the blanks.","請完整填入資訊"]
  let d = ["Please contact the administrator to change the password.","請聯絡主辦者以更改密碼。"]
  let e = ["Enter Your Name","請輸入你的名字"]
  let f = ["Contact Information","聯絡資訊"]
  let g = ["Phone: ","手機號碼："]
  let h = ["Enter Phone number","請輸入手機號碼"]
  let i = ["Email: ","Email帳號："]
  let hdf = ["Enter Email","請輸入Email帳號"]
  let j = ["Personal Information","個人資料"]
  let k = ["Gender: ","性別："]
  let l = ["Female/Male/Others","男/女/其他"]
  let m = ["Birthday: ","生日："]
  let n = ["Format: 2004/01/01","格式：2004/01/01"]
  let o =["Grade: ","年級："]
  let p = ["9th/10th/11th","九/十/十一"]
  let q = ["School: ","學校："]
  let r = ["Enter school","輸入學校"]
  let s = ["Preferences","喜好"]
  let t = ["Subjects: ","科目："]
  let u = ["ex: Chinese/Math...","例如：國/數..."]
  let v = ["Grade: ","年級："]
  let w = ["ex: 1th/2th","例如：一/二..."]
  let x = ["Gender: ","性別："]
  let y = ["Female/Male/No pref","男/女/無偏好"]
  let z = ["Character: ","性格："]
  let ab = ["Enter personality","輸入性格"]
  let bc = ["Bio","自介"]
  let cd = ["Add your bio here!","填入你的自介！"]
  let de = ["About me","關於我"]
  let ef = ["Tell us more about you!","讓我們更了解你吧！"]
  let fg = ["Language Setting","語言設定"]
  let gh = ["Privacy & Security","隱私以及安全性"]
  let hi = ["Change Password","更改密碼"]
  let ij = ["Log Out", "登出"]

  const BootstrapDialogTitle = (props) => {
    const { children, ...other } = props
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
      </DialogTitle>
    )
  }

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node
  }
  const handleClose = () => {
    setOpen(false)
  }
  // const handleClick = () => {
  //   if(name==""){
  //     seterrormessage(a[status])
  //   }else{
  //     seterrormessage("")
  //   setClick(!click)
  //   seticonstyle(<MdModeEdit/>)
  //   if(!click){
  //     setread("")
  //     seticonstyle(<BsCheckLg/>)
  //   }else{
  //     setread("disabled")
      
  //   }}
  // }
    
  const validateEmail = (e) => {
    var email = e.target.value
    if (!validator.isEmail(email)) {
      setEmailError(b[status])
    } else {
      setEmailError('')
    }
  }
  const handleclick_contact = () => {
    console.log(contactclick) 
    if(phone=="" || email==""){
      setcontacterror(c[status])
    }else
       {
      console.log("cc")
      setcontacterror("")
      setcontactclick(!contactclick)
      setcontactstyle(<BiEdit/>)
      if(!contactclick){
      setreadcontact("")
      setcontactstyle(<BsCheckLg/>)
    }else{
      setreadcontact("disabled")
    }}
  }

  const handleclick_pers = () => {
    console.log("dd")
    if(gender=="" || birthday=="" || grade=="" || school==""){
      setpersonerror(d[status])
    }else
       {
        setpersonerror("")
      setpersoninfoclick(!personinfoclick)
      setpersostyle(<BiEdit/>)
      if(!personinfoclick){
      setreadpersoninfo("")
      setpersostyle(<BsCheckLg/>)
    }else{
      setreadpersoninfo("disabled")
    }}
  }

  const handleclick_pref = () => {
    if(preferredsubject=="" || studentage=="" || studentgender=="" || studentpers==""){
      
      setprefererror(c[status])
      console.log(prefererror)
    }else
       {
        setprefererror("")
        setpreferclick(!preferclick)
        setprefstyle(<BiEdit/>)
      if(!preferclick){
        setreadprefer("")
        setprefstyle(<BsCheckLg/>)
    }else{
      setreadprefer("disabled")
    }}
  }

  const handleclick_bio = () => {
    
        setbioerror("")
        setbioclick(!bioclick)
        setbiostyle(<BiEdit/>)
      if(!bioclick){
        setreadbio("")
        setbiostyle(<BsCheckLg/>)
    }else{
      setreadbio("disabled")
    }
  }

  const handleclick_about = () => {
    
        setabouterror("")
        setaboutclick(!aboutclick)
        setaboutstyle(<BiEdit/>)
      if(!aboutclick){
        setreadabout("")
        setaboutstyle(<BsCheckLg/>)
    }else{
      setreadabout("disabled")
    }
  }
  
  const logout = () => {
    Axios.post("https://voluntutorcloud-server.herokuapp.com/logout").then((response) => {
      console.log(response);
    })
  }

  let username = "";
  const [isLoading, setLoadings] = useState(true);
  const [status, setStatus] = useState(0);
  
  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
      console.log(response.data);
      setname(response.data.user[0].username);
      username = response.data.user[0].username;
      Axios.post("https://voluntutorcloud-server.herokuapp.com/getUserProfile", {
        username: username
      }).then((response) => {
        console.log(response.data[0].username, response.data[0].phone);
        setphone(response.data[0].phone);
        setemail(response.data[0].email);
        setgender(response.data[0].gender);
        setbirthday(response.data[0].birthday);
        setgrade(response.data[0].grade);
        setschool(response.data[0].schoolname);
        setpreferredsubject(response.data[0].preferredSubjects);
        setstudentage(response.data[0].targetStuAge);
        setstudentgender(response.data[0].targetStuGen);
        setstudentpers(response.data[0].targetStuPerso);
        setbio(response.data[0].bio);
        setabout(response.data[0].about);
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getLang', {
          username: username,
        }).then((response) => {
          console.log(response.data);
          if(response.data == "chinese") setStatus(1);
          else setStatus(0);
          console.log(status);
        })
      })
    })
  }, [])

  const showUser = () => {
    console.log(name, phone, email, gender, birthday, grade, school, preferredsubject, studentage, studentgender, studentpers);
  }

  const changeLang = (lang) => {
      console.log(name);
      Axios.post('https://voluntutorcloud-server.herokuapp.com/setLang', {
        username: name,
        lang: lang,
      }).then((response) => {
        console.log("set language to" + response);
        navigate('/');
      })
  }
  
  return (
    <div className="frame">
      <div id="dialog_reg_wrap">
      <BootstrapDialog
        onClose={handleClose}
        id = "dialog_registered"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div id="prof_registeredsucc">
          Please contact the administrator to change the password.
        </div>
      </BootstrapDialog>
      </div>
      <div className="background">
        <div className="profile">
          <div className="imageprofile">
              <FaUser className = "prof_icon_main"/></div>
          <div className="nameprof">
            <input
            className={click ? 'edity' : 'editn'}
            type="text"
              placeholder={e[status]}
              disabled="disabled"
              value={name}
            onChange={(e) => {
              setname(e.target.value)
            }}
          />
          
          
            </div>
          
            <div class="warning_prof">{errormessage}</div>
        </div>
        <div className="containerprofile">
          <div className="left">
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{f[status]}</div>
                <div className="edit" onClick={handleclick_contact}>{contactstyle}</div>
          
              </div>
              <Divider className="line"></Divider>
              <div className="information">
              <div class="warning_prof">{contacterror}</div>
            <div className = "wrapprof">
              <div className = "textbef">{g[status]} </div>
                  <input
                 id="phone_input"
                 className={contactclick ? 'edittabley' : 'edittablen'}
                 type="tel"
                 placeholder={h[status]}
                 disabled={readonlycontact}
                 value={phone}
                 maxLength={10}
                  onChange={(e) => {
                    Axios.post("https://voluntutorcloud-server.herokuapp.com/updatePhone", {
                      username: name,
                      phone: e.target.value
                    }).then((response) => {
                      console.log(response);
                    })
                    setphone(e.target.value)
                  }}
                />
              </div>
            <div className = "wrapprof">
              <div className = "textbef">{i[status]}</div>
                <input
                className={contactclick ? 'edittabley' : 'edittablen'}
                type="text" 
                placeholder={hdf[status]}
                disabled = {readonlycontact}
                value={email}
                onChange={(e) => {
                  validateEmail(e)
                  Axios.post("https://voluntutorcloud-server.herokuapp.com/updateEmail", {
                    username: name,
                    email: e.target.value
                  }).then((response) => {
                    console.log(response);
                  })
                  setemail(e.target.value)
                }}
              />
              </div>
              <div class="emailwarning_prof">{emailError}</div>
              
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{j[status]}</div>
                <div className="edit" onClick={handleclick_pers}>{persostyle}</div>
          
              </div>
              <Divider className="line"></Divider>
              <div className="information">
              <div class="warning_prof">{personerror}</div>
              <div className = "wrapprof">
              <div className = "textbef">{k[status]} </div>
                  <input
            className={personinfoclick ? 'edittabley' : 'edittablen'}
            type="text"
            placeholder={l[status]}
            disabled={readonlypersoninfo}
            value={gender}
            maxLength={15}
            onChange={(e) => {
              Axios.post("https://voluntutorcloud-server.herokuapp.com/updateGender", {
                username: name,
                gender: e.target.value
              }).then((response) => {
                console.log(response);
              })
              setgender(e.target.value)
            }}
          />
          </div>
          <div className = "wrapprof">
              <div className = "textbef">{m[status]} </div>
                  <input
            className={personinfoclick ? 'edittabley' : 'edittablen'}
            type="tel"
            placeholder={n[status]}
            disabled={readonlypersoninfo}
            value={birthday}
            maxLength={20}
            onChange={(e) => {
              console.log(birthday);
              Axios.post("https://voluntutorcloud-server.herokuapp.com/updateBirthday", {
                username: name,
                birthday: e.target.value
              }).then((response) => {
                console.log(response);
              })
              setbirthday(e.target.value)
            }}
          />
          </div>
          <div className = "wrapprof">
              <div className = "textbef">{o[status]}</div>
                  <input
            className={personinfoclick ? 'edittabley' : 'edittablen'}
            type="text"
            placeholder={p[status]}
            disabled={readonlypersoninfo}
            value={grade}
            maxLength={4}
            onChange={(e) => {
              Axios.post("https://voluntutorcloud-server.herokuapp.com/updateGrade", {
                username: name,
                grade: e.target.value
              }).then((response) => {
                console.log(response);
              })
              setgrade(e.target.value)
            }}
          />
          </div>
          <div className = "wrapprof">
              <div className = "textbef">{q[status]} </div>
                  <input
           className={personinfoclick ? 'edittabley' : 'edittablen'}
           type="text"
           placeholder={r[status]}
           disabled={readonlypersoninfo}
           value={school}
            onChange={(e) => {
              Axios.post("https://voluntutorcloud-server.herokuapp.com/updateSchoolname", {
                username: name,
                schoolname: e.target.value
              }).then((response) => {
                console.log(response);
              })
              setschool(e.target.value)
            }}
          />
          </div>
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{s[status]}</div>
                <div className="edit" onClick={handleclick_pref}>{prefstyle}</div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">
              <div class="warning_prof">{prefererror}</div>
              <div className = "wrapprof">
              <div className = "textbef">{t[status]} </div>
                  <input
            className={preferclick ? 'edittabley' : 'edittablen'}
            type="text"
            placeholder={u[status]}
            disabled={readonlyprefer}
            value={preferredsubject}
            onChange={(e) => {
              Axios.post("https://voluntutorcloud-server.herokuapp.com/updatePreferredSubjects", {
                username: name,
                preferredSubjects: e.target.value
              }).then((response) => {
                console.log(response);
              })
              setpreferredsubject(e.target.value)
            }}
          />
          </div>
          <div className = "wrapprof">
              <div className = "textbef">{v[status]} </div>
                  <input
            className={preferclick ? 'edittabley' : 'edittablen'}
            type="text"
            placeholder={w[status]}
            disabled={readonlyprefer}
            value={studentage}
            onChange={(e) => {
              Axios.post("https://voluntutorcloud-server.herokuapp.com/updateTargetStuAge", {
                username: name,
                targetStuAge: e.target.value
              }).then((response) => {
                console.log(response);
              })
              setstudentage(e.target.value)
            }}
          />
          </div>
          <div className = "wrapprof">
              <div className = "textbef">{x[status]}</div>
                  <input
            className={preferclick ? 'edittabley' : 'edittablen'}
            type="text"
            placeholder={y[status]}
            disabled={readonlyprefer}
            value={studentgender}
            maxLength={15}
            onChange={(e) => {
              Axios.post("https://voluntutorcloud-server.herokuapp.com/updateTargetStuGen", {
                username: name,
                targetStuGen: e.target.value
              }).then((response) => {
                console.log(response);
              })
              setstudentgender(e.target.value)
            }}
          />
          </div>
          <div className = "wrapprof">
              <div className = "textbef">{z[status]}  </div>
                  <input
            className={preferclick ? 'edittabley' : 'edittablen'}
           
            type="text"
            placeholder={ab[status]}
            disabled = {readonlyprefer}
            value={studentpers}
            maxLength = {15}
            onChange={(e) => {
              Axios.post("https://voluntutorcloud-server.herokuapp.com/updateTargetStuPerso", {
                username: name,
                targetStuPerso: e.target.value
              }).then((response) => {
                console.log(response);
              })
              setstudentpers(e.target.value)
            }}
          />
          </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="contact" id="bio_contact">
              <div className="titleprofile">
                <div className="titlepro">{bc[status]}</div>
                <div className="edit" onClick={handleclick_bio}>{biostyle}</div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                <div class="warning_prof_bio">{bioerror}</div>
        
                <div className = "wrapprof">
                  <textarea
           id="bio_enter"
           className={bioclick ? 'texty' : 'textn'}
           type="text"
           placeholder={cd[status]}
           disabled={readonlybio}
           value={cd[status]}
            onChange={(e) => {
              Axios.post("https://voluntutorcloud-server.herokuapp.com/updateBio", {
                username: name,
                bio: e.target.value
              }).then((response) => {
                console.log(response);
              })
              setbio(e.target.value)
            }}
          />
          </div>
              </div>
            </div>
            <div className="contact">
            <div className="titleprofile" id="aboutmetitle">
                <div className="titlepro">{de[status]}</div>
                <div className="edit" onClick={handleclick_about}>{aboutstyle}</div>
              </div>
              <Divider className="line"></Divider>
              <div className="information" id="bioandhobby">
                <div class="warning_prof_bio">{abouterror}</div>

                <div className="wrapprof">
                  <textarea
                    className={aboutclick ? 'texty' : 'textn'}
                    type="text"
                    placeholder={ef[status]}
                    disabled={readonlyabout}
                    value={ef[status]}
            onChange={(e) => {
              Axios.post("https://voluntutorcloud-server.herokuapp.com/updateAbout", {
                username: name,
                about: e.target.value
              }).then((response) => {
                console.log(response);
              })
              setabout(e.target.value)
            }}
          />
          </div>
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{fg[status]}</div>
               
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                <div className="language">
                 <div className = "lang" onClick={() => changeLang("chinese")}>中文</div>
                 <div className = "slash">/</div>
                 <div className = "lang" onClick={() => changeLang("english")}>English</div>
                </div>
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{gh[status]}</div>
               
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                <div className="containpro">
                  <div className="edittable">{hi[status]}</div>
                  <AiFillLock className="lock" onClick = {() => {
                            setOpen(true);
                          }}></AiFillLock>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link to="/" className='link'>
          <div className="btn-prof" onClick={logout}>
          {ij[status]}
          </div>
        </Link>
      </div>
    </div>
  )
}
export default Profile_user
