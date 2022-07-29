import React, { useState, useEffect } from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { useSelector } from 'react-redux'

function Footer(props) {
  const [emailAddress, setEmailAddress] = useState('')
  const [status, setStatus] = useState(1)

  // titles
  let a = [
    'Join Voluntutor Cloud to receive the newest information!',
    '加入Voluntutor Cloud以獲取最新資訊！',
  ]
  let b = ['You can unsubscribe at any time.', '你可以隨時取消訂閱。']
  let c = ['Your email', '你的Email']
  let d = ['Subscribe NOW', '加入我們']

  useEffect(() => {
    const user = useSelector((state) => state.user.value)
    console.log('store data: ', user)
    setStatus(user.language)
  }, [])

  const saveEmailAddress = (e) => {
    setEmailAddress(e.target.value)
  }

  function subscribe() {
    Axios.post(
      'https://voluntutorcloud-server.herokuapp.com/AddToMailingList',
      {
        email: emailAddress,
      },
    ).then((response) => {
      console.log(response)
    })
    setEmailAddress('')
  }

  // useEffect(() => {
  //   console.log(props)
  //   if (props.lang == 'chinese' || props.lang == 'english') {
  //     if (props.lang == 'chinese') setStatus(1)
  //     else setStatus(0)
  //   } else {
  //     console.log('props failed')
  //     Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
  //       (response) => {
  //         if (response.data.user[0].lang == 'chinese') setStatus(1)
  //         else setStatus(0)
  //       },
  //     )
  //   }
  // })

  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">{a[status]}</p>
        <p className="footer-subscription-text">{b[status]}</p>
        <div className="input-areas">
          <form className="form-email">
            <input
              className="footer-input"
              name="email"
              type="email"
              value={emailAddress}
              placeholder={c[status]}
              onChange={saveEmailAddress}
            />
            <Link to="/" className="btn-foot">
              <div className="footer-btn" onClick={subscribe}>
                {d[status]}
              </div>
            </Link>
          </form>
        </div>
      </section>

      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              Voluntutor Cloud
              {/* <i class="fab fa-typo3" /> */}
            </Link>
          </div>
          <small class="website-rights">Voluntutor Cloud © 2022</small>
          <div class="social-icons">
            <i
              class="social-icon-link line"
              href="https://line.me/R/ti/p/@564usgab"
              target="_blank"
              aria-label="Line"
            />
            <a
              class="social-icon-link instagram"
              href="https://www.instagram.com/voluntutor_cloud/"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram" />
            </a>
            <Link
              class="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i class="fab fa-youtube" />
            </Link>
            <Link
              class="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter" />
            </Link>
            <Link
              class="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
