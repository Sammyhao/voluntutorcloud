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
            <img className="st_pic" src="/images/大溪國小.png"></img>
          </div>
          <div className="stwrapwrap">
            <img className="st_pic" src="/images/廣興國小.png"></img>
          </div>
          <div className="stwrapwrap">
            <img className="st_pic" src="/images/南王國小.png"></img>
          </div>
        </div>
        <div className="first_st">
          <div className="stwrapwrap">
            <img className="st_pic" src="/images/溫泉國小.png"></img>
          </div>
          <div className="stwrapwrap">
            <img className="st_pic" src="/images/崁頂國小.png"></img>
          </div>
          <div className="stwrapwrap">
            <img className="st_pic" src="/images/開瑄國小.png"></img>
          </div>
        </div>
        <div className="first_st">
          <div className="stwrapwrap">
            <img className="st_pic" src="/images/義方國小.png"></img>
          </div>
          <div className="stwrapwrap">
            <img className="st_pic" src="/images/瑞穗國小.png"></img>
          </div>
          <div className="stwrapwrap">
            <img className="st_pic" src="/images/崁頂國小.png"></img>
          </div>
        </div>
      </div>
    </div>
  )
}
