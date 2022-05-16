import React, { useEffect, useState } from 'react'
import './Multi_Students.css'
import { MdOutlineArrowForwardIos, MdArrowBackIos } from 'react-icons/md'

export const Multi_Students = ({ num, name}) => {
  const [nameclick, setnameclick] = useState(false)
  let student = [name]
  if(num==1){
    return(<div></div>)
  }else{
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
