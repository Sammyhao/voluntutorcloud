import React, { useState, useEffect } from 'react'
import './Team.css'
import { Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import Axios from 'axios'

export default function Specialthanks() {
  const [status, setStatus] = useState(1)
  const user = useSelector((state) => state.user.value)
  console.log('store data: ', user)

  useEffect(() => {
    setStatus(user.language)
  }, [])
  // titles
  let a = ['Special Thanks', '特別感謝']

  return (
    <div className="about_uscont">
      <div className="about_ustitle">{a[status]}</div>
      <div className="stwrap">
        <div className="first_st">
          <div className="stwrapwrap">
            {/* <img className="st_pic" src="/images/Carol.jpg"></img> */}
            <div className="temp_pic"></div>
          </div>
          <div className="stwrapwrap">
            {/* <img className="st_pic" src="/images/Carol.jpg"></img> */}
            <div className="temp_pic"></div>
          </div>
        </div>
        <div className="first_st">
          <div className="stwrapwrap">
            {/* <img className="st_pic" src="/images/Carol.jpg"></img> */}
            <div className="temp_pic"></div>
          </div>
          <div className="stwrapwrap">
            {/* <img className="st_pic" src="/images/Carol.jpg"></img> */}
            <div className="temp_pic"></div>
          </div>
        </div>
        <div className="first_st">
          <div className="stwrapwrap">
            {/* <img className="st_pic" src="/images/Carol.jpg"></img> */}
            <div className="temp_pic"></div>
          </div>
          <div className="stwrapwrap">
            {/* <img className="st_pic" src="/images/Carol.jpg"></img> */}
            <div className="temp_pic"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
