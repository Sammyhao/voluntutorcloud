import React, { useState, useEffect } from 'react'
import './Team.css'
import { Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import Axios from 'axios'

export default function Collaboration() {
  const [status, setStatus] = useState(1)
  const user = useSelector((state) => state.user.value)
  console.log('store data: ', user)

  useEffect(() => {
    setStatus(user.language)
  }, [])
  // titles
  let a = ['Collaboration', '合作夥伴']

  return (
    <div className="about_uscont">
      <div className="about_ustitle">{a[status]}</div>
      <div className="teamwrap">
        <div className="second_team">
          <div className="person">
            {/* <img className="team_pic" src="/images/Carol.jpg"></img> */}
            <div className="temp_pic"></div>
          </div>
          <div className="person">
            {/* <img className="team_pic" src="/images/Carol.jpg"></img> */}
            <div className="temp_pic"></div>
          </div>
          <div className="person">
            {/* <img className="team_pic" src="/images/Carol.jpg"></img> */}
            <div className="temp_pic"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
