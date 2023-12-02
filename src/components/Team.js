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
  let a = ['Founders Team', '創辦團隊 執行總監']
  let b = ['Ruby Chang', '張舒晴 Ruby']
  let c = ['Founding President', '創辦領導者']
  let d = ['Engineering Director', '開發總監']
  let e = ['Sam Hao', '郝胤翔 Sam']
  let f = ['Founding Vice President', '副創辦領導者']
  let g = ['Carol Kao', '高婉予 Carol']
  let h = ['Marketing Director', '行銷總監']
  let i = ['PR Director', '公關領導']
  let j = ['Zachary Lai', '賴元斌 Zachary']
  let k = ['Daniel Yu', '余浩瑋 Daniel']
  let l = ['HR Director', '人資領導']
  let m = ['Ethan Ho', '何秉軒']
  let n = ['President', '領導者']
  let o = ['Kyle Wang', '王聖元']
  let p = ['Vice President', '副領導者']
  let q = ['Justin Chiang', '江家慶']


  return (
    <div className="about_uscont">
      <div className="about_ustitle">{a[status]}</div>
      <div className="teamwrap">
        <div className="current_team">
          <div className="person">
            <img
              className="team_pic"
              id="teamimage_bg"
              src="/images/Ethan.png"
            ></img>
            <div class="image_team_overlay image_team_overlay -- blur">
              <div class="image_text_team">
                <b className="image_text_head">{m[status]}</b>
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="image_text_roles">{n[status]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="person">
            <img
              className="team_pic"
              id="teamimage_bg"
              src="/images/Kyle.jpeg"
            ></img>
            <div class="image_team_overlay image_team_overlay -- blur">
              <div class="image_text_team">
                <b className="image_text_head">{o[status]}</b>
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="image_text_roles">{p[status]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="person">
            <img
              className="team_pic"
              id="teamimage_bg"
              src="/images/Justin.jpeg"
            ></img>
            <div class="image_team_overlay image_team_overlay -- blur">
              <div class="image_text_team">
                <b className="image_text_head">{q[status]}</b>
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="image_text_roles">{p[status]}</div>
                </div>
              </div>
            </div>
          </div>
		  </div>

<div className="current_team">
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
                  <div className="image_text_roles">{n[status]}</div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="current_team">
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
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="image_text_roles">{i[status]}</div>
                  <div className="image_text_roles">{l[status]}</div>
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
                  <div className="image_text_roles">{l[status]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
