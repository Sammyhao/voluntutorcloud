import React, { useState } from 'react'
import './Admin_appointment.css'
import { useNavigate } from 'react-router-dom'
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
        <div className="admin_chart">
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
        </div>
        {student1.map((e, ind) => {
          return (
            <div className="admin_chart">
              <div className="content">{e.pair}</div>
              <div className="content">{e.first}</div>
              <div className="content">{e.second}</div>
              <div className="content">{e.third}</div>
              <div className="content">{e.fourth}</div>
              <div className="content">{e.fifth}</div>
            </div>
          )
        })}
      </div>
      <div className="chart">
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
      </div>
      <div className="subtitle">廣興國小</div>
      <div className="chart">
        <div className="admin_chart">
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
        </div>
        {student1.map((e, ind) => {
          return (
            <div className="admin_chart">
              <div className="content">{e.pair}</div>
              <div className="content">{e.first}</div>
              <div className="content">{e.second}</div>
              <div className="content">{e.third}</div>
              <div className="content">{e.fourth}</div>
              <div className="content">{e.fifth}</div>
            </div>
          )
        })}
      </div>
      <div className="chart">
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
        {student2.map((e, ind) => {
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
      </div>
      <div className="subtitle">溫泉國小</div>
      <div className="chart">
        <div className="admin_chart">
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
        </div>
        {student1.map((e, ind) => {
          return (
            <div className="admin_chart">
              <div className="content">{e.pair}</div>
              <div className="content">{e.first}</div>
              <div className="content">{e.second}</div>
              <div className="content">{e.third}</div>
              <div className="content">{e.fourth}</div>
              <div className="content">{e.fifth}</div>
            </div>
          )
        })}
      </div>
      <div className="chart">
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
        {student3.map((e, ind) => {
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
      </div>
      <div className="subtitle">崁頂國小</div>
      <div className="chart">
        <div className="admin_chart">
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
        </div>
        {student1.map((e, ind) => {
          return (
            <div className="admin_chart">
              <div className="content">{e.pair}</div>
              <div className="content">{e.first}</div>
              <div className="content">{e.second}</div>
              <div className="content">{e.third}</div>
              <div className="content">{e.fourth}</div>
              <div className="content">{e.fifth}</div>
            </div>
          )
        })}
      </div>
      <div className="chart">
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
        {student4.map((e, ind) => {
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
      </div>
    </div>
  )
}
