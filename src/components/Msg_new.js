import React, { useState, useEffect, useRef } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import './Msg.css'
import '../App.css'
import Loading from './Loading'
import { Msg_user } from './Msg_user'
import { FaUser } from 'react-icons/fa'
import Axios from 'axios'
import { useSelector } from 'react-redux'

function Msg() {
  const user = useSelector((state) => state.user.value)
  const [status, setStatus] = useState(1)
  const [curMsg, setCurMsg] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [allMsg, setAllMsg] = useState([])
  const tmpChtRm = useRef([])
  let a = ['Function will be completed soon', '此功能即將完成，請敬請期待！']
  let b = ['Find friends', '尋找朋友']
  let c = ['Enter your message...', '請輸入訊息...']
  let d = ['send', '傳送']
  const index = useRef(0)

  useEffect(() => {
    console.log('user: ', user)
    setStatus(user.language)
    setAllMsg([])
    Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
      username: user.username,
    })
      .then((response1) => {
        console.log(user.username, "'s contact includes: ", response1.data)

        for (let i = 0; i < response1.data.length; i++) {
          Axios.all([
            Axios.post('https://voluntutorcloud-server.herokuapp.com/getMsg', {
              username: response1.data[i].username,
              studentname: response1.data[i].studentname,
            }),
            Axios.post(
              'https://voluntutorcloud-server.herokuapp.com/updateMsgStatus',
              {
                username: response1.data[i].username,
                studentname: response1.data[i].studentname,
                sender: 'S',
                isread: true,
              },
            ),
          ]).then(
            Axios.spread((response2, response3) => {
              console.log(response1.data[i], ':', response2.data)
              console.log(response3.data)

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
                      sender: 'T',
                      sendtime: '',
                      isread: false,
                    },
                  ],
                ])

              if (i === response1.data.length - 1) setLoading(false)
            }),
          )
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const updateMsg = () => {
    var curTime = new Date()
    curTime =
      curTime.getFullYear() +
      '/' +
      curTime.getMonth() +
      '/' +
      curTime.getDate() +
      ' ' +
      curTime.getHours() +
      ':' +
      curTime.getMinutes() +
      ':' +
      curTime.getSeconds()
    console.log(curTime)

    let tmpCurMsg = curMsg;
    console.log(tmpCurMsg);
    setCurMsg(' ');

    Axios.all([Axios.post('https://voluntutorcloud-server.herokuapp.com/updateMsg', {
      username: tmpChtRm.current[0].username,
      studentname: tmpChtRm.current[0].studentname,
      msg: tmpCurMsg,
      sender: 'T',
      sendtime: curTime,
      isread: false,
    }), Axios.post('https://voluntutorcloud-server.herokuapp.com/addNotif', {
      username: tmpChtRm.current[0].studentname,
      type: '/message',
      title: 'Message',
      content: tmpChtRm.current[0].username + ' has sent a message',
      isnew: true,
    })]).then(Axios.spread((response, response2) => {
      console.log(response.data, response2.data);
      let tmpAllMsg = allMsg
      for (let i = 0; i < tmpAllMsg.length; i++) {
        if (tmpAllMsg[i] === tmpChtRm.current) {
          tmpAllMsg[i].push({
            username: tmpChtRm.current[0].username,
            studentname: tmpChtRm.current[0].studentname,
            msg: tmpCurMsg,
            sender: 'T',
            sendtime: curTime,
            isread: false,
          })
          setCurMsg('');
        }
      }

      setCurMsg('');
      setAllMsg(tmpAllMsg)
    }))
  }

  if (isLoading) {
    return <Loading />
  } else {
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
              {allMsg.map((chtRm, ind) => {
                if (ind === index.current) {
                  tmpChtRm.current = chtRm
                  console.log("tmpChtRm.current = chtRm");
                }
                console.log("tmpChtRm.current = ", tmpChtRm.current)
                return (
                  <div
                    className="shadowing"
                    onClick={() => {
                      index.current = ind
                      console.log("index.current = ind")
                      tmpChtRm.current = allMsg[index.current]
                      console.log("tmpChtRm.current = allMsg[index.current]")
                    }}
                  >
                    <div className="outerbox">
                      <div className="imagemsg">
                        <FaUser className="msg_icon" />
                      </div>
                      <div className="infoboxmsg">
                        <div className="namemsg">{chtRm[0].studentname}</div>
                        <div className="latestmsg">
                          {chtRm[chtRm.length - 1].msg.substring(0, 8)}
                          {chtRm[chtRm.length - 1].msg.length > 8 ? '...' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="chatcontent">
            <div className="chatname">{tmpChtRm.current[0].studentname}</div>
            <div className="chat">
              {tmpChtRm.current.map((msg) => {
                return (
                  <Msg_user
                    time={msg.sendtime}
                    type={msg.sender === 'T' ? 'user' : 'recipient'}
                    text={msg.msg}
                    read={msg.isread}
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

export default Msg
