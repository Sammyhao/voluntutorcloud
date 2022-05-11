import React, { useState, useEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import './Msg.css'
import '../App.css'
import { FaUser } from 'react-icons/fa'
import { ChatEngine } from 'react-chat-engine'
import Axios from 'axios'

function S_Msg() {
  let num = [1]
  const [msg, setmsg] = useState('')

  const [status, setStatus] = useState(0);
  let username = "";
  
  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then((response) => {
      username = response.data.user[0].username;
      Axios.post('https://voluntutorcloud-server.herokuapp.com/getLang', {
        username: username,
      }).then((response) => {
        console.log(response.data);
        if(response.data == "chinese") setStatus(1);
        else setStatus(0);
        console.log(status);
      })
    })
  })

  let a = ["Function will be completed soon","此功能即將完成，請敬請期待！"]
  return (
    <div>
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
                      <div className="namemsg">Teacher name</div>
                      <div className="latestmsg">OHH right I almost forgot</div>
                    </div>
                    <div className="align">
                      <div className="numbermsg">1</div>
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

export default S_Msg
