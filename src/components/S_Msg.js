import React, { useState, useEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import './Msg.css'
import '../App.css'
import Loading from './Loading'
import { Msg_recipient } from './Msg_recipient'
import { Msg_user } from './Msg_user'
import { FaUser } from 'react-icons/fa'
import Axios from 'axios'

function S_Msg() {
  let num = [1]

  const [status, setStatus] = useState(0)
  let username = '', studentname = "", teacherusername = "";
  const [curMsg, setCurMsg] = useState('');
  const [msgRec, setMsgRec] = useState([]);
  let msgStr = "";
  const [msgForUpd, setMsgForUpd] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [hasProcessMsg, setHasProcessMsg] = useState(false);
  const [usernameConst, setUsernameConst] = useState('');
  const [studentnameConst, setStudentnameConst] = useState('');

  function processMsg(msgStr, teacherusername, studentname) {
    if(msgRec.length == 0) {
      const msgInfo = msgStr.split('ψ');
      for(let i = 0; i < msgInfo.length; i++) {
        const category = msgInfo[i].split(':');
        let t = "";
        t = (category[0] == 'S') ? "user" : "recipient"
        let msg = {type: t, text: category[1]};
        setMsgRec(msgRec => [msg, ...msgRec]);
      }
      // msgRecRev = msgRec.reverse();
      setUsernameConst(teacherusername);
      setStudentnameConst(studentname);
      setMsgForUpd(msgStr);
      setHasProcessMsg(true);
    }
  }

  const updateMsg = () => {
    let msg = {type: "user", text: curMsg};
    setCurMsg("")
    setMsgRec(msgRec => [...msgRec, msg]);
    msgStr += "S:" + curMsg + 'ψ';
    console.log(msgStr);
    let tempMsgForUpd = msgStr + msgForUpd;
    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateMsg', {
      username: usernameConst,
      studentname: studentnameConst,
      msg: tempMsgForUpd
    }).then((response) => {
      console.log(response);
    })
    setMsgForUpd(tempMsgForUpd);
  }

  useEffect(() => {
    if(isLoading) {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
        (response) => {
          username = response.data.user[0].username
          if (response.data.user[0].lang == 'chinese') setStatus(1)
          else setStatus(0);
          studentname = response.data.user[0].lastname + response.data.user[0].firstname;
          Axios.post('https://voluntutorcloud-server.herokuapp.com/findContactbyName', {
            studentname: studentname,
          }).then((response) => {
            console.log(response.data);
            teacherusername = response.data[0].username;
            console.log("username, studentname: ");
            console.log(teacherusername, studentname);
            if(!hasProcessMsg) {
              Axios.post('https://voluntutorcloud-server.herokuapp.com/getMsg', {
                username: teacherusername,
                studentname: studentname
              }).then((response) => {
                msgStr = response.data[0].msg;
                processMsg(msgStr, teacherusername, studentname);
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
    setMsgRec(msgRec.slice(0, msgRec.size()));
    
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
                      <div className="namemsg">{teacherusername}</div>
                      <div className="latestmsg">{msgRec[msgRec.length-1].text}</div>
                    </div>
                    {/* <div className="align">
                      <div className="numbermsg">1</div>
                    </div> */}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="chatcontent">
          <div className="chatname">{teacherusername}</div>
          <div className="chat">
            {msgRec.map((e) => {
              return <Msg_user type={e.type} text={e.text}></Msg_user>
            })}
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
            <div className="sendword" onClick={updateMsg}>send</div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default S_Msg
