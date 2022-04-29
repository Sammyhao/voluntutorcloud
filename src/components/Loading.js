import React, { useEffect, useState } from 'react'
import './Loading.css'
export default function Loading() {
  return (
    <div className="loading">
      <img className="loadinggif" src="/images/loadingpic.gif"></img>
      <div className="loadingword">Loading...</div>
      <img className="loadingbar" src="/images/loadingbar.gif"></img>
    </div>
  )
}
