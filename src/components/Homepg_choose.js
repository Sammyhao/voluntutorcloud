import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import './Homepg_choose.css'

function Homepg_choose() {
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

  let a = ["CHOOSE A PROGRAM","選擇一個志工計畫！"]
  let b = ["Chinese","國文"]
  let c = ["Math","數學"]
  let d = ["English","英文"]
  let e = ["Science","自然"]
  let f = ["Social Studies","社會"]
  let g = ["Computing","資訊"]
  return (
    <div className="hpch_outest">
      <div className="hpch_outcont">
        <div className="hpch_title">{a[status]}</div>
        <div className="hpch_inncont">
          <div className="hpch_column">
            <div className="hpch_listcont">
              <Link  className = "link_choose" to="/Subjects" state={{subject: "Chinese"}}>
              <img className="img_cont_hpch" src="/images/home_chine.png"></img>
              <div className="hpch_subtitles">{b[status]}</div>
              </Link>
            </div>
            <Link  className = "link_choose" to="/Subjects" state={{subject: "Math"}}>
            <div className="hpch_listcont">
              <img className="img_cont_hpch" src="/images/home_math.png"></img>
              <div className="hpch_subtitles">{c[status]}</div>
            </div>
            </Link>
          </div>
          <div className="hpch_column">
            <Link className = "link_choose" to="/Subjects" state={{subject: "English"}}>
            <div className="hpch_listcont">
              <img className="img_cont_hpch" src="/images/home_eng.png"></img>
              <div className="hpch_subtitles">{d[status]}</div>
            </div>
            </Link>
            <Link className = "link_choose" to="/Subjects" state={{subject: "Science"}}>
            <div className="hpch_listcont">
              <img
                className="img_cont_hpch"
                src="/images/home_science.png"
              ></img>
              <div className="hpch_subtitles">{e[status]}</div>
            </div>
            </Link>
          </div>
          <div className="hpch_column">
            <Link  className = "link_choose" to="/Subjects" state={{subject: "Social Studies"}}>
            <div className="hpch_listcont">
              <img className="img_cont_hpch" src="/images/home_socia.png"></img>
              <div className="hpch_subtitles">{f[status]}</div>
            </div>
            </Link>
            <Link  className = "link_choose" to="/Subjects" state={{subject: "Computing"}}>
            <div className="hpch_listcont">
              <img className="img_cont_hpch" src="/images/home_comp.png"></img>
              <div className="hpch_subtitles">{g[status]}</div>
            </div>
            </Link>
          </div>
        </div>
      </div>
      <img className="quote" src="/images/homepagequote.png"></img>
    </div>
  )
}
export default Homepg_choose