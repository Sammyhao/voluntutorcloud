import React, { useEffect, useState } from 'react'
import './Bookingcomp.css'

import { FaUser } from 'react-icons/fa'
export const Bookingcomp = ({msg, bookingInfo}) => {
  console.log("into bookingcomponent")
  console.log(bookingInfo);
  console.log(msg);
  if (bookingInfo.length == 0) {
  console.log("length==0")
    return (
      <div className="bookingoutestwrap">
        <div className="bookingrow_teacher">
          <div className="bookingwrapsecond">
            <div className="bookingwordswrapfirst">
              <div className="bookingimageprog">
                <FaUser className="bookingprog_avatar" />
              </div>

              <div className="bookingrequesttotaltime">
                <div className="detailtimeforupcomings">{msg}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    console.log("length is not zero")
    return(
      <div className="bookingoutestwrap">

            {bookingInfo.map((e) => {
              return (
              <div className="bookingrow_teacher">
                <div className="bookingwrapsecond">
                  <div className="bookingwordswrapfirst">
                    <div className="bookingimageprog">
                      <FaUser className="bookingprog_avatar" />
                    </div>
                    <div className="bookingrequesttotal">
                      <div className="bookingrequestsub">{e.studentname}</div>
                      <div className="bookinrequesttime">{e.duration} hr</div>
                    </div>
                    <div className="bookingrequesttotaltime">
                      <div className="detailtimeforupcomings">
                        {e.date} {e.time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )
            })}

          </div>
    )
}
}