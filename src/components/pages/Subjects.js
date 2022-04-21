import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Grid from '../Grid'
// import C_Grid from '../C_Grid'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';


function Subjects(props) {
  const [subject, setSubject] = useState("")
  const location = useLocation()
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(location.state) {
      setSubject(location.state.subject);
    }
    setLoading(false);
  }, [location.state])

  if(isLoading) {
    return (
      <>
        <Navbar></Navbar>
        <Footer></Footer>
      </>
    )
  } else {
    return (
      <>
        <Navbar></Navbar>
        <Grid sub={subject}></Grid>
        <Footer></Footer>
      </>
    )
  }
}

export default Subjects
