import React, { useState, useEffect } from 'react'
import './Admin_appointment.css'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import Loading from './Loading'

export default function Admin_appointment() {
  const navigate = useNavigate()
  const date = [
    '9/1',
    '9/4',
    '9/5',
    '9/11',
    '9/12',
    '9/18',
    '9/19',
    '9/25',
    '9/26',
    '10/2',
    '10/3',
    '10/9',
    '10/10',
    '10/16',
    '10/17',
    '10/23',
    '10/24',
    '10/30',
    '10/31',
  ]

  const [student1, setstudent1] = useState([
    {
      pair: '老師1 - 學生1',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
    {
      pair: '老師2 - 學生2',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
    {
      pair: '老師3 - 學生3',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
  ])
  const [student2, setstudent2] = useState([
    {
      pair: '老師1 - 學生1',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
    {
      pair: '老師2 - 學生2',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
    {
      pair: '老師3 - 學生3',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
  ])
  const [student3, setstudent3] = useState([
    {
      pair: '老師1 - 學生1',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
    {
      pair: '老師2 - 學生2',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
    {
      pair: '老師3 - 學生3',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
  ])
  const [student4, setstudent4] = useState([
    {
      pair: '老師1 - 學生1',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
    {
      pair: '老師2 - 學生2',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
    {
      pair: '老師3 - 學生3',
      first: '準時',
      second: '遲到五到十分鐘',
      third: '準時',
      fourth: '未上課',
      fifth: '準時',
      sixth: '準時',
      seventh: '遲到五到十分鐘',
      eighth: '準時',
      ninth: '未上課',
      tenth: '準時',
    },
  ])

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

  const [isLoading, setLoading] = useState(true)
  const [stpair, setStpair] = useState([])
  const [servHr, setServHr] = useState([])

  useEffect(() => {
    Axios.post(
      'https://voluntutorcloud-server.herokuapp.com/findAllContact',
    ).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let tempStpair = response.data[i]
        setStpair((stpair) => [...stpair, tempStpair])
        console.log(tempStpair)
        Axios.post('https://voluntutorcloud-server.herokuapp.com/getRecord', {
          username: tempStpair.username,
          studentname: tempStpair.studentname,
          studentmail: tempStpair.studentmail,
          echelon: 2,
        }).then((response) => {
          console.log(response.data)
          let recData = response.data
          let hr = 0;
          for(let i = 0; i < response.data.length; i++) {
            hr += response.data[i].duration;
            console.log(response.data[i].duration);
          }

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
              setServHr(servHr => [...servHr, {name: response.data[0].lastname + response.data[0].firstname, hr: hr}]);
              if (school == '大溪國小')
                setDs((ds) => [
                  ...ds,
                  {
                    teacher:
                      response.data[0].lastname + response.data[0].firstname,
                    studentname: tempStpair.studentname,
                    data: recData,
                  },
                ])
              else if (school == '廣興國小')
                setGx((gx) => [
                  ...gx,
                  {
                    teacher:
                      response.data[0].lastname + response.data[0].firstname,
                    studentname: tempStpair.studentname,
                    data: recData,
                  },
                ])
              else if (school == '溫泉國小')
                setWc((wc) => [
                  ...wc,
                  {
                    teacher:
                      response.data[0].lastname + response.data[0].firstname,
                    studentname: tempStpair.studentname,
                    data: recData,
                  },
                ])
              else if (school == '崁頂國小')
                setCd((cd) => [
                  ...cd,
                  {
                    teacher:
                      response.data[0].lastname + response.data[0].firstname,
                    studentname: tempStpair.studentname,
                    data: recData,
                  },
                ])
            })
          })
        })
      }
      setLoading(false)
    })
  }, [])

  if (isLoading) {
    return <Loading />
  } else {
    console.log(servHr);
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
            navigate('/adminuser')
          }}
        >
          查看註冊資料
        </div>
        <div
          className="backtosignin"
          onClick={() => {
            navigate('/adminbook')
          }}
        >
          查看會議預約
        </div>
        <div className="admin_title">會議記錄表</div>
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
                      {rec.classdate} :{' '}
                      {trans[rec.studentabsence]
                        ? trans[rec.studentabsence]
                        : rec.studentabsence}
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
                      {rec.classdate} :{' '}
                      {trans[rec.studentabsence]
                        ? trans[rec.studentabsence]
                        : rec.studentabsence}
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
                      {rec.classdate} :{' '}
                      {trans[rec.studentabsence]
                        ? trans[rec.studentabsence]
                        : rec.studentabsence}
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
                      {rec.classdate} :{' '}
                      {trans[rec.studentabsence]
                        ? trans[rec.studentabsence]
                        : rec.studentabsence}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className="subtitle">義方國小</div>
        {/* <div className="chart">
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
                      {rec.classdate} :{' '}
                      {trans[rec.studentabsence]
                        ? trans[rec.studentabsence]
                        : rec.studentabsence}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div> */}
        <div className="subtitle">東成國小</div>
        {/* <div className="chart">
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
                      {rec.classdate} :{' '}
                      {trans[rec.studentabsence]
                        ? trans[rec.studentabsence]
                        : rec.studentabsence}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div> */}
      </div>
    )
  }
}
