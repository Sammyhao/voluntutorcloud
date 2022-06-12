import React, { useEffect, useState } from 'react'
import './Studymat.css'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
export const Studygrid = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className="studymatbox" justify="space-between">
        <CardContent>
          <div className="publisher">翰林國語教材</div>
          <div className="schoolstudy">大溪國小</div>
          <div className="tagswrap">
            <div className="tagsstudy">一年級</div>
            <div className="tagsstudy">Ch1-5</div>
          </div>
          <div className="openfilestudy">Open File</div>
        </CardContent>
      </Card>
    </Grid>
  )
}
