import React, { useState, useEffect } from 'react'
import './Admin_appointment.css'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import Loading from './Loading'

export default function Admin_booking() {
  const navigate = useNavigate()

  const [contactInfo, setContactInfo] = useState([])

  var trans = {}
  trans['On time (online within 5 minutes)'] = '準時'
  trans['準時上課（五分鐘內到達）'] = '準時'
  trans['Late for 6~10 minutes'] = '遲到六到十分鐘'
  trans['Late for 11~15 minutes'] = '遲到十一到十五分鐘'
  trans['Late for 16~30 minutes'] = '遲到十六到三十分鐘'
  trans['Late for over 30 minutes'] = '未上課'
  trans['遲到超過三十分鐘'] = '未上課'

  const [ds, setDs] = useState([])
  const [gx, setGx] = useState([])
  const [wc, setWc] = useState([])
  const [cd, setCd] = useState([])
  const [yf, setYf] = useState([])
  const [dc, setDc] = useState([])

  const [isLoading, setLoading] = useState(true)
  const [stpair, setStpair] = useState([])

  // useEffect(() => {
  //   setDs([
  //     {
  //       teacher: '張曉明',
  //       studentname: '王曉明',
  //       data: ['09/20 18:00', '09/27 19:00'],
  //     },
  //   ])
  //   setGx([
  //     {
  //       teacher: '張曉明',
  //       studentname: '王曉明',
  //       data: ['09/20 18:00', '09/27 19:00'],
  //     },
  //   ])
  //   setWc([
  //     {
  //       teacher: '張曉明',
  //       studentname: '王曉明',
  //       data: ['09/20 18:00', '09/27 19:00'],
  //     },
  //   ])
  //   setCd([
  //     {
  //       teacher: '張曉明',
  //       studentname: '王曉明',
  //       data: ['09/20 18:00', '09/27 19:00'],
  //     },
  //   ])

  //   setYf([
  //     {
  //       teacher: '張曉明',
  //       studentname: '王曉明',
  //       data: ['09/20 18:00', '09/27 19:00'],
  //     },
  //   ])

  //   setDc([
  //     {
  //       teacher: '張曉明',
  //       studentname: '王曉明',
  //       data: ['09/20 18:00', '09/27 19:00'],
  //     },
  //   ])
  // }, [])

  function fillInData(data) {
    let outputArr = [];
    for(let i = 0; i < data.length; i++) {
      outputArr.push(data[i].date + " " + data[i].time);
    }
    console.log(outputArr);
    return outputArr;
  }

  useEffect(() => {
    Axios.post(
      'https://voluntutorcloud-server.herokuapp.com/findAllContact',
    ).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let tempStpair = response.data[i]
        setStpair((stpair) => [...stpair, tempStpair])
        console.log(tempStpair)
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getBooking', {
          username: tempStpair.username,
          studentname: tempStpair.studentname,
          status: 'confirmed',
        }).then((bookingResponse) => {
          console.log(bookingResponse.data)
          // recData.sort((a, b) => {return a.classdate - b.classdate})
          Axios.post(
            'https://voluntutorcloud-server.herokuapp.com/getProfolio',
            {
              name: tempStpair.studentname,
            },
          ).then((response) => {
            let school = response.data[0].school
            console.log(school)
            Axios.post(
              'https://voluntutorcloud-server.herokuapp.com/getUserProfile',
              {
                username: tempStpair.username,
              },
            ).then((response) => {
              console.log(response.data)
              if (school === '大溪國小')
                setDs((ds) => [
                  ...ds,
                  {
                    teacher:
                      response.data[0].lastname + response.data[0].firstname,
                    studentname: tempStpair.studentname,
                    data: fillInData(bookingResponse.data),
                  },
                ])
              else if (school === '廣興國小')
                setGx((gx) => [
                  ...gx,
                  {
                    teacher:
                      response.data[0].lastname + response.data[0].firstname,
                    studentname: tempStpair.studentname,
                    data: fillInData(bookingResponse.data),
                  },
                ])
              else if (school === '溫泉國小')
                setWc((wc) => [
                  ...wc,
                  {
                    teacher:
                      response.data[0].lastname + response.data[0].firstname,
                    studentname: tempStpair.studentname,
                    data: fillInData(bookingResponse.data),
                  },
                ])
              else if (school === '崁頂國小')
                setCd((cd) => [
                  ...cd,
                  {
                    teacher:
                      response.data[0].lastname + response.data[0].firstname,
                    studentname: tempStpair.studentname,
                    data: fillInData(bookingResponse.data),
                  },
                ])
            })
          })
        })
      }
      setLoading(false)
    })
  }, [])

  return (
    <div className="admin_wrap">
      <div
        className="backtosignin"
        onClick={() => {
          navigate('/sign-in')
        }}
      >
        回到登入頁面
      </div>
      <div
        className="backtosignin"
        onClick={() => {
          navigate('/pair')
        }}
      >
        查看學生老師配對
      </div>

      <div
        className="backtosignin"
        onClick={() => {
          navigate('/admin')
        }}
      >
        查看會議記錄表
      </div>
      <div className="admin_title">會議預約表</div>
      <div className="subtitle">大溪國小</div>
      <div className="chart">
        {ds.map((e, ind) => {
          let data = e.data
          return (
            <div className="admin_chart">
              <div className="content" key={ind}>
                {e.teacher} - {e.studentname}
              </div>
              {data.map((rec, i) => {
                return (
                  <div className="content" key={i}>
                    {rec}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="subtitle">廣興國小</div>
      <div className="chart">
        {gx.map((e, ind) => {
          let data = e.data
          return (
            <div className="admin_chart">
              <div className="content" key={ind}>
                {e.teacher} - {e.studentname}
              </div>
              {data.map((rec, i) => {
                return (
                  <div className="content" key={i}>
                    {rec}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className="subtitle">溫泉國小</div>
      <div className="chart">
        {wc.map((e, ind) => {
          let data = e.data
          return (
            <div className="admin_chart">
              <div className="content" key={ind}>
                {e.teacher} - {e.studentname}
              </div>
              {data.map((rec, i) => {
                return (
                  <div className="content" key={i}>
                    {rec}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className="subtitle">崁頂國小</div>
      <div className="chart">
        {cd.map((e, ind) => {
          let data = e.data
          return (
            <div className="admin_chart">
              <div className="content" key={ind}>
                {e.teacher} - {e.studentname}
              </div>
              {data.map((rec, i) => {
                return (
                  <div className="content" key={i}>
                    {rec}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="subtitle">義方國小</div>
      <div className="chart">
        {yf.map((e, ind) => {
          let data = e.data
          return (
            <div className="admin_chart">
              <div className="content" key={ind}>
                {e.teacher} - {e.studentname}
              </div>
              {data.map((rec, i) => {
                return (
                  <div className="content" key={i}>
                    {rec}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="subtitle">東成國小</div>
      <div className="chart">
        {dc.map((e, ind) => {
          let data = e.data
          return (
            <div className="admin_chart">
              <div className="content" key={ind}>
                {e.teacher} - {e.studentname}
              </div>
              {data.map((rec, i) => {
                return (
                  <div className="content" key={i}>
                    {rec}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
