import React, { useState, useEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import './Msg.css'
import '../App.css'
import { Msg_recipient } from './Msg_recipient'
import Loading from './Loading'
import { Msg_user } from './Msg_user'
import { FaUser } from 'react-icons/fa'
import Axios from 'axios'

function Msg() {
  let num = [1]

  const [status, setStatus] = useState(0)
  let username = '', studentname = "", teacherusername = "";
  const [curMsg, setCurMsg] = useState('');
  const [msgRec, setMsgRec] = useState([]);
  let msgStr = "";
  const [isLoading, setLoading] = useState(true);
  const [hasProcessMsg, setHasProcessMsg] = useState(false);

  function processMsg(msgStr) {
    // console.log("msgStr");
    // console.log(msgStr);
    // let type = "", text = "";
    // for(let i = 0; i < msgStr.length; i++) {
    //   console.log(msgStr[i]);
    //   if(msgStr[i] == 'S') {type = "student";}
    //   else if(msgStr[i] == 'T') type = "teacher";
    //   else if(msgStr[i] == ':') {}
    //   else if(msgStr[i] == 'ψ') {
    //     let msg = {type: type, text: text};
    //     console.log("msg: ");
    //     console.log(msg);
    //     setMsgRec(msgRec => [...msgRec, msg]);
    //     type = "";
    //     text = "";
    //   }else {
    //     text += msgStr[i];
    //   }
    // }
    const msgInfo = msgStr.split('ψ');
    console.log("msgInfo");
    console.log(msgInfo);
    for(let i = 0; i < msgInfo.length; i++) {
      const category = msgInfo[i].split(':');
      console.log("category");
      console.log(category);
      let msg = {type: category[0], text: category[1]};
      console.log("msg: ");
      console.log(msg);
      setMsgRec(msgRec => [...msgRec, msg]);
    }
  }

  useEffect(() => {
    if(isLoading) {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
        (response) => {
          username = response.data.user[0].username
          if (response.data.user[0].lang == 'chinese') setStatus(1)
          else setStatus(0);
          studentname = response.data.user[0].lastname + response.data.user[0].firstname;
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getTeacher', {
            studentname: studentname,
          }).then((response) => {
            teacherusername = response.data[0].username;
            if(!hasProcessMsg) {
              Axios.post('https://voluntutorcloud-server.herokuapp.com/getMsg', {
                username: teacherusername,
                studentname: studentname
              }).then((response) => {
                msgStr = response.data[0].msg;
                console.log("msgStr");
                console.log(msgStr);
                processMsg(msgStr);
                setHasProcessMsg(true);
                setLoading(false);
              })
            }
          })
        },
      )
    }
  })

  let a = ['Function will be completed soon', '此功能即將完成，請敬請期待！']
  if (isLoading) {
    return (
      <Loading/>
    )
  } else {
    console.log("msgRec");
    console.log(msgRec);
    return (
    <div>
      {/* <div className="warningmsg">
        {a[status]}
        </div> */}
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
                      <div className="namemsg">Student name</div>
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
          <div className="chatname">Student name</div>
          <div className="chat">
            <Msg_user text={'Are you available next monday?'}></Msg_user>
            <Msg_recipient
              text={'Yes, can we have a meeting then?'}
            ></Msg_recipient>
            <Msg_recipient text={'I am okay with the time'}></Msg_recipient>

            <Msg_user text={'Sure!!'}></Msg_user>

            <Msg_user text={'See you then!'}></Msg_user>

            <Msg_user
              text={
                'Make sure to finish up your homework and good luck on your chinese exam tomorrow! Also remember to bring your science textbook!'
              }
            ></Msg_user>
            <Msg_recipient text={'OHH right I almost forgot'}></Msg_recipient>
          </div>
          <div className="send">
            <textarea
              className="messagesend"
              type="text"
              placeholder="Enter your message..."
              value={curMsg}
              onChange={(e) => {
                setCurMsg(e.target.value)
              }}
            />
            <div className="sendword">send</div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Msg

{
  /* onclick: <div className="sendword">send</div> */
}
