import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Studymat.css'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
export const Studygrid = ({ studymt }) => {
  console.log(studymt)
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
          <a className="linkstudy" href={studymt.link}>
            <div className="openfilestudy">Open File</div>
          </a>
        </CardContent>
      </Card>
    </Grid>
  )
}
