import React, { useState, useEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { MdOutlineArrowForwardIos, MdArrowBackIos } from 'react-icons/md'
import './Msg.css'
import '../App.css'
import { Msg_recipient } from './Msg_recipient'
import Loading from './Loading'
import { Msg_user } from './Msg_user'
import { FaUser } from 'react-icons/fa'
import Axios from 'axios'

function Msg() {
  // 4 main variables
  const [num, setnum] = useState([]);
  const [studentnamelist, setstudentnamelist] = useState([]);
  const [latestmsglist, setlatestmsglist] = useState([]);
  const [allMsgRec, setAllMsgRec] = useState([]);
  // 4 main variables
  
  const [status, setStatus] = useState(0)
  let username = '',
    studentname = '',
    teacherusername = ''
  const [curMsg, setCurMsg] = useState('')
  const [msgRec, setMsgRec] = useState([])
  let msgStr = ''
  const [msgForUpd, setMsgForUpd] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [hasProcessMsg, setHasProcessMsg] = useState(false)
  const [usernameConst, setUsernameConst] = useState('')
  const [studentnameConst, setStudentnameConst] = useState('')
  const [lastestMsg, setLastestMsg] = useState('')
  const [contactInfo, setContactInfo] = useState([])
  const [chosenContact, setChosenContact] = useState({})
  const [selectedstudent, setselectedstudent] = useState(0)
  const [count, setCount] = useState(0);
  // T:asdfasfasdfψS:Let's book a meetψT:omg hi long time no seeψT:HiψT:Sure!!!ψT:See you then!ψT:Sure!!ψS:I am okay with the timeψS:Yes, can we have a meeting then?ψT:Are you available next Tuesday?
  var tempmsgRec = [];

  function processMsg(msgStr, username, studentname) {
    setMsgRec([])
    setLastestMsg('')
    console.log(msgStr)
    if (msgStr != '') {
      const msgInfo = msgStr.split('ψ')
      console.log('msgInfo')
      console.log(msgInfo)
      console.log(msgInfo.length, tempmsgRec.length)
      if (tempmsgRec.length != msgInfo.length) {
        console.log('has entered tempmsgRec construction condition')
        for (let i = 0; i < msgInfo.length - 1; i++) {
          const category = msgInfo[i].split('|')
          if (i == 0) {
            setLastestMsg(category[1])
            setlatestmsglist(latestmsglist => [...latestmsglist, category[1]]);
          }
          let t = ''
          t = category[0] == 'T' ? 'user' : 'recipient'
          if (category[1] == '') continue
          let msg = { type: t, text: category[1] }
          console.log(msg)
          setMsgRec((msgRec) => [msg, ...msgRec])
          tempmsgRec.unshift(msg);
        }
      } else {
        setMsgRec(msgRec.slice(0, msgInfo.length - 1))
        tempmsgRec = tempmsgRec.slice(0, msgInfo.length - 1);
      }
    } else {
      setMsgRec([])
      tempmsgRec = [];
      setLastestMsg('')
      setlatestmsglist(latestmsglist => [...latestmsglist, '']);
    }
    setAllMsgRec(allMsgRec => [...allMsgRec, tempmsgRec]);
    console.log("has added ", tempmsgRec, " to allMsgRec");
    setMsgRec([])
    tempmsgRec = [];
    console.log(teacherusername, studentname)
    setUsernameConst(username)
    setStudentnameConst(studentname)
    setMsgForUpd(msgStr)
    setHasProcessMsg(true)
    setCount(count - 1);
  }

  const updateMsg = () => {
    let msg = { type: 'user', text: curMsg }
    setCurMsg('')
    setMsgRec((msgRec) => [...msgRec, msg])
    msgStr += 'T|' + curMsg + 'ψ'
    console.log(msgStr)
    let tempMsgForUpd = msgStr + msgForUpd
    console.log('lastestMsg')
    console.log(lastestMsg)
    setLastestMsg(curMsg)
    if (msgForUpd == '') {
      Axios.post('https://voluntutorcloud-server.herokuapp.com/createMsg', {
        username: usernameConst,
        studentname: studentnameConst,
        msg: tempMsgForUpd,
      }).then((response) => {
        console.log(response)
      })
    } else {
      Axios.post('https://voluntutorcloud-server.herokuapp.com/updateMsg', {
        username: usernameConst,
        studentname: studentnameConst,
        msg: tempMsgForUpd,
      }).then((response) => {
        console.log(response)
      })
    }
    let content = usernameConst + ' has sent a message'
    console.log(content, content)
    Axios.post('https://voluntutorcloud-server.herokuapp.com/addNotif', {
      username: studentnameConst,
      type: '/message',
      title: 'Message',
      content: content,
      isnew: true,
    }).then((response) => {
      console.log(response)
    })
    setMsgForUpd(tempMsgForUpd)
  }

  useEffect(() => {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
        (response) => {
          username = response.data.user[0].username
          if (response.data.user[0].lang == 'chinese') setStatus(1)
          else setStatus(0)
          Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/findContact',
            {
              username: username,
            },
          ).then((response) => {
            setContactInfo(response.data)
            setCount(response.data.length);
            setChosenContact(response.data[0])
            if (response.data.length == 2) {
              setMultistudentname([response.data[1].studentname])
            }
            console.log(response.data)
            studentname = response.data[0].studentname
            console.log('username, studentname: ')
            console.log(username, studentname)
            for(let i = 0; i < response.data.length; i++) {
              console.log("into loop")
              console.log(i, " ", studentname)
              setnum(num => [...num, i]);
              console.log("after setting number")
              studentname = response.data[i].studentname;
              console.log("after setting student name")
              setstudentnamelist(studentnamelist => [...studentnamelist, studentname]);
              console.log("studentname: ", studentname);
              if (!hasProcessMsg) {
                Axios.post(
                  'https://voluntutorcloud-server.herokuapp.com/getMsg',
                  {
                    username: username,
                    studentname: studentname,
                  },
                ).then((response) => {
                  if (response.data.length) msgStr = response.data[0].msg
                  console.log(msgStr)
                  processMsg(msgStr, username, studentname)
                  // console.log(tempmsgRec)
                })
              }
            }
          })
        },
      )
  })

  let a = ['Function will be completed soon', '此功能即將完成，請敬請期待！']

  let b = ['Find friends', '尋找朋友']
  let c = ['Enter your message...', '請輸入訊息...']
  let d = ['send', '傳送']

  const [nameclick, setnameclick] = useState(false)

  function multistyle() {
    console.log('into function')
    console.log(multistudentname)
    if (multistudentname.length == 0) {
      return <div></div>
    } else {
      console.log(multistudentname[0])
      return (
        <div className={nameclick ? 'choosekidsmsg active' : 'choosekidsmsg'}>
          <div className="multi">
            <div
              className="borderstudent"
              onClick={() => updateMultistudentname(multistudentname[0])}
            >
              {multistudentname[0]}
            </div>
          </div>
          {nameclick ? (
            <MdArrowBackIos
              className="kidicon"
              onClick={() => {
                setnameclick(!nameclick)
              }}
            ></MdArrowBackIos>
          ) : (
            <MdOutlineArrowForwardIos
              className="kidicon"
              onClick={() => {
                setnameclick(!nameclick)
              }}
            ></MdOutlineArrowForwardIos>
          )}
        </div>
      )
    }
  }

  const [multistudentname, setMultistudentname] = useState([])

  let tempstudentname = ''
  const updateMultistudentname = (e) => {
    console.log(e)
    if (e == contactInfo[1].studentname) {
      console.log('zero change to one')
      setMultistudentname([contactInfo[0].studentname])
      tempstudentname = contactInfo[1].studentname
    } else {
      console.log('one change to zero')
      setMultistudentname([contactInfo[1].studentname])
      tempstudentname = contactInfo[0].studentname
    }
    setStudentnameConst(e)

    console.log(tempstudentname)
    setMsgRec([])

    Axios.post('https://voluntutorcloud-server.herokuapp.com/getMsg', {
      username: usernameConst,
      studentname: tempstudentname,
    }).then((response) => {
      if (response.data.length) msgStr = response.data[0].msg
      console.log(msgStr)
      setMsgRec([])
      processMsg(msgStr, usernameConst, tempstudentname)
      setLoading(false)
    })
  }

  if (count != 0) {
    return <Loading />
  } else {
    // here
    console.log(num);
    console.log(allMsgRec);
    console.log(studentnamelist);
    console.log(latestmsglist);
    // here

    console.log(usernameConst, studentname)
    console.log()

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
              {num.map((e) => {
                return (
                  <div className="shadowing" onClick={setselectedstudent(e)}>
                    <div className="outerbox">
                      <div className="imagemsg">
                        <FaUser className="msg_icon" />
                      </div>
                      <div className="infoboxmsg">
                        <div className="namemsg">{studentnamelist[e]}</div>
                        <div className="latestmsg">{latestmsglist[e]}</div>
                      </div>
                      {/* <div className="align">
                      <div className="numbermsg">1</div>
                    </div> */}
                    </div>
                  </div>
                )
              })}
            </div>
            {multistyle()}
          </div>
          <div className="chatcontent">
            <div className="chatname">{studentnamelist[selectedstudent]}</div>
            <div className="chat">
              {allMsgRec[selectedstudent].map((r) => {
                return <Msg_user type={r.type} text={r.text}></Msg_user>
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
              <div className="sendword" onClick={updateMsg}>
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