import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './SignIn_design.css'
import '../App.css'
import { Link, useNavigate, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { BsFillEyeSlashFill } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
function SignIn_design() {
  const [inputValue, setInputValue] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const navigate = useNavigate()
  const login = () => {
    Axios.post('http://localhost:3010/login', {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus('Hello, ' + response.data[0].username + '.')
        navigate('/')
        //change the global variable that saves the user's status
        changeStatus()
      }
    })
  }

  function changeStatus() {
    Axios.post('http://localhost:3010/changeStatus', {
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
  const [status, setStatus] = useState(0);
  let a = ["Welcome Back!","歡迎回來！"]
  let b = ["Username" ,"帳號名稱"]
  let c = ["Password" , '密碼']
  let d = ["LOGIN" ,"登入"]
  let e = ["Sign up" ,"註冊帳號"]
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
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <button id="show" onClick={togglePassword}>
            <BsFillEyeSlashFill id="showpass" />
          </button>
        </div>
        <button className="btn-login" onClick={login}>
        {d[status]}
        </button>
        <Link to="/register" className="signUp">
        {e[status]}
        </Link>
        <br />
        <br />
      </div>
    </div>
  )
}

export default SignIn_design
