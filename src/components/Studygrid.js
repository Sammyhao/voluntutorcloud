import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Studymat.css'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
export const Studygrid = ({ studymt, status }) => {
  console.log(studymt)
  console.log(studymt.school)
  let a = ['Open File', '打開檔案']
  let b = ['Materials', '教材']
  const openlink = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card className="studymatbox" justify="space-between">
        <CardContent>
          <div className="publisher">
            {studymt.publisher}
            {studymt.subject}
            {b[status]}
          </div>
          <div className="schoolstudy">
            {studymt.school.map((e) => {
              return <div className="schoollist">{e}</div>
            })}
          </div>
          <div className="tagswrap">
            <div className="tagsstudy">{studymt.grade}</div>
            <div className="tagsstudy">{studymt.chapterDesc}</div>
          </div>
          <div className="openfilestudy" onClick={() => openlink(studymt.link)}>
            {a[status]}
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}
