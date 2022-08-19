import React, { useState, useEffect } from 'react'
import './Team.css'
import { Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import Axios from 'axios'

export default function Team() {
  const [status, setStatus] = useState(1)
  const user = useSelector((state) => state.user.value)
  console.log('store data: ', user)

  useEffect(() => {
    setStatus(user.language)
  }, [])
  // titles
  let a = ['Team', '團隊介紹']
  let b = ['Ruby Chang', '張舒晴 Ruby']
  let c = ['President', '領導者']
  let d = ['Engineering Director', '網站工程師']
  let e = ['Sam Hao', '郝胤翔 Sam']
  let f = ['Vice President', '副領導者']
  let g = ['Carol Kao', '高婉予 Carol']
  let h = ['Marketing Director', '行銷總編']
  let i = ['PR Director', '公關領導']
  let j = ['Zachary Lai', '賴元斌 Zachary']
  let k = ['Daniel Yu', '余浩瑋 Daniel']

  return (
    <div className="about_uscont">
      <div className="about_ustitle">{a[status]}</div>
      <div className="teamwrap">
        <div className="first">
          <div className="person">
            <img
              className="team_pic"
              id="teamimage_bg"
              src="/images/Ruby.PNG"
            ></img>
            <div class="image_team_overlay image_team_overlay -- blur">
              <div class="image_text_team">
                <b className="image_text_head">{b[status]}</b>
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="image_text_roles">{c[status]}</div>
                  <div className="image_text_roles">{d[status]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="person">
            <img
              className="team_pic"
              id="teamimage_bg"
              src="/images/Carol.PNG"
            ></img>

            <div class="image_team_overlay image_team_overlay -- blur">
              <div class="image_text_team">
                <b className="image_text_head">{g[status]}</b>
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="image_text_roles">{f[status]}</div>
                  <div className="image_text_roles">{h[status]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="person">
            <img
              className="team_pic"
              id="teamimage_bg"
              src="/images/Sam.PNG"
            ></img>
            <div class="image_team_overlay image_team_overlay -- blur">
              <div class="image_text_team">
                <b className="image_text_head">{e[status]}</b>
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="image_text_roles">{f[status]}</div>
                  <div className="image_text_roles">{d[status]}</div>
                </div>{' '}
              </div>
            </div>
          </div>
        </div>
        <div className="second_team">
          <div className="person">
            <img
              className="team_pic"
              id="teamimage_bg"
              src="/images/Zachary.PNG"
            ></img>

            <div class="image_team_overlay image_team_overlay -- blur">
              <div class="image_text_team">
                <b className="image_text_head">{j[status]}</b>
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="image_text_roles">{i[status]}</div>
                  <div className="image_text_roles">{i[status]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="person">
            <img
              className="team_pic"
              id="teamimage_bg"
              src="/images/Daniel.PNG"
            ></img>
            <div class="image_team_overlay image_team_overlay -- blur">
              <div class="image_text_team">
                <b className="image_text_head">{k[status]}</b>
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="image_text_roles">{i[status]}</div>
                  <div className="image_text_roles">{i[status]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
