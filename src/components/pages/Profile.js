import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Prof from '../Profile_user'
import S_Prof from '../S_Profile_user'
import Loading from '../Loading'
import S_Navbar from '../S_Navbar'

export default function Profile() {
  const [role, setRole] = useState("");
  const [lang, setLang] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [portfolio, setPortfolio] = useState({});

  useEffect(() => {

    if(isLoading) {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
          console.log(response.data.user[0]);
          setRole(response.data.user[0].role);
          setLang(response.data.user[0].lang);
          setProfile(response.data.user[0]);
          console.log(response.data.user[0].lastname + response.data.user[0].firstname);
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getProfolio', {
            name: response.data.user[0].lastname + response.data.user[0].firstname,
          }).then((response) => {
            setPortfolio(response.data[0]);
            setLoading(false);
          })
        }
      )
    }
  })

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    )
  } else {
    if (role == 'teacher') {
      console.log(lang, profile);
      return (
        <>
          <Navbar lang={lang} isLoggedIn={true}></Navbar>
          <Prof profile={profile}></Prof>
          <Footer lang={lang}></Footer>
        </>
      )
    } else {
      console.log(lang, portfolio);
      return (
        <>
          <S_Navbar lang={lang} isLoggedIn={true}></S_Navbar>
          <S_Prof profile={profile} portfolio={portfolio}></S_Prof>
          <Footer lang={lang}></Footer>
        </>
      )
    }
  }
}
