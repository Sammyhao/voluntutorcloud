import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Studymat.css'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
export const Studygrid = ({ studymt }) => {
  console.log(studymt)

  const openlink = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card className="studymatbox" justify="space-between">
        <CardContent>
          <div className="publisher">
            {studymt.publisher}
            {studymt.subject}教材
          </div>
          <div className="schoolstudy">{studymt.school}</div>
          <div className="tagswrap">
            <div className="tagsstudy">{studymt.grade}</div>
            <div className="tagsstudy">{studymt.chapterDesc}</div>
          </div>
          <div className="openfilestudy" onClick={() => openlink(studymt.link)}>Open File</div>
        </CardContent>
      </Card>
    </Grid>
  )
}
