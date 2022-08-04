import React, { useState, useEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { MdOutlineArrowForwardIos, MdArrowBackIos } from 'react-icons/md'
import './Msg.css'
import '../App.css'
import Loading from './Loading'
import { Msg_user } from './Msg_user'
import { FaUser } from 'react-icons/fa'
import Axios from 'axios'
import { useSelector } from 'react-redux'

function Msg() {
  let num = [1]
  const [status, setStatus] = useState(1)
  let username = '',
    studentname = '',
    teacherusername = ''
    let tempstudentname = ''
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
  const [multistudentname, setMultistudentname] = useState([])
  const [nameclick, setnameclick] = useState(false)

  let a = ['Function will be completed soon', '此功能即將完成，請敬請期待！']

  let b = ['Find friends', '尋找朋友']
  let c = ['Enter your message...', '請輸入訊息...']
  let d = ['send', '傳送']

  const [allMsg, setAllMsg] = useState([]);

  useEffect(() => {
    console.log("user: ", user);
    setStatus(user.language);
    setAllMsg([]);
    Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
      username: user.username,
    }).then((response1) => {
      console.log(user.username, "'s contact includes: ", response1.data);
      for(let i = 0; i < response1.data.length; i++) {
        username = response1.data[i].username;
        studentname = response1.data[i].studentname;
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getMsg', {
          username: response1.data[i].username,
          studentname: response1.data[i].studentname,
        }).then((response2) => {
          console.log("Record of ", username, " and ", studentname, " : ", response2.data);
          if(response2.data.length) setAllMsg(allMsg => [...allMsg, response2.data]);
          else setAllMsg(allMsg => [...allMsg, [{username: username, studentname: studentname, msg: "", sender: "T"}]])
          if(i === response1.data.length - 1) setLoading(false);
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  const [rerender, setRerender] = useState(false);

  let tmpChtRm = [];

  const updateMsg = () => {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/updateMsg', {
      username: tmpChtRm[0].username,
      studentname: tmpChtRm[0].studentname,
      msg: curMsg,
      sender: "T"
    }).then((response) => {
      console.log(response.data);
      let tmpAllMsg = allMsg;
      for(let i = 0; i < tmpAllMsg.length; i++) {
        if(tmpAllMsg[i] === tmpChtRm) {
          tmpAllMsg[i].push({
            username: tmpChtRm[0].username,
            studentname: tmpChtRm[0].studentname,
            msg: curMsg,
            sender: "T"
          });
        }
      }
      setAllMsg(tmpAllMsg);
    })
    setTimeout(()=>setCurMsg(""),1)
  }

  const user = useSelector((state) => state.user.value)

  if (isLoading) {
    return <Loading />
  } else {
    console.log(allMsg);
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
                tmpChtRm = chtRm;
                return (
                  <div className="shadowing">
                    <div className="outerbox">
                      <div className="imagemsg">
                        <FaUser className="msg_icon" />
                      </div>
                      <div className="infoboxmsg">
                        <div className="namemsg">{chtRm[0].studentname}</div>
                        <div className="latestmsg">{chtRm[chtRm.length-1].msg}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="chatcontent">
            <div className="chatname">{tmpChtRm[0].studentname}</div>
            <div className="chat">
              {tmpChtRm.map((msg) => {
                return <Msg_user type={(msg.sender==="T") ? "user" : "recipient"} text={msg.msg}></Msg_user>
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