import React, { useState, useEffect } from 'react'
import { MenuItems } from './MenuItems'
import { Link } from 'react-router-dom'
import './Dropdown.css'
import { GrFavorite } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { IoLogOut } from 'react-icons/io5'
import { AiOutlineHistory } from 'react-icons/ai'
import Axios from 'axios'

function Dropdown() {
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

  const logout = (functionName) => {
    if(functionName == "logout")
    Axios.post("http://localhost:3010/logout").then((response) => {
      console.log(response);
    })
  }

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
export default Dropdown
