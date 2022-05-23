// imports
import React, { useState, useEffect } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { AiFillLock } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import './Profile_user.css'
import { Divider } from '@mui/material'
import Axios from 'axios'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

function S_Profile_user(props) {
  const [name, setname] = useState('VolunTutor Cloud')
  const [phone, setphone] = useState('0912345678')
  const [email, setemail] = useState('vc@gmail.com')
  const [gender, setgender] = useState('other')
  const [birthday, setbirthday] = useState('20040101')
  const [grade, setgrade] = useState('11th')
  const [school, setschool] = useState('Wego Private High School')
  const [preferredsubject, setpreferredsubject] = useState('Chinese')
  const [requiredsubject, setRequiredsubject] = useState("No Subject");
  const [studentage, setstudentage] = useState('3th')
  const [studentgender, setstudentgender] = useState('No preference')
  const [studentphone, setstudentphone] = useState('0912345673')
  const [studentpers, setstudentpers] = useState('outgoing')
  const [bio, setbio] = useState('For Better Unity, Help Your Community ')
  const [about, setabout] = useState('Join Voluntutor Cloud!')
  const [contacterror, setcontacterror] = useState('')
  const [personerror, setpersonerror] = useState('')
  const [bioerror, setbioerror] = useState('')
  const [abouterror, setabouterror] = useState('')
  const [readonlycontact, setreadcontact] = useState('disabled')
  const [readonlypersoninfo, setreadpersoninfo] = useState('disabled')
  const [readonlyprefer, setreadprefer] = useState('disabled')
  const [readonlybio, setreadbio] = useState('disabled')
  const [readonlyabout, setreadabout] = useState('disabled')
  const [click, setClick] = useState(false)
  const [contactclick, setcontactclick] = useState(false)
  const [personinfoclick, setpersoninfoclick] = useState(false)
  const [preferclick, setpreferclick] = useState(false)
  const [bioclick, setbioclick] = useState(false)
  const [aboutclick, setaboutclick] = useState(false)
  const [studentemail, setStudentEmail] = useState("");
  const [parentemail, setParentemail] = useState("");
  const [parentcontactnum, setParentcontactnum] = useState("");
  const [emailError, setEmailError] = useState('')
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(0)
  const [contactstyle, setcontactstyle] = useState(
    <div>
      <BiEdit />
    </div>,
  )
  const [persostyle, setpersostyle] = useState(
    <div>
      <BiEdit />
    </div>,
  )
  const [aboutstyle, setaboutstyle] = useState(
    <div>
      <BiEdit />
    </div>,
  )
  const [biostyle, setbiostyle] = useState(
    <div>
      <BiEdit />
    </div>,
  )
  let username = ''

  // titles
  let b = ['Please enter a valid email.', '請輸入正確的Email']
  let c = ['Please fill in the blanks.', '請完整填入資訊']
  let d = [
    'Please contact the administrator to change the password.',
    '請聯絡主辦者以更改密碼。',
  ]
  let e = ['Enter Your Name', '請輸入你的名字']
  let f = ['Contact Information', '聯絡資訊']
  let g = ['Phone: ', '手機號碼：']
  let h = ['None', '無']
  let i = ['Email: ', 'Email帳號：']
  let hdf = ['None', '無']
  let j = ['Personal Information', '個人資料']
  let k = ['Gender: ', '性別：']
  let l = ['Female/Male/Others', '男/女/其他']
  let m = ['Birthday: ', '生日：']
  let n = ['Format: 2004/01/01', '格式：2004/01/01']
  let o = ['Grade: ', '年級：']
  let p = ['9th/10th/11th', '九/十/十一']
  let q = ['School: ', '學校：']
  let r = ['Enter school', '輸入學校']
  let u = ['ex: Chinese/Math...', '例如：國/數...']
  let bc = ['Bio', '自介']
  let cd = ['Add your bio here!', '填入你的自介！']
  let de = ['About me', '關於我']
  let ef = ['Tell us more about you!', '讓我們更了解你吧！']
  let fg = ['Language Setting', '語言設定']
  let gh = ['Privacy & Security', '隱私以及安全性']
  let hi = ['Change Password', '更改密碼']
  let ij = ['Log Out', '登出']
  let jk = [
    'Please contact the administrator to change the password.',
    '請聯絡管理者以更改密碼。',
  ]
  let kl = ['Subjects ', '輔導科目']

  // dialog
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

  const handleClose = () => {
    setOpen(false)
  }

  // functions
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
    if (phone == '' || email == '') {
      setcontacterror(c[status])
    } else {
      console.log('cc')
      setcontacterror('')
      setcontactclick(!contactclick)
      setcontactstyle(<BiEdit />)
      if (!contactclick) {
        setreadcontact('')
        setcontactstyle(<BsCheckLg />)
      } else {
        setreadcontact('disabled')
      }
    }
  }

  const handleclick_pers = () => {
    console.log('dd')
    if (gender == '' || birthday == '' || grade == '' || school == '') {
      setpersonerror(d[status])
    } else {
      setpersonerror('')
      setpersoninfoclick(!personinfoclick)
      setpersostyle(<BiEdit />)
      if (!personinfoclick) {
        setreadpersoninfo('')
        setpersostyle(<BsCheckLg />)
      } else {
        setreadpersoninfo('disabled')
      }
    }
  }

  const handleclick_bio = () => {
    setbioerror('')
    setbioclick(!bioclick)
    setbiostyle(<BiEdit />)
    if (!bioclick) {
      setreadbio('')
      setbiostyle(<BsCheckLg />)
    } else {
      setreadbio('disabled')
    }
  }

  const handleclick_about = () => {
    setabouterror('')
    setaboutclick(!aboutclick)
    setaboutstyle(<BiEdit />)
    if (!aboutclick) {
      setreadabout('')
      setaboutstyle(<BsCheckLg />)
    } else {
      setreadabout('disabled')
    }
  }

  const logout = () => {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/logout').then(
      (response) => {
        console.log(response)
      },
    )
  }  

  useEffect(() => {
    console.log(props)
    if(props.profile && props.portfolio){
      setname(props.profile.username)
      setphone(props.profile.phone)
      setemail(props.profile.email)
      setgender(props.profile.gender)
      setbirthday(props.profile.birthday)
      setgrade(props.profile.grade)
      setschool(props.profile.schoolname)
      setstudentage(props.profile.targetStuAge)
      setstudentgender(props.profile.targetStuGen)
      setstudentpers(props.profile.targetStuPerso)
      setbio(props.profile.bio)
      setabout(props.profile.about)
      if (props.profile.lang == 'chinese') setStatus(1)
      else setStatus(0)
      setStudentEmail(props.portfolio.studentmail);
      setParentcontactnum(props.portfolio.parentcontactnum);
      setParentemail(props.portfolio.parentmail);
      setRequiredsubject(props.portfolio.requiredsub);
    }else{
      console.log("props failed")
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
        (response) => {
          console.log(response.data.user[0])
          setname(response.data.user[0].username)
          setphone(response.data.user[0].phone)
          setemail(response.data.user[0].email)
          setgender(response.data.user[0].gender)
          setbirthday(response.data.user[0].birthday)
          setgrade(response.data.user[0].grade)
          setschool(response.data.user[0].schoolname)
          setstudentage(response.data.user[0].targetStuAge)
          setstudentgender(response.data.user[0].targetStuGen)
          setstudentpers(response.data.user[0].targetStuPerso)
          setbio(response.data.user[0].bio)
          setabout(response.data.user[0].about)
          if (response.data.user[0].lang == 'chinese') setStatus(1)
          else setStatus(0)
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getProfolio', {
            name: response.data.user[0].lastname + response.data.user[0].firstname,
          }).then((response) => {
            setStudentEmail(response.data[0].studentmail);
            setParentcontactnum(response.data[0].parentcontactnum);
            setParentemail(response.data[0].parentmail);
            setRequiredsubject(response.data[0].requiredsub);
          })
        },
      )}
  }, [])

  const changeLang = (lang) => {
    console.log(name)
    Axios.post('https://voluntutorcloud-server.herokuapp.com/setLang', {
      username: name,
      lang: lang,
    }).then((response) => {
      console.log('set language to' + response)
      navigate('/')
    })
  }

  return (
    <div className="frame">
      <div id="dialog_reg_wrap">
        <BootstrapDialog
          onClose={handleClose}
          id="dialog_registered"
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <div id="prof_registeredsucc">{jk[status]}</div>
        </BootstrapDialog>
      </div>
      <div className="background">
        <div className="profile">
          <div className="imageprofile">
            <FaUser className="prof_icon_main" />
          </div>
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

          {/* <div class="warning_prof">{errormessage}</div> */}
        </div>
        <div className="containerprofile">
          <div className="left">
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{f[status]}</div>
                {/* <div className="edit" onClick={handleclick_contact}>
                  {contactstyle}
                </div> */}
              </div>
              <Divider className="line"></Divider>

              <div className="information">
                <div class="warning_prof">{contacterror}</div>
                <div className="contactsubtitles">Student</div>
                <div className="wrapprof">
                  <div className="textbef">{i[status]} </div>
                  <input
                    id="phone_input"
                    className={contactclick ? 'edittabley' : 'edittablen'}
                    type="tel"
                    placeholder={h[status]}
                    disabled={readonlycontact}
                    value={studentemail}
                    maxLength={10}
                    onChange={(e) => {
                      Axios.post(
                        'https://voluntutorcloud-server.herokuapp.com/updatePhone',
                        {
                          username: name,
                          phone: e.target.value,
                        },
                      ).then((response) => {
                        console.log(response)
                      })
                      setstudentphone(e.target.value)
                    }}
                  />
                </div>
                <div className="contactsubtitles">Parents</div>
                <div className="wrapprof">
                  <div className="textbef">{g[status]} </div>
                  <input
                    id="phone_input"
                    className={contactclick ? 'edittabley' : 'edittablen'}
                    type="tel"
                    placeholder={h[status]}
                    disabled={readonlycontact}
                    value={parentcontactnum}
                    maxLength={10}
                    onChange={(e) => {
                      Axios.post(
                        'https://voluntutorcloud-server.herokuapp.com/updatePhone',
                        {
                          username: name,
                          phone: e.target.value,
                        },
                      ).then((response) => {
                        console.log(response)
                      })
                      setphone(e.target.value)
                    }}
                  />
                </div>
                <div className="wrapprof">
                  <div className="textbef">{i[status]}</div>
                  <input
                    className={contactclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={hdf[status]}
                    disabled={readonlycontact}
                    value={parentemail}
                    onChange={(e) => {
                      validateEmail(e)
                      Axios.post(
                        'https://voluntutorcloud-server.herokuapp.com/updateEmail',
                        {
                          username: name,
                          email: e.target.value,
                        },
                      ).then((response) => {
                        console.log(response)
                      })
                      setemail(e.target.value)
                    }}
                  />
                </div>
                {/* <div class="emailwarning_prof">{emailError}</div> */}
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{j[status]}</div>
                {/* <div className="edit" onClick={handleclick_pers}>
                  {persostyle}
                </div> */}
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                {/* <div class="warning_prof">{personerror}</div> */}
                <div className="wrapprof">
                  <div className="textbef">{k[status]} </div>
                  <input
                    className={personinfoclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={l[status]}
                    disabled={readonlypersoninfo}
                    value={gender}
                    maxLength={15}
                    onChange={(e) => {
                      Axios.post(
                        'https://voluntutorcloud-server.herokuapp.com/updateGender',
                        {
                          username: name,
                          gender: e.target.value,
                        },
                      ).then((response) => {
                        console.log(response)
                      })
                      setgender(e.target.value)
                    }}
                  />
                </div>
                <div className="wrapprof">
                  <div className="textbef">{m[status]} </div>
                  <input
                    className={personinfoclick ? 'edittabley' : 'edittablen'}
                    type="tel"
                    placeholder={n[status]}
                    disabled={readonlypersoninfo}
                    value={birthday}
                    maxLength={20}
                    onChange={(e) => {
                      console.log(birthday)
                      Axios.post(
                        'https://voluntutorcloud-server.herokuapp.com/updateBirthday',
                        {
                          username: name,
                          birthday: e.target.value,
                        },
                      ).then((response) => {
                        console.log(response)
                      })
                      setbirthday(e.target.value)
                    }}
                  />
                </div>
                <div className="wrapprof">
                  <div className="textbef">{o[status]}</div>
                  <input
                    className={personinfoclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={p[status]}
                    disabled={readonlypersoninfo}
                    value={grade}
                    maxLength={4}
                    onChange={(e) => {
                      Axios.post(
                        'https://voluntutorcloud-server.herokuapp.com/updateGrade',
                        {
                          username: name,
                          grade: e.target.value,
                        },
                      ).then((response) => {
                        console.log(response)
                      })
                      setgrade(e.target.value)
                    }}
                  />
                </div>
                <div className="wrapprof">
                  <div className="textbef">{q[status]} </div>
                  <input
                    className={personinfoclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={r[status]}
                    disabled={readonlypersoninfo}
                    value={school}
                    onChange={(e) => {
                      Axios.post(
                        'https://voluntutorcloud-server.herokuapp.com/updateSchoolname',
                        {
                          username: name,
                          schoolname: e.target.value,
                        },
                      ).then((response) => {
                        console.log(response)
                      })
                      setschool(e.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="contact">
              <div className="titleprofile">
                <div className="titlepro">{kl[status]}</div>
                {/* <div className="edit" onClick={handleclick_pref}>
                  {prefstyle}
                </div> */}
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                {/* <div class="warning_prof">{prefererror}</div> */}
                <div className="wrapprof">
                  <input
                    className={preferclick ? 'edittabley' : 'edittablen'}
                    type="text"
                    placeholder={u[status]}
                    disabled={readonlyprefer}
                    value={requiredsubject}
                    onChange={(e) => {
                      Axios.post(
                        'https://voluntutorcloud-server.herokuapp.com/updatePreferredSubjects',
                        {
                          username: name,
                          requiredsub: e.target.value,
                        },
                      ).then((response) => {
                        console.log(response)
                      })
                      setRequiredsubject(e.target.value)
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
                <div className="edit" onClick={handleclick_bio}>
                  {biostyle}
                </div>
              </div>
              <Divider className="line"></Divider>
              <div className="information">
                {/* <div class="warning_prof_bio">{bioerror}</div> */}

                <div className="wrapprof">
                  <textarea
                    id="bio_enter"
                    className={bioclick ? 'texty' : 'textn'}
                    type="text"
                    placeholder={cd[status]}
                    disabled={readonlybio}
                    value={bio}
                    onChange={(e) => {
                      Axios.post(
                        'https://voluntutorcloud-server.herokuapp.com/updateBio',
                        {
                          username: name,
                          bio: e.target.value,
                        },
                      ).then((response) => {
                        console.log(response)
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
                <div className="edit" onClick={handleclick_about}>
                  {aboutstyle}
                </div>
              </div>
              <Divider className="line"></Divider>
              <div className="information" id="bioandhobby">
                {/* <div class="warning_prof_bio">{abouterror}</div> */}

                <div className="wrapprof">
                  <textarea
                    className={aboutclick ? 'texty' : 'textn'}
                    type="text"
                    placeholder={ef[status]}
                    disabled={readonlyabout}
                    value={about}
                    onChange={(e) => {
                      Axios.post(
                        'https://voluntutorcloud-server.herokuapp.com/updateAbout',
                        {
                          username: name,
                          about: e.target.value,
                        },
                      ).then((response) => {
                        console.log(response)
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
                  <div className="lang" onClick={() => changeLang('chinese')}>
                    中文
                  </div>
                  <div className="slash">/</div>
                  <div className="lang" onClick={() => changeLang('english')}>
                    English
                  </div>
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
                  <AiFillLock
                    className="lock"
                    onClick={() => {
                      setOpen(true)
                    }}
                  ></AiFillLock>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link to="/" className="link">
          <div className="btn-prof" onClick={logout}>
            {ij[status]}
          </div>
        </Link>
      </div>
    </div>
  )
}
export default S_Profile_user
