import React, { useState, useEffect } from 'react'
import './Team.css'
import { Divider } from '@mui/material'
import Axios from 'axios'

export default function Team() {
  const [status, setStatus] = useState(0);
  let username = "";
  
  useEffect(() => {
    Axios.get('http://localhost:3010/login').then((response) => {
      username = response.data.user[0].username;
      Axios.post('http://localhost:3010/getLang', {
        username: username,
      }).then((response) => {
        console.log(response.data);
        if(response.data == "chinese") setStatus(1);
        else setStatus(0);
        console.log(status);
      })
    })
  })
  
  let a = ["Team", "團隊介紹"]
  let b = ["Ruby Chang", "張舒晴 Ruby"]
  let c = ["Team Leader", "團隊領導者"]
  let d = ["Programmer", "編程"]
  let e = ["Sam Hao", "郝胤翔 Sam"]
  let f = ["Vice Team Leader" ,"團隊副領導者"]
  let g = ["Carol Kao", "高婉予 Carol"]
  let h = ["Artistic Director", "網站頁面設計"]
  let i = ["Public Relation", "公關"]
  let j = ["Zachary Lai","賴元斌 Zachary"]
  let k = ["Daniel Yu","余浩瑋 Daniel"]
  return (
    <div className="about_uscont">
      <div className="about_ustitle">{a[status]}</div>
      <div className="teamwrap">
        <div className="first">
          <div className="person">
            <img className="team_pic" src="/images/Ruby.png"></img>

            <div className="team_name">{b[status]}</div>
            <Divider className="team_line"></Divider>
            <div className="team_role_wrap">
              <div className="team_role">{c[status]}</div>
              <div className="team_role">{d[status]}</div>
            </div>
          </div>
          <div className="person">
            <img className="team_pic" src="/images/Sam.png"></img>

            <div className="team_name">{e[status]}</div>
            <Divider className="team_line"></Divider>
            <div className="team_role_wrap">
              <div className="team_role">{f[status]}</div>
              <div className="team_role">{d[status]}</div>
            </div>
          </div>
        </div>
        <div className="second_team">
          <div className="person2">
            <img className="team_pic" src="/images/Carol.png"></img>

            <div className="team_name">{g[status]}</div>
            <Divider className="team_line"></Divider>
            <div className="team_role_wrap">
              <div className="team_role">{h[status]}</div>
              <div className="team_role">{i[status]}</div>
            </div>
          </div>
          <div className="person2">
            <img className="team_pic" src="/images/Daniel.JPG"></img>

            <div className="team_name">{k[status]}</div>
            <Divider className="team_line"></Divider>
            <div className="team_role_wrap">
              <div className="team_role">{i[status]}</div>
            </div>
          </div>
          <div className="person2">
            <img className="team_pic" src="/images/Zachary.png"></img>

            <div className="team_name">{j[status]}</div>
            <Divider className="team_line"></Divider>
            <div className="team_role_wrap">
              <div className="team_role">{i[status]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
