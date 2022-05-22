import React, { useState, useEffect } from 'react'
import '../../App.css'
import Axios from 'axios'
import Footer from '../Footer'
import Navbar from '../Port_nav'
import Port from '../Portfolio'
import S_Navbar from '../S_Port_nav'
import S_Port from '../S_Portfolio'
import Loading from '../Loading'

export default function Student_portfolio() {
  const [role, setRole] = useState("");
  const [lang, setLang] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [contactInfo, setContactInfo] = useState([]);
  const [studentProfolio, setStudentProfolio] = useState([])
  const [multistudentname, setMultistudentname] = useState([]);
  
  let username = "";

  
  useEffect(() => {
    if(isLoading) {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
        (response) => {
          console.log(response.data);
          if(!response.data.isLoggedIn) {
            setIsLoggedIn(false);
            setLoading(false);
          }else{
            username = response.data.user[0].username;
            setRole(response.data.user[0].role);
            setLang(response.data.user[0].lang);
            if(response.data.user[0].role == "teacher") {
              Axios.post('https://voluntutorcloud-server.herokuapp.com/findContact', {
                username: username,
              }).then((response) => {
                console.log(response.data)
                setContactInfo(response.data);
                if(response.data.length == 2) { setMultistudentname([response.data[1].studentname]) }
                setStudentProfolio([]);
                let size = response.data.length;
                for (let i = 0; i < response.data.length; i++) {
                  console.log(response.data[i].studentname);
                  Axios.post('https://voluntutorcloud-server.herokuapp.com/getProfolio', {
                    name: response.data[i].studentname,
                  }).then((response) => {
                    console.log(response.data);
                    setStudentProfolio((studentProfolio) => [
                      ...studentProfolio,
                      response.data,
                    ])
                    if(i == size - 1) setLoading(false);
                  })
                }
              })
            } else {
              setLoading(false);
            }
          }
        }
      )
    }
  })
  
  if(isLoading) {
    return(
      <>
      <Loading/>
      </>
    )

  } else{
    console.log(studentProfolio);
    if (role == "teacher") {
      return (
        <>
        <Navbar></Navbar>
        <Port lang={lang} contactInfo={contactInfo} portfolio={studentProfolio} multistudentname={multistudentname}></Port>
        <Footer lang={lang}></Footer>
      </>
      )
    } else {
      return (
        <>
        <S_Navbar></S_Navbar>
        <S_Port></S_Port>
        <Footer></Footer>
      </>
      )
    }
  }
  
}
