import React, { useState, useEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import './Msg.css'
import '../App.css'
import { Msg_recipient } from './Msg_recipient'
import { Msg_user } from './Msg_user'
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
          <div className="chatname">Teacher name</div>
          <div className="chat">
            <Msg_recipient text={'Are you available next monday?'}></Msg_recipient>
            <Msg_user
              text={'Yes, can we have a meeting then?'}
            ></Msg_user>
            <Msg_user text={'I am okay with the time'}></Msg_user>

            <Msg_recipient text={'Sure!!'}></Msg_recipient>

            <Msg_recipient text={'See you then!'}></Msg_recipient>

            <Msg_recipient
              text={
                'Make sure to finish up your homework and good luck on your chinese exam tomorrow! Also remember to bring your science textbook!'
              }
            ></Msg_recipient>
            <Msg_user text={'OHH right I almost forgot'}></Msg_user>
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
