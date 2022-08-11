import React, { useState, useEffect, useRef } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import './Msg.css'
import '../App.css'
import Loading from './Loading'
import { Msg_user } from './Msg_user'
import { FaUser } from 'react-icons/fa'
import Axios from 'axios'
import { useSelector } from 'react-redux'

function S_Msg() {
  const user = useSelector((state) => state.user.value)
  const [status, setStatus] = useState(1)
  const [curMsg, setCurMsg] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [allMsg, setAllMsg] = useState([])
  let tmpChtRm = []
  let a = ['Function will be completed soon', '此功能即將完成，請敬請期待！']
  let b = ['Find friends', '尋找朋友']
  let c = ['Enter your message...', '請輸入訊息...']
  let d = ['send', '傳送']

  useEffect(() => {
    console.log('user: ', user)
    setStatus(user.language)
    setAllMsg([])
    Axios.post('https://voluntutorcloud-server.herokuapp.com/findContactbyName', {
      studentname: user.name,
    })
      .then((response1) => {
        console.log(user.name, "'s contact includes: ", response1.data)
        for (let i = 0; i < response1.data.length; i++) {
          Axios.all([
            Axios.post('https://voluntutorcloud-server.herokuapp.com/getMsg', {
            username: response1.data[i].username,
            studentname: response1.data[i].studentname,
            }), 
            Axios.post('https://voluntutorcloud-server.herokuapp.com/updateMsgStatus', {
              username: response1.data[i].username,
              studentname: response1.data[i].studentname,
              sender: 'T',
              isread: true
            })
          ]).then(Axios.spread((response2, response3) => {

            console.log(response1.data[i], ':', response2.data);
            console.log(response3.data);

            if (response2.data.length)
              setAllMsg((allMsg) => [...allMsg, response2.data])
            else
              setAllMsg((allMsg) => [
                ...allMsg,
                [
                  {
                    username: response1.data[i].username,
                    studentname: response1.data[i].studentname,
                    msg: '',
                    sender: 'S',
                    sendtime: '',
                    isread: false
                  },
                ],
              ])
            console.log('add ', [
              {
                username: response1.data[i].username,
                studentname: response1.data[i].studentname,
                msg: '',
                sender: 'S',
                sendtime: '',
                isread: false
              },
            ])
            if (i === response1.data.length - 1) setLoading(false)
          }))
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const updateMsg = () => {
    var curTime = new Date();
    curTime = curTime.getFullYear() + "/" + curTime.getMonth() + "/" + curTime.getDate() + " " + curTime.getHours() + ":" + curTime.getMinutes() + ":" + curTime.getSeconds();
    console.log(curTime);
    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateMsg', {
      username: tmpChtRm[0].username,
      studentname: tmpChtRm[0].studentname,
      msg: curMsg,
      sender: 'S',
      sendtime: curTime,
      isread: false
    }).then((response) => {
      console.log(response.data)
      let tmpAllMsg = allMsg
      for (let i = 0; i < tmpAllMsg.length; i++) {
        if (tmpAllMsg[i] === tmpChtRm) {
          tmpAllMsg[i].push({
            username: tmpChtRm[0].username,
            studentname: tmpChtRm[0].studentname,
            msg: curMsg,
            sender: 'S',
            sendtime: curTime,
            isread: false
          })
        }
      }
      setAllMsg(tmpAllMsg)
    })
    setTimeout(() => setCurMsg(' '), 1000)
    setTimeout(() => setCurMsg(''), 1000)
  }

  if (isLoading) {
    return <Loading />
  } else {
    console.log(allMsg)
    return (
      <div>
        <div className="out">
          <div className="chathistory">
            <div className="searchpad">
              <div className="search">
                {b[status]}
                <BiSearchAlt className="searchicon"></BiSearchAlt>
              </div>
            </div>
            <div className="peoplelist">
              {allMsg.map((chtRm) => {
                tmpChtRm = chtRm
                console.log(tmpChtRm)
                return (
                  <div className="shadowing">
                    <div className="outerbox">
                      <div className="imagemsg">
                        <FaUser className="msg_icon" />
                      </div>
                      <div className="infoboxmsg">
                        <div className="namemsg">{chtRm[0].username}</div>
                        <div className="latestmsg">
                          {chtRm[chtRm.length - 1].msg.substring(0, 8)}{(chtRm[chtRm.length - 1].msg.length > 8) ? "..." : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="chatcontent">
            <div className="chatname">{tmpChtRm[0].username}</div>
            <div className="chat">
              {tmpChtRm.map((msg) => {
                return (
                  <Msg_user
                    type={msg.sender === 'S' ? 'user' : 'recipient'}
                    text={msg.msg}
                  ></Msg_user>
                )
              })}
            </div>
            <div className="send">
              <textarea
                className="messagesend"
                type="text"
                placeholder={c[status]}
                value={curMsg}
                onChange={(e) => {
                  setCurMsg(e.target.value)
                }}
              />
              <div
                className="sendword"
                onClick={() => {
                  updateMsg()
                }}
              >
                {d[status]}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default S_Msg
