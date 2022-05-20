import React, { useEffect, useState } from 'react'
import './Bookingcomp.css'

export const Bookingcomp = (props) => {
if(props.bookingInfo.length==0){
  return(
    <div className="bookingoutestwrap">
    <div className="bookingrow_teacher">
      <div className="bookingwrapsecond">
        <div className="bookingwordswrapfirst">
          <div className="bookingimageprog">
            <FaUser className="bookingprog_avatar" />
          </div>
          
          <div className="bookingrequesttotaltime">
            <div className="detailtimeforupcomings">{props.msg}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )}else{
      
  }
}

/*
props:
{
    type: "pending" or "confirmed"
    bookingInfo
    lang
    msg
    
}
*/

/*
if(props.bookingInfo.length == 0) {
    if(props.type == "pending") {

    } else {

    }
} else 
props: text
*/
