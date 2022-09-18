import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './components/fonts.css'
import Home from './components/pages/Home'
import SignIn from './components/pages/SignIn'
import Register from './components/pages/Register'
import Subjects from './components/pages/Subjects'
import MyList from './components/pages/MyFavList'
import Admin_pair from './components/pages/Admin_pairing'
import Profile from './components/pages/Profile'
import Admin_user from './components/pages/Admin_users'
import Appointment from './components/pages/Appointment'
import Admin from './components/pages/Admin'
import Program_usage from './components/pages/Program_usage'
import Book from './components/pages/Book'
import Admin_bookings from './components/pages/Admin_bookings'
import Student_portfolio from './components/pages/Student_portfolio'
import Message from './components/pages/Message'
import FAQ from './components/pages/FAQ'
import Studymat from './components/pages/Study'
import 'font-awesome/css/font-awesome.min.css'

function App() {
  useEffect(() => {
    document.title = 'VolunTutor Cloud'
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/sign-in" element={<SignIn />}></Route>
          <Route exact path="/subjects" element={<Subjects />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/mylist" element={<MyList />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/appointment" element={<Appointment />}></Route>
          <Route exact path="/book" element={<Book />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route exact path="/pair" element={<Admin_pair />}></Route>
          <Route exact path="/studymat" element={<Studymat />}></Route>
          <Route exact path="/adminbook" element={<Admin_bookings />}></Route>
          <Route exact path="/adminuser" element={<Admin_user />}></Route>
          <Route exact path="/faq" element={<FAQ />}></Route>
          <Route
            exact
            path="/program_usage"
            element={<Program_usage />}
          ></Route>
          <Route
            exact
            path="/Student_portfolio"
            element={<Student_portfolio />}
          ></Route>
          <Route exact path="/message" element={<Message />}></Route>
        </Routes>

        {/* <Footer></Footer> */}
      </Router>
    </div>
  )
}

export default App
