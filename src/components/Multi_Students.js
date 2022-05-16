import React, { useEffect, useState } from 'react'
import './Multi_Students.css'
import { MdOutlineArrowForwardIos, MdArrowBackIos } from 'react-icons/md'
export default function Multi_Students() {
  const [nameclick, setnameclick] = useState(false)
  let student = ['李曉明']
  return (
    <div className={nameclick ? 'choosekid active' : 'choosekid'}>
      <div className="multi">
        {student.map((e) => {
          return <div className="borderstudent">{e}</div>
        })}
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
