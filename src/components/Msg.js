import React, { useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import './Msg.css'
import '../App.css'
import { FaUser } from 'react-icons/fa'
import { ChatEngine } from 'react-chat-engine'

function Msg() {
  let num = [1, 2, 3]
  const [msg, setmsg] = useState('')
  let status = 0;
  let a = ["You have to be paired with a student to unlock the function.","你需要和一位學生配對後才能解鎖訊息功能"]
  return (
    <div>
      <div className="warningmsg">
        {a[status]}
        </div>
      <div className="out">
        <div className="chathistory">
          <div className="searchpad">
            <div className="search">
              Find friends
              <BiSearchAlt className="searchicon"></BiSearchAlt>
            </div>
          </div>
          <div className="peoplelist">
            {num.map((e) => {
              return (
                <div className="shadowing">
                  <div className="outerbox">
                    <div className="imagemsg">
                      <FaUser className="msg_icon" />
                    </div>
                    <div className="infoboxmsg">
                      <div className="namemsg">Voluntutor</div>
                      <div className="latestmsg">Join us!</div>
                    </div>
                    <div className="align">
                      <div className="numbermsg">2</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="chatcontent">
          <div className="chatname">Voluntutor</div>
          <div className="chat">
            <div className="teacher_msg">
              <div className="words">Are you available next monday?</div>
            </div>
            <div className="student_msg">
              <div className="chatava">
                <FaUser className="msg_icon" />
              </div>
              <div className="words_student">
                Yes, can we have a meeting then?
              </div>
            </div>
            <div className="student_msg">
              <div className="chatava">
                <FaUser className="msg_icon" />
              </div>
              <div className="words_student">I'm okay with the time</div>
            </div>
            <div className="teacher_msg">
              <div className="words">Sure!!</div>
            </div>
            <div className="teacher_msg">
              <div className="words">See you then!</div>
            </div>
            <div className="teacher_msg">
              <div className="words">
                Make sure to finish up your homework and good luck on your
                chinese exam tomorrow! Also remember to bring your science
                textbook!
              </div>
            </div>
            <div className="student_msg">
              <div className="chatava">
                <FaUser className="msg_icon" />
              </div>
              <div className="words_student">OHH right I almost forgot</div>
            </div>
          </div>
          <div className="send">
            <textarea
              className="messagesend"
              type="text"
              placeholder="Enter your message..."
              value={msg}
              disabled="true"
              onChange={(e) => {
                setmsg(e.target.value)
              }}
            />
            <div className="sendword">send</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Msg