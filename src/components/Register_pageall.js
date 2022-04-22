import React, { useState } from 'react'
import './Register_pageall.css'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import { BsFillEyeSlashFill } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@material-ui/core/Typography'
import Axios from 'axios'
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

function Register_pageall() {
  const [teacherstyle, setteacherstyle] = useState(true)
  const [studentstyle, setstudentstyle] = useState(true)
  const [errormessage, seterrormessage] = useState('')
  const [pagenum, setpagenum] = useState(0)
  const [usernameReg, setUsernameReg] = useState('')
  const [validationcode, setValidationcode] = useState('')
  const [googlemeet, setgooglemeet] = useState('')
  const [passwordReg, setPasswordReg] = useState('')
  const [cPassword, confirmPassword] = useState('')
  const [FirstnameReg, setFirstnameReg] = useState('')
  const [LastnameReg, setLastnameReg] = useState('')
  const [GenderReg, setGenderReg] = useState('')
  const [PhoneReg, setPhoneReg] = useState('')
  const [EmailReg, setEmailReg] = useState('')
  const [birthdayreg, setbirthdayreg] = useState('')
  const [gradereg, setgradereg] = useState('')
  const [schoolnamereg, setschoolnamereg] = useState('')
  const [subjectReg, setsubjectreg] = useState('')
  const [agereg, setagereg] = useState('')
  const [stugenderreg, setstugenderreg] = useState('')
  const [personalityreg, setpersonalityreg] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const [cpasswordShown, setcPasswordShown] = useState(false)
  const [emailError, setEmailError] = useState('')
  const navigate = useNavigate()
  const [status, setStatus] = useState(0);
  
  let a = ["Please fill in the blank","請完整填入資料"]
  let b = ["Please enter a valid email","請填入正確的email帳號"]
  let c = ["Please fill in all the blanks","請完整填入資料"]
  let d = ["Password does not match","密碼不相同"]
  let e = ["Password is too short","密碼長度太短"]
  let f = ["Wrong Validation Code","驗證碼錯誤"]
  let g = ["Please choose a role" , "請選擇身分"]
  let h = ["Sign in", "登入"]
  let i = ["Getting Started!" ,"告訴我們你是誰！"]
  let j = ["Student" , "學生"]
  let k = ["Teacher" ,"老師"]
  let l = ["Next" ,"下一步"]
  let m = ["Validation Code" , "驗證碼"]
  let n = ["Enter the validation code" ,"請輸入驗證碼"]
  let o = ["Back","前一步"]
  let p = ["Begin Your Journey","開始你的旅程！"]
  let q = ["Username", "帳號名稱"]
  let r = ["Password (required length: 8 characters", "密碼 (長度需大於8個字元)"]
  let s = ["Confirm Password","確認密碼"]
  let t = ["Basic Information" ,"基本資料"]
  let u = ["First name","名字"]
  let v = ["Last name" ,"姓氏"]
  let w = ["Gender (Female/Male/Other)","性別 (女/男/其他)"]
  let x = ["Contact Number","連絡電話"]
  let y = ["Email" , "Email帳號"]
  let z = ["Detailed Information","詳細資訊"]
  let ab = ["Birthday (Format: 2004/01/01)" ,"生日 (格式：2004/01/01)"]
  let bc = ["Grade (9th/10th/11th)","年級 (九/十/十一)"]
  let cd = ["School name","學校名稱"]
  let de = ["Preference", "你的喜好"]
  let ef = ["Preferred Subjects (Chinese/Math...)","偏好科目 (國文/數學...)"]
  let fg = ["Target Student's Grade (1th/2th...)","學生年級 (一/二...)"]
  let gh = ["Target Student's Gender (Female/Male/No Pref)","學生性別 (男/女/無偏好)"]
  let hi = ["Target Student's Personality (Type Anything)","學生性格"]
  let ij = ["Registered Successfully!!!" ,"成功註冊"]
  let jk = ["Return to Login", "回到登入頁面"]
  let kl = ["Create a Google Meet Link for future meetings!!" ,"創造一個未來會議的Google Meet連結!!"]
  let lm = ["Create a Google Meet Link","請填入Google Meet連結"]
  let mn = ["Register","註冊"]
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
  const savedata = () => {
    let temprole = ''

    if (teacherstyle == true) {
      temprole = 'teacher'
    } else {
      temprole = 'student'
    }

    console.log(
      usernameReg,
      passwordReg,
      temprole,
      FirstnameReg,
      LastnameReg,
      GenderReg,
      PhoneReg,
      EmailReg,
      birthdayreg,
      gradereg,
      schoolnamereg,
      subjectReg,
      agereg,
      stugenderreg,
      personalityreg,
      googlemeet
    )

    Axios.post('https://voluntutorcloud-server.herokuapp.com/register', {
      username: usernameReg,
      password: passwordReg,
      role: temprole,
      firstname: FirstnameReg,
      lastName: LastnameReg,
      gender: GenderReg,
      phone: PhoneReg,
      email: EmailReg,
      birthday: birthdayreg,
      grade: gradereg,
      schoolname: schoolnamereg,
      preferredSubjects: subjectReg,
      targetStuAge: agereg,
      targetStuGen: stugenderreg,
      targetStuPerso: personalityreg,
      googleMeetLink: googlemeet
    }).then((response) => {
      console.log(response.data)
      console.log('Successful post.')
    })
  }

  const register = () => {if (googlemeet == '') {
    console.log('errormessage')
    seterrormessage(a[status])
  } else {
    seterrormessage('')
    setOpen(true);
    savedata()}
    
    
  }
  const validateEmail = (e) => {
    var email = e.target.value
    if (!validator.isEmail(email)) {
      setEmailError(b[status])
    } else {
      setEmailError('')
    }
  }
  const pageplus5 = () => {
    if (
      subjectReg == '' ||
      agereg == '' ||
      stugenderreg == '' ||
      personalityreg == ''
    ) {
      console.log('errormessage')
      seterrormessage(c[status])
    } else {
      setpagenum(pagenum + 1)
      seterrormessage('')
    }
  }
  const pageplus4 = () => {
    if (birthdayreg == '' || gradereg == '' || schoolnamereg == '') {
      console.log('errormessage')
      seterrormessage(c[status])
    } else {
      setpagenum(pagenum + 1)
      seterrormessage('')
    }
  }
  const pageplus3 = () => {
    if (
      FirstnameReg == '' ||
      LastnameReg == '' ||
      GenderReg == '' ||
      PhoneReg == '' ||
      PhoneReg == ''
    ) {
      console.log('errormessage')
      seterrormessage(c[status])
    } else {
      setpagenum(pagenum + 1)
      seterrormessage('')
    }
  }
  const pageplus2 = () => {
    if (usernameReg == '' || passwordReg == '' || cPassword == '') {
      console.log('errormessage')
      seterrormessage(c[status])
    } else {
      if (passwordReg != cPassword) {
        console.log('errormessage')
        seterrormessage(d[status])
      } else {
        if (passwordReg.length < 8) {
          console.log('errormessage')
          seterrormessage(e[status])
        } else {
          setpagenum(pagenum + 1)
          seterrormessage('')
        }
      }
    }
  }
  const pageplus1_5 = () => {
      if (validationcode != 'vcwego') {
        seterrormessage(f[status])
    } else {
      setpagenum(pagenum - 0.5)
      seterrormessage('')
    }
  }
  const pageplus1 = () => {
    if (studentstyle == false || teacherstyle == false) {
      setpagenum(pagenum + 1.5)
      seterrormessage('')
    } else {
      seterrormessage(g[status])
    }
  }
  const pageminus = () => {
    setpagenum(pagenum - 1)
    seterrormessage('')
  }
  const pageminus_spc = () => {
    setpagenum(pagenum - 0.5)
    seterrormessage('')
  }
  const pageminus1_5 = () => {
    setpagenum(pagenum - 1.5)
    console.log(pagenum)
    seterrormessage('')
  }
  const togglecPassword = () => {
    setcPasswordShown(!cpasswordShown)
  }
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  const toggleteacherstyle = () => {
    setteacherstyle(!teacherstyle)
    setstudentstyle(true)
  }

  const togglestudentstyle = () => {
    setstudentstyle(!studentstyle)
    setteacherstyle(true)
  }
  
  const [open, setOpen] = useState(false)

  
  if (pagenum == 0) {
    return (
      <div className="all">
        <div className="bar">
          <div className="dot">
            <div className="innerdot"></div>
          </div>

          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="role_full">
          <Link to="/sign-in">
            <div className="signintext">{h[status]}</div>
          </Link>
          <div className="role">
            <div className="regall">
              <div className="regleft">
                <h1 className="title_role">{i[status]}</h1>
                <div class="warning_role">{errormessage}</div>
                <button
                  className={studentstyle ? 'btn-role' : 'btn-role-selected'}
                  onClick={togglestudentstyle}
                >
                  {j[status]}
                </button>
                <button
                  className={teacherstyle ? 'btn-role' : 'btn-role-selected'}
                  onClick={toggleteacherstyle}
                >
                  {k[status]}
                </button>
              </div>
              <div className="regright">
                <img className="pic_reg" src="/images/reg_role.png" />
              </div>
            </div>
          </div>
          <div className="reg_next_wrap">
            <button className="next" onClick={pageplus1}>
            {l[status]}
            </button>
          </div>
        </div>
      </div>
    )
  } else if (pagenum == 1.5) {
    return (
      <div className="all">
        <div className="bar">
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="full">
          <Link to="/sign-in">
            <div className="signintext">{h[status]}</div>
          </Link>
          <div className="regsub">
            <div className="regwords">
              <h1 className="title_reg">{m[status]}</h1>
              <div class="warning">{errormessage}</div>
            </div>
            <div className="reg">
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={validationcode}
                  placeholder={n[status]}
                  onChange={(e) => {
                    setValidationcode(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setValidationcode('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
            </div>
            <div className="btn_reg">
              <button className="back" onClick={pageminus1_5}>
              {o[status]}
              </button>
              <button className="next" onClick={pageplus1_5}>
             {l[status]}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (pagenum == 1) {
    return (
      <div className="all">
        <div className="bar">
          <div className="dot">
            <div className="innerdot"></div>
          </div>

          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="full">
          <Link to="/sign-in">
            <div className="signintext">{h[status]}</div>
          </Link>
          <div className="regsub">
            <div className="regwords">
              <h1 className="title_reg">{p[status]}</h1>
              <div class="warning">{errormessage}</div>
            </div>
            <div className="reg">
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={usernameReg}
                  placeholder={q[status]}
                  onChange={(e) => {
                    setUsernameReg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setUsernameReg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
              <div className="reggroup">
                <input
                  className="register_input"
                  type={passwordShown ? 'text' : 'password'}
                  placeholder={r[status]}
                  minLength={8}
                  onChange={(e) => {
                    setPasswordReg(e.target.value)
                  }}
                />
                <button id="show_reg" onClick={togglePassword}>
                  <BsFillEyeSlashFill id="showpass_reg" />
                </button>
              </div>
              <div className="reggroup">
                <input
                  className="register_input"
                  type={cpasswordShown ? 'text' : 'password'}
                  placeholder={s[status]}
                  minLength={8}
                  onChange={(e) => {
                    confirmPassword(e.target.value)
                  }}
                />
                <button id="show_reg" onClick={togglecPassword}>
                  <BsFillEyeSlashFill id="showpass_reg" />
                </button>
              </div>
            </div>
            <div className="btn_reg">
              <button className="back" onClick={pageminus_spc}>
              {o[status]}
              </button>
              <button className="next" onClick={pageplus2}>
              {l[status]}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (pagenum == 2) {
    return (
      <div className="all">
        <div className="bar">
          <div className="dot">
            <div className="innerdot"></div>
          </div>

          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="full">
          <Link to="/sign-in">
            <div className="signintext">{h[status]}</div>
          </Link>
          <div className="regsub">
            <div className="regwords">
              <h1 className="title_reg">{t[status]}</h1>
              <div class="warning">{errormessage}</div>
            </div>
            <div className="reg">
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={FirstnameReg}
                  placeholder={u[status]}
                  onChange={(e) => {
                    setFirstnameReg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setFirstnameReg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={LastnameReg}
                  placeholder={v[status]}
                  onChange={(e) => {
                    setLastnameReg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setLastnameReg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={GenderReg}
                  placeholder={w[status]}
                  onChange={(e) => {
                    setGenderReg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setGenderReg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
              <div className="reggroup">
                <input
                  className="register_input"
                  type="tel"
                  maxLength={10}
                  value={PhoneReg}
                  placeholder={x[status]}
                  onChange={(e) => {
                    setPhoneReg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setPhoneReg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={EmailReg}
                  placeholder={y[status]}
                  onChange={(e) => {
                    validateEmail(e)
                    setEmailReg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setEmailReg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
              <div class="emailwarning">{emailError}</div>
            </div>
            <div className="btn_reg">
              <button className="back" onClick={pageminus}>
              {o[status]}
              </button>
              <button className="next" onClick={pageplus3}>
              {l[status]}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (pagenum == 3) {
    return (
      <div className="all">
        <div className="bar">
          <div className="dot">
            <div className="innerdot"></div>
          </div>

          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="full">
          <Link to="/sign-in">
            <div className="signintext">{h[status]}</div>
          </Link>
          <div className="regsub">
            <div className="regwords">
              <h1 className="title_reg">{z[status]}</h1>

              <div class="warning">{errormessage}</div>
            </div>
            <div className="reg">
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={birthdayreg}
                  maxLength={20}
                  placeholder={ab[status]}
                  onChange={(e) => {
                    setbirthdayreg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setbirthdayreg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  maxLength={4}
                  value={gradereg}
                  placeholder={bc[status]}
                  onChange={(e) => {
                    setgradereg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setgradereg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={schoolnamereg}
                  placeholder={cd[status]}
                  onChange={(e) => {
                    setschoolnamereg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setschoolnamereg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
            </div>
            <div className="btn_reg">
              <button className="back" onClick={pageminus}>
              {o[status]}
              </button>
              <button className="next" onClick={pageplus4}>
              {l[status]}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (pagenum == 4) {
    return (
      <div className="all">
        <div className="bar">
          <div className="dot">
            <div className="innerdot"></div>
          </div>

          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>

          <div className="dot"></div>
        </div>
        <div className="full">
          <Link to="/sign-in">
            <div className="signintext">{h[status]}</div>
          </Link>
          <div className="regsub">
            <div className="regwords">
              <h1 className="title_role">{de[status]}</h1>
              <div class="warning">{errormessage}</div>
            </div>
            <div className="reg">
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={subjectReg}
                  placeholder={ef[status]}
                  onChange={(e) => {
                    setsubjectreg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setsubjectreg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={agereg}
                  placeholder={fg[status]}
                  onChange={(e) => {
                    setagereg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setagereg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={stugenderreg}
                  placeholder={gh[status]}
                  onChange={(e) => {
                    setstugenderreg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setstugenderreg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={personalityreg}
                  placeholder={hi[status]}
                  onChange={(e) => {
                    setpersonalityreg(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setpersonalityreg('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
            </div>

            <div className="btn_reg">
              <button className="back" onClick={pageminus}>
              {o[status]}
              </button>
              <button className="next" onClick={pageplus5}>
              {l[status]}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="all">
        <div id="dialog_reg_wrap">
        <BootstrapDialog
          id = "dialog_registered"
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <div id="registeredsucc">
          {ij[status]}
          </div>
          <Link to="/sign-in">
          <div id="return">
          {jk[status]}
          </div>
          </Link>
          <div>
          </div>
        </BootstrapDialog>
        </div>
        <div className="bar">
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
          <div className="dot">
            <div className="innerdot"></div>
          </div>
        </div>
        <div className="full">
          <Link to="/sign-in">
            <div className="signintext">{h[status]}</div>
          </Link>
          <div className="regsub">
            <div className="regwords">
              <h1 className="title_reg">
              {kl[status]}</h1>
              <div class="warning">{errormessage}</div>
            </div>
            <div className="reg">
              <div className="reggroup">
                <input
                  className="register_input"
                  type="text"
                  value={googlemeet}
                  placeholder={lm[status]}
                  onChange={(e) => {
                    setgooglemeet(e.target.value)
                  }}
                />
                <button id="reset_reg" onClick={() => setgooglemeet('')}>
                  <ImCross id="clear_reg" />
                </button>
              </div>
            </div>
            <div className="btn_reg">
              <button className="back" onClick={pageminus}>
              {o[status]}
              </button>
              {/* <Link to="/"> */}
              <button className="next" onClick={() => {
                        
                        register();
                      }}>
                {mn[status]}
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register_pageall
