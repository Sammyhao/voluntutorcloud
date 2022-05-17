import React, { useEffect, useState } from 'react'
import './Multi_Students.css'
import { MdOutlineArrowForwardIos, MdArrowBackIos } from 'react-icons/md'

export const Multi_Students = ({ num, text}) => {
  const [nameclick, setnameclick] = useState(false)
  let student = text
  if(num==1){
    console.log(num)
    return(<div></div>)
  }else{
    console.log(num)
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
  )}
}
