import React, { useState, useEffect } from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { useSelector } from 'react-redux'

function Footer() {
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

  const user = useSelector((state) => state.user.value)
  console.log('store data: ', user)

  useEffect(() => {
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
            <a
              class="social-icon-link line"
              href="https://www.instagram.com/voluntutor_cloud/"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram" />
            </a>
            <a
              class="social-icon-link line"
              href="https://lin.ee/NOm1W9F"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fab fa-line" />
            </a>

            <a
              class="social-icon-link line"
              href="https://www.youtube.com/channel/UCsW6RDiUIRPiyKyJ6_HTtFw"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fab fa-youtube" />
            </a>
            <a
              class="social-icon-link line"
              href="https://twitter.com/voluntutor"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fab fa-twitter" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
