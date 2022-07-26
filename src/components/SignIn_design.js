import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './SignIn_design.css'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducer/user'
import { Link, useNavigate, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { BsFillEyeSlashFill } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'

function SignIn_design() {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const [btnstyle, setbtnstyle] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false)
  const navigate = useNavigate()
  const loginfunc = () => {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/login', {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        console.log(response)
        setLoginStatus('Hello, ' + response.data[0].username + '.')
        navigate('/')
        if (username === 'admin') navigate('/admin') // here
        //change the global variable that saves the user's status
        changeStatus()
      }
    })
  }
  const userdata = useSelector((state) => state.user.value)

  const store = () => {
    dispatch({ type: 'FETCH_DATA_SUCCESS' })
    console.log(userdata)
  }
  const keyDownHandler = (event) => {
    console.log('into function')
    if (event.key === 'Enter') {
      event.preventDefault()
      console.log('pressed enter')
      setbtnstyle(true)
      loginfunc()
    }
  }

  function changeStatus() {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/changeStatus', {
      username: username,
      LoginStatus: true,
    }).then((response) => {
      if (response.data.message) {
        console.log(response.data.message)
      }
    })
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  // Reset Input Field handler
  const resetInputField = () => {
    setInputValue('')
  }
  const [status, setStatus] = useState(1)
  let a = ['Welcome Back!', '歡迎回來！']
  let b = ['Username', '帳號名稱']
  let c = ['Password', '密碼']
  let d = ['LOGIN', '登入']
  let e = ['Sign up', '註冊帳號']
  return (
    <div className="log">
      <div className="image_wrap_sign">
        <img className="pic_sign" src="/images/signin.png" />
      </div>
      <div className="login_box">
        <p className="title">{a[status]}</p>
        <h2 className="loginstat">{loginStatus}</h2>
        <div className="formgroup">
          <i class="fa fa-user icon" id="user"></i>
          <input
            id="signin_input"
            type="text"
            value={inputValue}
            placeholder={b[status]}
            onChange={(e) => {
              setUsername(e.target.value)
              setInputValue(e.target.value)
            }}
          />
          <button id="reset" onClick={resetInputField}>
            <ImCross id="clear" />
          </button>
        </div>
        <div className="formgroup">
          <i class="fa fa-lock icon" id="lock" aria-hidden="true"></i>
          <input
            id="sigin_input_pass"
            type={passwordShown ? 'text' : 'password'}
            placeholder={c[status]}
            onKeyPress={keyDownHandler}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <button id="show" onClick={togglePassword}>
            <BsFillEyeSlashFill id="showpass" />
          </button>
        </div>
        <button
          className={btnstyle ? 'btn-loginpressed' : 'btn-login'}
          onClick={store}
        >
          {d[status]}
        </button>
        <Link to="/register" className="signUp">
          {e[status]}
        </Link>
        <br />
        <br />
      </div>
      <div className="signinglanguage">
        <div
          className="wordslog"
          onClick={() => {
            setStatus(1)
          }}
        >
          中
        </div>
        <div className="wordslog">/</div>
        <div
          className="wordslog"
          onClick={() => {
            setStatus(0)
          }}
        >
          English
        </div>
      </div>
    </div>
  )
}

export default SignIn_design
