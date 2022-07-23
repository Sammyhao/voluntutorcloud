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

  const [contactInfo, setContactInfo] = useState([]);

  var trans = {};
  trans["On time (online within 5 minutes)"] = "準時";
  trans["準時上課（五分鐘內到達）"] = "準時";
  trans["Late for 6~10 minutes"] = "遲到六到十分鐘";
  trans["Late for 11~15 minutes"] = "遲到十一到十五分鐘";
  trans["Late for 16~30 minutes"] = "遲到十六到三十分鐘";
  trans["Late for over 30 minutes"] = "未上課";
  trans["遲到超過三十分鐘"] = "未上課";



  const [ds, setDs] = useState([]);
  const [gx, setGx] = useState([]);
  const [wc, setWc] = useState([]);
  const [cd, setCd] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [stpair, setStpair] = useState([]);

  useEffect(() => {
    Axios.post('https://voluntutorcloud-server.herokuapp.com/findAllContact').then((response) => {
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
            console.log(response.data);
            let recData = response.data;
            // recData.sort((a, b) => {return a.classdate - b.classdate})
            Axios.post('https://voluntutorcloud-server.herokuapp.com/getProfolio', {
              name: tempStpair.studentname,
            }).then((response) => {
              let school = response.data[0].school;
              console.log(school);
              Axios.post('https://voluntutorcloud-server.herokuapp.com/getUserProfile', {
                username: tempStpair.username,
              }).then((response) => {
                console.log(response.data);
                if(school == "大溪國小") setDs((ds) => [...ds, {teacher: response.data[0].lastname + response.data[0].firstname, studentname: tempStpair.studentname, data: recData}]);
                else if(school == "廣興國小") setGx((gx) => [...gx, {teacher: response.data[0].lastname + response.data[0].firstname, studentname: tempStpair.studentname, data: recData}]);
                else if(school == "溫泉國小") setWc((wc) => [...wc, {teacher: response.data[0].lastname + response.data[0].firstname, studentname: tempStpair.studentname, data: recData}]);
                else if(school == "崁頂國小") setCd((cd) => [...cd, {teacher: response.data[0].lastname + response.data[0].firstname, studentname: tempStpair.studentname, data: recData}]);
              })
            })
          })
        }
        setLoading(false)
    })
  }, [])


  if(isLoading) {
    return (
      <Loading/>
    )
  }

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
      <div className="admin_title">會議記錄表</div>
      <div className="subtitle">大溪國小</div>
      <div className="chart">
        {/* <div className="admin_chart">
          <div className="content">老師 - 學生</div>
          <div className="content">
            {date[0]}~{date[1]}
          </div>
          <div className="content">
            {date[2]}~{date[3]}
          </div>
          <div className="content">
            {date[4]}~{date[5]}
          </div>
          <div className="content">
            {date[6]}~{date[7]}
          </div>
          <div className="content">
            {date[8]}~{date[9]}
          </div>
        </div> */}
        {ds.map((e, ind) => {
          let data = e.data;
          return (
            <div className="admin_chart">
              <div className="content" key={ind}>{e.teacher} - {e.studentname}</div>
              {data.map((rec, i) => {
                return (<div className="content" key={i}>{rec.classdate} : {(trans[rec.studentabsence]) ? trans[rec.studentabsence] : rec.studentabsence}</div>)
              })}
            </div>
          )
        })}
      </div>
      {/* <div className="chart">
        <div className="admin_chart">
          <div className="content">老師 - 學生</div>
          <div className="content">
            {date[10]}~{date[11]}
          </div>
          <div className="content">
            {date[12]}~{date[13]}
          </div>
          <div className="content">
            {date[14]}~{date[15]}
          </div>
          <div className="content">
            {date[16]}~{date[17]}
          </div>
          <div className="content">{date[18]}</div>
        </div>
        {student1.map((e, ind) => {
          return (
            <div className="admin_chart">
              <div className="content">{e.pair}</div>
              <div className="content">{e.sixth}</div>
              <div className="content">{e.seventh}</div>
              <div className="content">{e.eighth}</div>
              <div className="content">{e.ninth}</div>
              <div className="content">{e.tenth}</div>
            </div>
          )
        })}
      </div> */}
       <div className="subtitle">廣興國小</div>
      <div className="chart">
        {/* <div className="admin_chart">
          <div className="content">老師 - 學生</div>
          <div className="content">
            {date[0]}~{date[1]}
          </div>
          <div className="content">
            {date[2]}~{date[3]}
          </div>
          <div className="content">
            {date[4]}~{date[5]}
          </div>
          <div className="content">
            {date[6]}~{date[7]}
          </div>
          <div className="content">
            {date[8]}~{date[9]}
          </div>
        </div> */}
        {gx.map((e, ind) => {
          let data = e.data;
          return (
            <div className="admin_chart">
              <div className="content" key={ind}>{e.teacher} - {e.studentname}</div>
              {data.map((rec, i) => {
                return (<div className="content" key={i}>{rec.classdate} : {(trans[rec.studentabsence]) ? trans[rec.studentabsence] : rec.studentabsence}</div>)
              })}
            </div>
          )
        })}
      </div>
      {/* <div className="chart">
        <div className="admin_chart">
          <div className="content">老師 - 學生</div>
          <div className="content">
            {date[10]}~{date[11]}
          </div>
          <div className="content">
            {date[12]}~{date[13]}
          </div>
          <div className="content">
            {date[14]}~{date[15]}
          </div>
          <div className="content">
            {date[16]}~{date[17]}
          </div>
          <div className="content">{date[18]}</div>
        </div>
        {student1.map((e, ind) => {
          return (
            <div className="admin_chart">
              <div className="content">{e.pair}</div>
              <div className="content">{e.sixth}</div>
              <div className="content">{e.seventh}</div>
              <div className="content">{e.eighth}</div>
              <div className="content">{e.ninth}</div>
              <div className="content">{e.tenth}</div>
            </div>
          )
        })}
      </div> */}
      <div className="subtitle">溫泉國小</div>
      <div className="chart">
        {/* <div className="admin_chart">
          <div className="content">老師 - 學生</div>
          <div className="content">
            {date[0]}~{date[1]}
          </div>
          <div className="content">
            {date[2]}~{date[3]}
          </div>
          <div className="content">
            {date[4]}~{date[5]}
          </div>
          <div className="content">
            {date[6]}~{date[7]}
          </div>
          <div className="content">
            {date[8]}~{date[9]}
          </div>
        </div> */}
        {wc.map((e, ind) => {
          let data = e.data;
          return (
            <div className="admin_chart">
              <div className="content" key={ind}>{e.teacher} - {e.studentname}</div>
              {data.map((rec, i) => {
                return (<div className="content" key={i}>{rec.classdate} : {(trans[rec.studentabsence]) ? trans[rec.studentabsence] : rec.studentabsence}</div>)
              })}
            </div>
          )
        })}
      </div>
      {/* <div className="chart">
        <div className="admin_chart">
          <div className="content">老師 - 學生</div>
          <div className="content">
            {date[10]}~{date[11]}
          </div>
          <div className="content">
            {date[12]}~{date[13]}
          </div>
          <div className="content">
            {date[14]}~{date[15]}
          </div>
          <div className="content">
            {date[16]}~{date[17]}
          </div>
          <div className="content">{date[18]}</div>
        </div>
        {student1.map((e, ind) => {
          return (
            <div className="admin_chart">
              <div className="content">{e.pair}</div>
              <div className="content">{e.sixth}</div>
              <div className="content">{e.seventh}</div>
              <div className="content">{e.eighth}</div>
              <div className="content">{e.ninth}</div>
              <div className="content">{e.tenth}</div>
            </div>
          )
        })}
      </div> */}
      <div className="subtitle">崁頂國小</div>
      <div className="chart">
        {/* <div className="admin_chart">
          <div className="content">老師 - 學生</div>
          <div className="content">
            {date[0]}~{date[1]}
          </div>
          <div className="content">
            {date[2]}~{date[3]}
          </div>
          <div className="content">
            {date[4]}~{date[5]}
          </div>
          <div className="content">
            {date[6]}~{date[7]}
          </div>
          <div className="content">
            {date[8]}~{date[9]}
          </div>
        </div> */}
        {cd.map((e, ind) => {
          let data = e.data;
          return (
            <div className="admin_chart">
              <div className="content" key={ind}>{e.teacher} - {e.studentname}</div>
              {data.map((rec, i) => {
                return (<div className="content" key={i}>{rec.classdate} : {(trans[rec.studentabsence]) ? trans[rec.studentabsence] : rec.studentabsence}</div>)
              })}
            </div>
          )
        })}
      </div>
      {/* <div className="chart">
        <div className="admin_chart">
          <div className="content">老師 - 學生</div>
          <div className="content">
            {date[10]}~{date[11]}
          </div>
          <div className="content">
            {date[12]}~{date[13]}
          </div>
          <div className="content">
            {date[14]}~{date[15]}
          </div>
          <div className="content">
            {date[16]}~{date[17]}
          </div>
          <div className="content">{date[18]}</div>
        </div>
        {student1.map((e, ind) => {
          return (
            <div className="admin_chart">
              <div className="content">{e.pair}</div>
              <div className="content">{e.sixth}</div>
              <div className="content">{e.seventh}</div>
              <div className="content">{e.eighth}</div>
              <div className="content">{e.ninth}</div>
              <div className="content">{e.tenth}</div>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}
