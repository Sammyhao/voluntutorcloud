import React, { useState, useEffect } from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Loading from '../Loading'
import Studymat from '../Studymat'

export default function Study() {
    const [isLoading, setLoading] = useState(true);
    const [lang, setLang] = useState(""); // lang of the user
    useEffect(() => {
      Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
        (response) => {
          console.log(response.data);
          
            setLang(response.data.user[0].lang);
            setRole(response.data.user[0].role);
            setLoading(false);
          
        }
      )
    })
    if(isLoading) {
        return(
          <>
          <Loading/>
          </>
    )}else{
return(
    <>
    <Navbar lang={lang} isLoggedIn = {true}></Navbar>
    <Studymat></Studymat>
    <Footer lang = {lang}></Footer>
    </>
)}
}
