import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './Cards.css'
import CardItemTutor from './CardItem_tutor'
import CardItem from './CardItem'

function Cards() {
  const [status, setStatus] = useState(1)
  let username = ''
  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login')
      .then((response) => {
        username = response.data.user[0].username
        return Axios.post(
          'https://voluntutorcloud-server.herokuapp.com/getLang',
          { username: username },
        )
      })
      .then((response) => {
        console.log(response.data)
        if (response.data == 'chinese') setStatus(1)
        else setStatus(0)
        console.log(status)
      })
  })
  let a = ['Choose A Program!', '選擇一個志工計畫！']
  return (
    <div className="cards">
      <h1 className="cardsTitle">{a[status]}</h1>
      <div className="cards__container_tutor">
        <div className="cards__wrapper_tutor">
          <ul className="cards__items">
            <CardItemTutor
              src="https://images.unsplash.com/photo-1486303954368-398fea0e72cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              text="Chinese"
              path="/Subjects"
            />
            <CardItemTutor
              src="https://images.unsplash.com/photo-1502570149819-b2260483d302?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              text="Math"
              path="/Subjects"
            />
            <CardItemTutor
              src="https://images.unsplash.com/photo-1597742200037-aa4d64d843be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              text="English"
              path="/Subjects"
            />
          </ul>
          <ul className="cards__items">
            <CardItemTutor
              src="https://images.unsplash.com/photo-1488628278511-2177a435414d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
              text="Social Studies"
              path="/Subjects"
            />
            <CardItemTutor
              src="/images/subject_science.png"
              text="Science"
              path="/Subjects"
            />
            <CardItemTutor
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              text="Computer"
              path="/Subjects"
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
