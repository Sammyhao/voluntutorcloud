import React, { useState } from 'react'
import './Register_pageall.css'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import { BsFillEyeSlashFill } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import Select from '@mui/material/Select'
import Axios from 'axios'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import { Input } from '@mui/material'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
const gradelist = ['1st', '2nd', '3rd', '4th', '5th', '6th']

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

function Register_pageall() {
  const theme = useTheme()
  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setsubjectreg(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }
  const handleage = (event) => {
    const {
      target: { value },
    } = event
    setagereg(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const handleperson = (event) => {
    const {
      target: { value },
    } = event
    setpersonalityreg(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }
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
  // const [birthdayreg, setbirthdayreg] = useState(new Date())
  const [gradereg, setgradereg] = useState('')
  const [schoolnamereg, setschoolnamereg] = useState('')
  const [subjectReg, setsubjectreg] = useState([])
  const [agereg, setagereg] = useState([])
  const [stugenderreg, setstugenderreg] = useState('')
  const [personalityreg, setpersonalityreg] = useState([])
  const [passwordShown, setPasswordShown] = useState(false)
  const [cpasswordShown, setcPasswordShown] = useState(false)
  const [emailError, setEmailError] = useState('')
  const navigate = useNavigate()
  const [status, setStatus] = useState(0)
  const [birthdaydate, setbirthdaydate] = useState(new Date())
  const [charlist, setcharlist] = useState([
    'open-minded',
    'outgoing',
    'reserved',
    'conscientious',
    'hard-working',
    'proactive',
    'indefatigable',
    'discreet',
    'honest',
    'well-behaved',
  ])
  const [subjectlist, setsubjectlist] = useState([
    'Chinese',
    'Math',
    'English',
    'Social Studies',
    'Science',
  ])
  const [stu_chinese_name, setchinname] = useState('')
  const [stu_chinese_name_first, setchinname_first] = useState('')
  let a = ['Please fill in the blank.', '請完整填入資料']
  let b = ['Please enter a valid email.', '請填入正確的email帳號']
  let c = ['Please fill in all the blanks.', '請完整填入資料']
  let d = ['Password does not match.', '密碼不相同']
  let e = ['Password is too short.', '密碼長度太短']
  let f = ['Wrong Validation Code.', '驗證碼錯誤']
  let g = ['Please choose a role.', '請選擇身分']
  let h = ['Sign in', '登入']
  let i = ['Getting Started!', '告訴我們你是誰！']
  let j = ['Student', '學生']
  let k = ['Teacher', '老師']
  let l = ['Next', '下一步']
  let m = ['Validation Code', '驗證碼']
  let n = ['Enter the validation code', '請輸入驗證碼']
  let o = ['Back', '前一步']
  let p = ['Begin Your Journey', '開始你的旅程！']
  let q = ['Username', '帳號名稱']
  let r = [
    'Password (required length: 8 characters)',
    '密碼 (長度需大於8個字元)',
  ]
  let s = ['Confirm Password', '確認密碼']
  let t = ['Basic Information', '基本資料']
  let u = ['First name', '名字']
  let v = ['Last name', '姓氏']
  let w = ['Gender (Female/Male/Other)', '性別 (女/男/其他)']
  let x = ['Contact Number', '連絡電話']
  let y = ['Email', 'Email帳號']
  let z = ['Detailed Information', '詳細資訊']
  let ab = ['Birthday (Format: 2004/01/01)', '生日 (格式：2004/01/01)']
  let bc = ['Grade (9th/10th/11th)', '年級 (九/十/十一)']
  let zz = ['Grade (1th/2th...)', '年級 (一/二...)']
  let cd = ['School name', '學校名稱']
  let de = ['Preference', '你的喜好']
  let ef = ['Preferred Subjects (Chinese/Math...)', '偏好科目 (國文/數學...)']
  let fg = ["Target Student's Grade (1th/2th...)", '學生年級 (一/二...)']
  let gh = [
    "Target Student's Gender (Female/Male/No Pref)",
    '學生性別 (男/女/無偏好)',
  ]
  let hi = ["Target Student's Personality (Type Anything)", '學生性格']
  let ij = ['Registered Successfully!!!', '成功註冊']
  let jk = ['Return to Login', '回到登入頁面']
  let kl = [
    'Create a Google Meet Link for future meetings!!',
    '創造一個未來會議的Google Meet連結!!',
  ]
  let lm = ['Create a Google Meet Link', '請填入Google Meet連結']
  let mn = ['Register', '註冊']
  let pq = ['Please Enter Your Chinese Name', '請輸入你的中文姓名']
  let no = ['Please Enter Your Last Name (Chinese)', '請輸入你的中文姓氏']
  let op = ['Please Enter Your First Name (Chinese)', '請輸入你的中文名字']
  let pr = ['Female', '女']
  let sr = ['Male', '男']
  let st = ['Others', '其他']
  let ss = ['No preference', '無']
  let tu = ['Select your gender', '選擇你的性別']
  let uv = ['Select your grade', '選擇你的年級']
  let vv = ['Select your school', '選擇你的學校']
  let yy = ['Select target student gender', '選擇學生性別']
  let wv = ['Taipei Wego Senior High School', '台北市私立薇閣高級中學']
  let ww = ['Taipei Fuhsing Senior High School', '台北市私立復興高級中學']
  let xx = ['Yilan Daxi Elementary School', '宜蘭縣大溪國民小學']
  let yyzy = ['Yilan Guangxing Elementary School', '宜蘭縣廣興國民小學']
  let asdbf = ['Select your preferred subjects', '請選擇你想要教導的科目']
  let abb = ['Select your preferred student grade', '請選擇學生年級']
  let bbc = ['Select your preferred student personality', '請選擇學生性格']
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

  const changestatus = () => {
    if (status == 0) {
      setStatus(1)
      setsubjectlist(['國文', '數學', '英文', '社會', '自然'])
      setcharlist([
        'open-minded',
        'outgoing',
        'reserved',
        'conscientious',
        'hard-working',
        'proactive',
        'indefatigable',
        'discreet',
        'honest',
        'well-behaved',
      ])
    } else {
      setStatus(0)
      setsubjectlist([
        'Chinese',
        'Math',
        'English',
        'Social Studies',
        'Science',
      ])
      setcharlist([
        '開朗',
        '外向',
        '安靜',
        '認真',
        '積極',
        '好學',
        '勤奮',
        '謹慎',
        '誠實',
        '守規矩',
      ])
    }
  }
  const savedatastu = () => {
    let school = schoolnamereg
    let gen = GenderReg
    if (
      schoolnamereg == 'Yilan Daxi Elementary School' ||
      schoolnamereg == '宜蘭縣大溪國民小學'
    ) {
      school = '大溪國小'
    }
    if (
      schoolnamereg == 'Yilan Guangxing Elementary School' ||
      schoolnamereg == '宜蘭縣廣興國民小學'
    ) {
      school = '廣興國小'
    }
    if (GenderReg == '女') {
      gen = 'Female'
    }
    if (GenderReg == '男') {
      gen = 'Male'
    }
    if (GenderReg == '其他') {
      gen = 'Others'
    }
    console.log(stu_chinese_name)
    console.log(stu_chinese_name_first)
    console.log(usernameReg)
    console.log(passwordReg)
    console.log(PhoneReg)
    console.log(EmailReg)
    console.log(gen)
    console.log(gradereg)
    console.log(birthdaydate)
    console.log(school)

    // save data here
    Axios.post('https://voluntutorcloud-server.herokuapp.com/registerForStu', {
      username: usernameReg,
      password: passwordReg,
      role: 'student',
      firstname: stu_chinese_name_first,
      lastname: stu_chinese_name,
      gender: gen,
      phone: PhoneReg,
      email: EmailReg,
      birthday: birthdaydate,
      grade: gradereg,
      schoolname: school,
    }).then((response) => {
      setOpen(true)
      console.log(response)
      console.log('Successful.')
    })
  }

  const savedata = () => {
    let temprole = 'teacher'
    let skl = schoolnamereg
    let gend = GenderReg
    let stugen = stugenderreg
    if (schoolnamereg == '台北市私立薇閣高級中學') {
      skl = 'Taipei Wego Senior High School'
    }
    if (schoolnamereg == '台北市私立復興高級中學') {
      skl = 'Taipei Fuhsing Senior High School'
    }
    if (GenderReg == '女') {
      gend = 'Female'
    }
    if (GenderReg == '男') {
      gend = 'Male'
    }
    if (GenderReg == '其他') {
      gend = 'Others'
    }
    if (stugenderreg == '女') {
      stugen = 'Female'
    }
    if (stugenderreg == '男') {
      stugen = 'Male'
    }
    if (stugenderreg == '無') {
      stugen = 'No preference'
    }
    console.log(
      usernameReg,
      passwordReg,
      temprole,
      FirstnameReg,
      LastnameReg,
      gend,
      PhoneReg,
      EmailReg,
      birthdaydate,
      gradereg,
      skl,
      subjectReg,
      agereg,
      stugen,
      personalityreg,
      googlemeet,
    )

    let subjectRegforStr = ''
    let ageregforStr = ''
    let personalityregforStr = ''

    for (let i = 0; i < subjectReg.length; i++) {
      subjectRegforStr += subjectReg[i]
      if (i != subjectReg.length - 1) subjectRegforStr += '/ '
      console.log(subjectRegforStr)
    }

    for (let i = 0; i < agereg.length; i++) {
      ageregforStr += agereg[i]
      if (i != agereg.length - 1) ageregforStr += '/ '
      console.log(ageregforStr)
    }
    for (let i = 0; i < personalityreg.length; i++) {
      personalityregforStr += personalityreg[i]
      if (i != personalityreg.length - 1) personalityregforStr += '/ '
      console.log(personalityregforStr)
    }

    Axios.post('https://voluntutorcloud-server.herokuapp.com/register', {
      username: usernameReg,
      password: passwordReg,
      role: temprole,
      firstname: FirstnameReg,
      lastName: LastnameReg,
      gender: gend,
      phone: PhoneReg,
      email: EmailReg,
      birthday: birthdaydate,
      grade: gradereg,
      schoolname: skl,
      preferredSubjects: subjectRegforStr,
      targetStuAge: ageregforStr,
      targetStuGen: stugen,
      targetStuPerso: personalityregforStr,
      googleMeetLink: googlemeet,
    }).then((response) => {
      setOpen(true)
      console.log(response.data)
      console.log('Successful post.')
    })
  }

  const register = () => {
    if (teacherstyle == false) {
      if (googlemeet == '') {
        console.log('errormessage')
        seterrormessage(a[status])
      } else {
        seterrormessage('')
        setOpen(true)
        savedata()
      }
    } else {
      if (
        PhoneReg == '' ||
        EmailReg == '' ||
        GenderReg == '' ||
        birthdaydate == '' ||
        gradereg == '' ||
        schoolnamereg == ''
      ) {
        console.log('errormessage')
        seterrormessage(c[status])
      } else if (emailError == '') {
        seterrormessage('')
        setOpen(true)
        savedatastu()
      }
    }
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
    console.log(pagenum)
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
    console.log(pagenum)
    if (birthdaydate == '' || gradereg == '' || schoolnamereg == '') {
      console.log('errormessage')
      seterrormessage(c[status])
    } else {
      setpagenum(pagenum + 1)
      seterrormessage('')
    }
  }
  const pageplus3 = () => {
    console.log(pagenum)
    if (teacherstyle == false) {
      if (
        FirstnameReg == '' ||
        LastnameReg == '' ||
        GenderReg == '' ||
        PhoneReg == '' ||
        EmailReg == ''
      ) {
        console.log('errormessage')
        seterrormessage(c[status])
      } else if (emailError == '') {
        setpagenum(pagenum + 1)
        seterrormessage('')
      }
    } else {
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
  }
  const pageplus2 = () => {
    console.log(pagenum)
    if (teacherstyle == false) {
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
    } else {
      if (stu_chinese_name == '' || stu_chinese_name_first == '') {
        seterrormessage(c[status])
      } else {
        setpagenum(pagenum + 1)
        seterrormessage('')
      }
    }
  }
  const pageplus1_5 = () => {
    console.log(pagenum)
    if (teacherstyle == false) {
      if (validationcode != 'vcwego') {
        seterrormessage(f[status])
      } else {
        setpagenum(pagenum + 0.5)
        seterrormessage('')
      }
    } else {
      if (validationcode != 'vcds') {
        seterrormessage(f[status])
      } else {
        setpagenum(pagenum + 0.5)
        seterrormessage('')
      }
    }
  }
  const pageplus1 = () => {
    console.log(pagenum)
    if (studentstyle == false || teacherstyle == false) {
      setpagenum(pagenum + 0.5)
      seterrormessage('')
    } else {
      seterrormessage(g[status])
    }
  }
  const pageminus = () => {
    console.log(pagenum)
    setpagenum(pagenum - 1)
    seterrormessage('')
  }
  const pageminus1_5 = () => {
    console.log(pagenum)
    setpagenum(pagenum - 0.5)
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
        <div className="bar"></div>
        <div className="role_full">
          <div className="languagereg">
            <div className="wordslog" onClick={changestatus}>
              中
            </div>
            <div className="wordslog">/</div>
            <div className="wordslog" onClick={changestatus}>
              English
            </div>
          </div>
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
  } else if (pagenum == 0.5) {
    if (teacherstyle == false) {
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
          </div>
          <div className="full">
            <div className="languagereg">
              <div className="wordslog" onClick={changestatus}>
                中
              </div>
              <div className="wordslog">/</div>
              <div className="wordslog" onClick={changestatus}>
                English
              </div>
            </div>
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
    } else {
      return (
        <div className="all">
          <div className="bar">
            <div className="dot">
              <div className="innerdot"></div>
            </div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <div className="full">
            <div className="languagereg">
              <div className="wordslog" onClick={changestatus}>
                中
              </div>
              <div className="wordslog">/</div>
              <div className="wordslog" onClick={changestatus}>
                English
              </div>
            </div>
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
    }
  } else if (pagenum == 1) {
    if (teacherstyle == false) {
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
          </div>
          <div className="full">
            <div className="languagereg">
              <div className="wordslog" onClick={changestatus}>
                中
              </div>
              <div className="wordslog">/</div>
              <div className="wordslog" onClick={changestatus}>
                English
              </div>
            </div>
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
                    value={passwordReg}
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
                    value={cPassword}
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
                <button className="back" onClick={pageminus1_5}>
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
    } else {
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
          </div>
          <div className="full">
            <div className="languagereg">
              <div className="wordslog" onClick={changestatus}>
                中
              </div>
              <div className="wordslog">/</div>
              <div className="wordslog" onClick={changestatus}>
                English
              </div>
            </div>
            <Link to="/sign-in">
              <div className="signintext">{h[status]}</div>
            </Link>
            <div className="regsub">
              <div className="regwords">
                <h1 className="title_reg">{pq[status]}</h1>
                <div class="warning">{errormessage}</div>
              </div>
              <div className="reg">
                <div className="reggroup">
                  <input
                    className="register_input"
                    type="text"
                    value={stu_chinese_name} // stu_chinese_name
                    placeholder={no[status]}
                    onChange={(e) => {
                      setchinname(e.target.value)
                    }}
                  />
                  <button id="reset_reg" onClick={() => setchinname('')}>
                    <ImCross id="clear_reg" />
                  </button>
                </div>
                <div className="reggroup">
                  <input
                    className="register_input"
                    type="text"
                    value={stu_chinese_name_first} // stu_chinese_name_first
                    placeholder={op[status]}
                    onChange={(e) => {
                      setchinname_first(e.target.value)
                    }}
                  />
                  <button id="reset_reg" onClick={() => setchinname_first('')}>
                    <ImCross id="clear_reg" />
                  </button>
                </div>
              </div>
              <div className="btn_reg">
                <button className="back" onClick={pageminus1_5}>
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
    }
  } else if (pagenum == 2) {
    if (teacherstyle == false) {
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
          </div>
          <div className="full">
            <div className="languagereg">
              <div className="wordslog" onClick={changestatus}>
                中
              </div>
              <div className="wordslog">/</div>
              <div className="wordslog" onClick={changestatus}>
                English
              </div>
            </div>
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
                  <Select
                    labelId="demo-simple-select-helper-label"
                    variant="standard"
                    id="demo-simple-select-standard"
                    className="register_selector"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={GenderReg}
                    onChange={(e) => {
                      setGenderReg(e.target.value)
                    }}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <div className="selectplace">{tu[status]}</div>
                      }

                      return selected
                    }}
                    sx={{
                      color: '#b25634',
                      paddingLeft: '10px',
                      paddingBottom: '5px',
                      fontFamily: 'Lora',
                      letterSpacing: '2px',
                      fontSize: '20px',
                      '&:hover': {
                        color: '#b25634',
                      },
                      '&:focus': {
                        backgroundColor: '#00000000',
                      },
                      '&:not(.Mui-disabled):hover::before': {
                        borderBottom: '1.5px solid #b25634',
                      },
                      '&:before': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '&:after': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root': {
                        marginRight: '-15px',
                        fontSize: '30px',
                        color: '#b25634',
                        fill: '#b25634',
                      },
                      '& .MuiSvgIcon-root::before': {
                        border: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root::after': {
                        border: '1.5px solid #D6A796',
                      },
                    }}
                  >
                    <MenuItem value={pr[status]}>{pr[status]}</MenuItem>
                    <MenuItem value={sr[status]}>{sr[status]}</MenuItem>
                    <MenuItem value={st[status]}>{st[status]}</MenuItem>
                  </Select>
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
    } else {
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
          </div>
          <div className="full">
            <div className="languagereg">
              <div className="wordslog" onClick={changestatus}>
                中
              </div>
              <div className="wordslog">/</div>
              <div className="wordslog" onClick={changestatus}>
                English
              </div>
            </div>
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
                      setUsernameReg(e.target.value) // usernameReg
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
                    value={passwordReg}
                    onChange={(e) => {
                      setPasswordReg(e.target.value) // passwordReg
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
                    value={cPassword}
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
    }
  } else if (pagenum == 3) {
    if (teacherstyle == false) {
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
          </div>
          <div className="full">
            <div className="languagereg">
              <div className="wordslog" onClick={changestatus}>
                中
              </div>
              <div className="wordslog">/</div>
              <div className="wordslog" onClick={changestatus}>
                English
              </div>
            </div>
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
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Enter your birthday"
                      value={birthdaydate}
                      onChange={(newValue) => {
                        setbirthdaydate(newValue)
                      }}
                      renderInput={(params) => (
                        <TextField
                          className="register_selector"
                          variant="standard"
                          sx={{
                            '& .MuiInputLabel-root': { color: '#b25634' },
                            '& .MuiSvgIcon-root': {
                              marginRight: '-4px',
                            },
                            '.css-1wt0ykv::before': {
                              borderBottom: '1.5px solid #D6A796',
                            },
                            '& .css-1wt0ykv:hover:not(.Mui-disabled):before': {
                              borderBottom: '1.5px solid #b25634',
                            },
                            '.css-1wt0ykv::after': {
                              borderBottom: '1.5px solid #b25634',
                            },
                            svg: {
                              marginRight: '-4px',
                              color: '#b25634',
                            },

                            input: {
                              color: '#b25634',
                              fontFamily: 'Lora',
                              paddingLeft: '10px',
                              letterSpacing: '2px',
                              fontSize: '20px',
                            },
                            label: {
                              color: '#b25634',
                              fontFamily: 'Lora',
                              '&:hover': {
                                color: '#b25634',
                              },
                              '&:focus': {
                                color: '#b25634',
                              },
                            },
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>

                <div className="reggroup">
                  <Select
                    labelId="demo-simple-select-helper-label"
                    variant="standard"
                    id="demo-simple-select-standard"
                    className="register_selector"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={gradereg}
                    onChange={(e) => {
                      setgradereg(e.target.value)
                    }}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <div className="selectplace">{uv[status]}</div>
                      }

                      return selected
                    }}
                    sx={{
                      color: '#b25634',
                      paddingLeft: '10px',
                      paddingBottom: '5px',

                      fontFamily: 'Lora',
                      letterSpacing: '2px',
                      fontSize: '20px',
                      '&:hover': {
                        color: '#b25634',
                      },
                      '&:focus': {
                        backgroundColor: '#00000000',
                      },
                      '&:not(.Mui-disabled):hover::before': {
                        borderBottom: '1.5px solid #b25634',
                      },
                      '&:before': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '&:after': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root': {
                        marginRight: '-15px',
                        fontSize: '30px',
                        color: '#b25634',
                        fill: '#b25634',
                      },
                      '& .MuiSvgIcon-root::before': {
                        border: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root::after': {
                        border: '1.5px solid #D6A796',
                      },
                    }}
                  >
                    <MenuItem value={'9th'}>9th</MenuItem>
                    <MenuItem value={'10th'}>10th</MenuItem>
                    <MenuItem value={'11th'}>11th</MenuItem>
                  </Select>
                </div>
                <div className="reggroup">
                  <Select
                    labelId="demo-simple-select-helper-label"
                    variant="standard"
                    id="demo-simple-select-standard"
                    className="register_selector"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={schoolnamereg}
                    onChange={(e) => {
                      setschoolnamereg(e.target.value)
                    }}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <div className="selectplace">{vv[status]}</div>
                      }

                      return selected
                    }}
                    sx={{
                      color: '#b25634',
                      paddingLeft: '10px',
                      paddingBottom: '5px',
                      fontFamily: 'Lora',
                      letterSpacing: '2px',
                      fontSize: '20px',
                      '&:hover': {
                        color: '#b25634',
                      },
                      '&:focus': {
                        backgroundColor: '#00000000',
                      },
                      '&:not(.Mui-disabled):hover::before': {
                        borderBottom: '1.5px solid #b25634',
                      },
                      '&:before': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '&:after': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root': {
                        marginRight: '-15px',
                        fontSize: '30px',
                        color: '#b25634',
                        fill: '#b25634',
                      },
                      '& .MuiSvgIcon-root::before': {
                        border: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root::after': {
                        border: '1.5px solid #D6A796',
                      },
                    }}
                  >
                    <MenuItem value={wv[status]}>{wv[status]}</MenuItem>
                    <MenuItem value={ww[status]}>{ww[status]}</MenuItem>
                  </Select>
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
    } else {
      return (
        <div className="all">
          <div id="dialog_reg_wrap">
            <BootstrapDialog
              id="dialog_registered"
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <div id="registeredsucc">{ij[status]}</div>
              <Link to="/sign-in">
                <div id="return">{jk[status]}</div>
              </Link>

              <div></div>
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
          </div>
          <div className="full">
            <div className="languagereg">
              <div className="wordslog" onClick={changestatus}>
                中
              </div>
              <div className="wordslog">/</div>
              <div className="wordslog" onClick={changestatus}>
                English
              </div>
            </div>
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
                  <Select
                    labelId="demo-simple-select-helper-label"
                    variant="standard"
                    id="demo-simple-select-standard"
                    className="register_selector"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={GenderReg}
                    onChange={(e) => {
                      setGenderReg(e.target.value)
                    }}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <div className="selectplace">{yy[status]}</div>
                      }

                      return selected
                    }}
                    sx={{
                      color: '#b25634',
                      paddingLeft: '10px',
                      paddingBottom: '5px',
                      fontFamily: 'Lora',
                      letterSpacing: '2px',
                      fontSize: '20px',
                      '&:hover': {
                        color: '#b25634',
                      },
                      '&:focus': {
                        backgroundColor: '#00000000',
                      },
                      '&:not(.Mui-disabled):hover::before': {
                        borderBottom: '1.5px solid #b25634',
                      },
                      '&:before': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '&:after': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root': {
                        marginRight: '-15px',
                        fontSize: '30px',
                        color: '#b25634',
                        fill: '#b25634',
                      },
                      '& .MuiSvgIcon-root::before': {
                        border: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root::after': {
                        border: '1.5px solid #D6A796',
                      },
                    }}
                  >
                    <MenuItem value={pr[status]}>{pr[status]}</MenuItem>
                    <MenuItem value={sr[status]}>{sr[status]}</MenuItem>
                    <MenuItem value={st[status]}>{st[status]}</MenuItem>
                  </Select>
                </div>

                <div className="reggroup">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Enter your birthday"
                      value={birthdaydate}
                      onChange={(newValue) => {
                        setbirthdaydate(newValue)
                      }}
                      renderInput={(params) => (
                        <TextField
                          className="register_selector"
                          variant="standard"
                          sx={{
                            '& .MuiInputLabel-root': { color: '#b25634' },
                            '& .MuiSvgIcon-root': {
                              marginRight: '-4px',
                            },
                            '.css-1wt0ykv::before': {
                              borderBottom: '1.5px solid #D6A796',
                            },
                            '& .css-1wt0ykv:hover:not(.Mui-disabled):before': {
                              borderBottom: '1.5px solid #b25634',
                            },
                            '.css-1wt0ykv::after': {
                              borderBottom: '1.5px solid #b25634',
                            },
                            svg: {
                              marginRight: '-4px',
                              color: '#b25634',
                            },

                            input: {
                              color: '#b25634',
                              fontFamily: 'Lora',
                              paddingLeft: '10px',
                              letterSpacing: '2px',
                              fontSize: '20px',
                            },
                            label: {
                              color: '#b25634',
                              fontFamily: 'Lora',
                              '&:hover': {
                                color: '#b25634',
                              },
                              '&:focus': {
                                color: '#b25634',
                              },
                            },
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="reggroup">
                  <Select
                    labelId="demo-simple-select-helper-label"
                    variant="standard"
                    id="demo-simple-select-standard"
                    className="register_selector"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={gradereg}
                    onChange={(e) => {
                      setgradereg(e.target.value)
                    }}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <div className="selectplace">{uv[status]}</div>
                      }

                      return selected
                    }}
                    sx={{
                      color: '#b25634',
                      paddingLeft: '10px',
                      paddingBottom: '5px',
                      fontFamily: 'Lora',
                      letterSpacing: '2px',
                      fontSize: '20px',
                      '&:hover': {
                        color: '#b25634',
                      },
                      '&:focus': {
                        backgroundColor: '#00000000',
                      },
                      '&:not(.Mui-disabled):hover::before': {
                        borderBottom: '1.5px solid #b25634',
                      },
                      '&:before': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '&:after': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root': {
                        marginRight: '-15px',
                        fontSize: '30px',
                        color: '#b25634',
                        fill: '#b25634',
                      },
                      '& .MuiSvgIcon-root::before': {
                        border: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root::after': {
                        border: '1.5px solid #D6A796',
                      },
                    }}
                  >
                    <MenuItem value={'1st'}>1st</MenuItem>
                    <MenuItem value={'2nd'}>2nd</MenuItem>
                    <MenuItem value={'3rd'}>3rd</MenuItem>
                    <MenuItem value={'4th'}>4th</MenuItem>
                    <MenuItem value={'5th'}>5th</MenuItem>
                    <MenuItem value={'6th'}>6th</MenuItem>
                  </Select>
                </div>
                <div className="reggroup">
                  <Select
                    labelId="demo-simple-select-helper-label"
                    variant="standard"
                    id="demo-simple-select-standard"
                    className="register_selector"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={schoolnamereg}
                    onChange={(e) => {
                      setschoolnamereg(e.target.value)
                    }}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <div className="selectplace">{vv[status]}</div>
                      }

                      return selected
                    }}
                    sx={{
                      color: '#b25634',
                      paddingLeft: '10px',
                      paddingBottom: '5px',
                      fontFamily: 'Lora',
                      letterSpacing: '2px',
                      fontSize: '20px',
                      '&:hover': {
                        color: '#b25634',
                      },
                      '&:focus': {
                        backgroundColor: '#00000000',
                      },
                      '&:not(.Mui-disabled):hover::before': {
                        borderBottom: '1.5px solid #b25634',
                      },
                      '&:before': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '&:after': {
                        borderBottom: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root': {
                        marginRight: '-15px',
                        fontSize: '30px',
                        color: '#b25634',
                        fill: '#b25634',
                      },
                      '& .MuiSvgIcon-root::before': {
                        border: '1.5px solid #D6A796',
                      },
                      '& .MuiSvgIcon-root::after': {
                        border: '1.5px solid #D6A796',
                      },
                    }}
                  >
                    <MenuItem value={xx[status]}>{xx[status]}</MenuItem>
                    <MenuItem value={yyzy[status]}>{yyzy[status]}</MenuItem>
                  </Select>
                </div>

                <div className="reggroup">
                  <input
                    className="register_input"
                    type="tel"
                    maxLength={10}
                    value={PhoneReg}
                    placeholder={x[status]}
                    onChange={(e) => {
                      setPhoneReg(e.target.value) // phoneReg
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
                      setEmailReg(e.target.value) // emailReg
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
                {/* <Link to="/"> */}
                <button
                  className="next"
                  onClick={() => {
                    register()
                  }}
                >
                  {mn[status]}
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      )
    }
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

          <div className="dot"></div>
        </div>
        <div className="full">
          <div className="languagereg">
            <div className="wordslog" onClick={changestatus}>
              中
            </div>
            <div className="wordslog">/</div>
            <div className="wordslog" onClick={changestatus}>
              English
            </div>
          </div>
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
                <Select
                  className="register_selector"
                  variant="standard"
                  multiple
                  value={subjectReg}
                  onChange={handleChange}
                  input={
                    <Input
                      id="select-multiple-chip"
                      label="Chip"
                      sx={{
                        underline: {
                          '&&&:before': {
                            borderBottom: 'none',
                          },
                          '&&:after': {
                            borderBottom: 'none',
                          },
                        },
                      }}
                    />
                  }
                  sx={{
                    color: '#b25634',
                    fontFamily: 'Lora',
                    letterSpacing: '2px',
                    paddingBottom: '5px',
                    paddingLeft: '10px',
                    fontSize: '20px',
                    '&:hover': {
                      color: '#b25634',
                      border: 'none',
                    },
                    '&:focus': {
                      backgroundColor: '#00000000',
                    },
                    '&:not(.Mui-disabled):hover::before': {
                      borderBottom: '1.5px solid #b25634',
                    },
                    '&:before': {
                      borderBottom: '1.5px solid #D6A796',
                    },
                    '&:after': {
                      borderBottom: '1.5px solid #D6A796',
                    },
                    '& .MuiSvgIcon-root': {
                      marginRight: '-15px',
                      fontSize: '30px',
                      color: '#b25634',
                      fill: '#b25634',
                    },
                    '& .MuiSvgIcon-root::before': {
                      border: '1.5px solid #D6A796',
                    },
                    '& .MuiSvgIcon-root::after': {
                      border: '1.5px solid #D6A796',
                    },
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <div className="selectplace">{asdbf[status]}</div>
                    }

                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            sx={{
                              color: '#b25634',
                              fontFamily: 'Lora',
                              letterSpacing: '2px',
                              fontSize: '15px',
                            }}
                          />
                        ))}
                      </Box>
                    )
                  }}
                  MenuProps={MenuProps}
                >
                  {subjectlist.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, subjectReg, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="reggroup">
                <Select
                  className="register_selector"
                  variant="standard"
                  multiple
                  value={agereg}
                  onChange={handleage}
                  input={
                    <Input
                      id="select-multiple-chip"
                      label="Chip"
                      sx={{
                        underline: {
                          '&&&:before': {
                            borderBottom: 'none',
                          },
                          '&&:after': {
                            borderBottom: 'none',
                          },
                        },
                      }}
                    />
                  }
                  sx={{
                    color: '#b25634',
                    fontFamily: 'Lora',
                    letterSpacing: '2px',
                    paddingBottom: '5px',
                    paddingLeft: '10px',
                    fontSize: '20px',
                    '&:hover': {
                      color: '#b25634',
                      border: 'none',
                    },
                    '&:focus': {
                      backgroundColor: '#00000000',
                    },
                    '&:not(.Mui-disabled):hover::before': {
                      borderBottom: '1.5px solid #b25634',
                    },
                    '&:before': {
                      borderBottom: '1.5px solid #D6A796',
                    },
                    '&:after': {
                      borderBottom: '1.5px solid #D6A796',
                    },
                    '& .MuiSvgIcon-root': {
                      marginRight: '-15px',
                      fontSize: '30px',
                      color: '#b25634',
                      fill: '#b25634',
                    },
                    '& .MuiSvgIcon-root::before': {
                      border: '1.5px solid #D6A796',
                    },
                    '& .MuiSvgIcon-root::after': {
                      border: '1.5px solid #D6A796',
                    },
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <div className="selectplace">{abb[status]}</div>
                    }

                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            sx={{
                              color: '#b25634',
                              fontFamily: 'Lora',
                              letterSpacing: '2px',
                              fontSize: '15px',
                            }}
                          />
                        ))}
                      </Box>
                    )
                  }}
                  MenuProps={MenuProps}
                >
                  {gradelist.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, agereg, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="reggroup">
                <Select
                  labelId="demo-simple-select-helper-label"
                  variant="standard"
                  id="demo-simple-select-standard"
                  className="register_selector"
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  value={stugenderreg}
                  onChange={(e) => {
                    setstugenderreg(e.target.value)
                  }}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <div className="selectplace">{yy[status]}</div>
                    }

                    return selected
                  }}
                  sx={{
                    color: '#b25634',
                    paddingLeft: '10px',
                    paddingBottom: '5px',
                    fontFamily: 'Lora',
                    letterSpacing: '2px',
                    fontSize: '20px',
                    '&:hover': {
                      color: '#b25634',
                    },
                    '&:focus': {
                      backgroundColor: '#00000000',
                    },
                    '&:not(.Mui-disabled):hover::before': {
                      borderBottom: '1.5px solid #b25634',
                    },
                    '&:before': {
                      borderBottom: '1.5px solid #D6A796',
                    },
                    '&:after': {
                      borderBottom: '1.5px solid #D6A796',
                    },
                    '& .MuiSvgIcon-root': {
                      marginRight: '-15px',
                      fontSize: '30px',
                      color: '#b25634',
                      fill: '#b25634',
                    },
                    '& .MuiSvgIcon-root::before': {
                      border: '1.5px solid #D6A796',
                    },
                    '& .MuiSvgIcon-root::after': {
                      border: '1.5px solid #D6A796',
                    },
                  }}
                >
                  <MenuItem value={pr[status]}>{pr[status]}</MenuItem>
                  <MenuItem value={sr[status]}>{sr[status]}</MenuItem>
                  <MenuItem value={ss[status]}>{ss[status]}</MenuItem>
                </Select>
              </div>

              <div className="reggroup">
                <Select
                  className="register_selector"
                  variant="standard"
                  multiple
                  value={personalityreg}
                  onChange={handleperson}
                  input={
                    <Input
                      id="select-multiple-chip"
                      label="Chip"
                      sx={{
                        underline: {
                          '&&&:before': {
                            borderBottom: 'none',
                          },
                          '&&:after': {
                            borderBottom: 'none',
                          },
                        },
                      }}
                    />
                  }
                  sx={{
                    color: '#b25634',
                    fontFamily: 'Lora',
                    letterSpacing: '2px',
                    paddingBottom: '5px',
                    paddingLeft: '10px',
                    fontSize: '20px',
                    '&:hover': {
                      color: '#b25634',
                      border: 'none',
                    },
                    '&:focus': {
                      backgroundColor: '#00000000',
                    },
                    '&:not(.Mui-disabled):hover::before': {
                      borderBottom: '1.5px solid #b25634',
                    },
                    '&:before': {
                      borderBottom: '1.5px solid #D6A796',
                    },
                    '&:after': {
                      borderBottom: '1.5px solid #D6A796',
                    },
                    '& .MuiSvgIcon-root': {
                      marginRight: '-15px',
                      fontSize: '30px',
                      color: '#b25634',
                      fill: '#b25634',
                    },
                    '& .MuiSvgIcon-root::before': {
                      border: '1.5px solid #D6A796',
                    },
                    '& .MuiSvgIcon-root::after': {
                      border: '1.5px solid #D6A796',
                    },
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <div className="selectplace">{bbc[status]}</div>
                    }

                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            sx={{
                              color: '#b25634',
                              fontFamily: 'Lora',
                              letterSpacing: '2px',
                              fontSize: '15px',
                            }}
                          />
                        ))}
                      </Box>
                    )
                  }}
                  MenuProps={MenuProps}
                >
                  {charlist.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personalityreg, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
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
            id="dialog_registered"
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <div id="registeredsucc">{ij[status]}</div>
            <Link to="/sign-in">
              <div id="return">{jk[status]}</div>
            </Link>
            <div></div>
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
        </div>
        <div className="full">
          <div className="languagereg">
            <div className="wordslog" onClick={changestatus}>
              中
            </div>
            <div className="wordslog">/</div>
            <div className="wordslog" onClick={changestatus}>
              English
            </div>
          </div>
          <Link to="/sign-in">
            <div className="signintext">{h[status]}</div>
          </Link>
          <div className="regsub">
            <div className="regwords">
              <h1 className="title_reg">{kl[status]}</h1>
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
              <button
                className="next"
                onClick={() => {
                  register()
                }}
              >
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
