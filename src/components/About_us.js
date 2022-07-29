import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './About_us.css'
import { useSelector } from 'react-redux'
import { Divider } from '@mui/material'
export default function About_us(props) {
  const [status, setStatus] = useState(1)
  useEffect(() => {
    const user = useSelector((state) => state.user.value)
    console.log('store data: ', user)
    setStatus(user.language)
  }, [])

  // useEffect(() => {
  //   console.log(props)
  //   if (props.lang) {
  //     if (props.lang == 'chinese') setStatus(1)
  //     else setStatus(0)
  //   } else {
  //     console.log('props failed')
  //     Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
  //       (response) => {
  //         username = response.data.user[0].username
  //         if (response.data.user[0].lang == 'chinese') setStatus(1)
  //         else setStatus(0)
  //       },
  //     )
  //   }
  // })

  let a = ['About Us', '關於我們']
  let b = ['Global Connections', '教育橋梁']
  let c = [
    'VolunTutor Cloud bridges the gap of regional barriers. Through an online volunteering platform, volunteers can meet individuals from across the globe and form lifelong connections.',
    '平台創立的初衷便是作為連接全球的教學網，在疫情嚴峻之下，諸多不便造成了更多距離的限制，但教育不容遲緩，如何在時局的無奈下也能讓教育同步進行，一直是我們在思考的難題。透過這個平台，我們將不可能的距離化為可能，希望帶給所有使用者完善良好的體驗，讓每位學生及老師都能各盡其職，將熱忱帶給彼此，讓學習不停歇。',
  ]
  let d = ['Personalized Education', '訂製課程']
  let e = [
    'Our volunteering model is not rigid but innovative. We tailor to each student’s educational needs. For once, learning can be riveting and customized only for you.',
    '教學的有效度在於老師的用心以及學生的回饋，雙方進行溝通並互相了解下進行最佳。同為求學之路上的一份子，我們都懂學生們遇到的困境以及興趣、志向、性格、價值觀、吸收程度上的不同，因材施教，視孩子的狀況及需求適時調整課程難易度，用正確的挖掘每位孩子的潛力！我們年齡落差不會很大，而這也是我們的優勢，能與學生產生更多共鳴，與其當作學生老師這種上對下的關係，我們更希望跟孩子當朋友，孩子的專注度也會有所提升。',
  ]
  let f = ['Community Service', '回饋社群']
  let g = [
    'It is critically important that we learn to be grateful and give back to our community. With the help from VolunTutor Cloud, your dream of volunteering can come to fruition.',
    '極富愛心的你是不是缺乏一個讓你表現的機會？我們是一群非常有熱心且喜愛學習的高中生，希望以此吸引更多相同理念的人，將我們的曾經學到的知識和經驗分享並傳承下去，使莘莘學子不再迷途，也為了回饋之前同樣引領我們的老師、學長姐們，成為一個永續的循環！教育的一盞明燈引領各個在求學之路的弟子；學海無涯，願學生及志工老師都能相互砥礪向上。',
  ]

  return (
    <div className="about_uscont">
      <div className="about_ustitle">{a[status]}</div>
      <div className="traitwrap">
        <div className="about_ustrait">
          <div className="traitename">{b[status]}</div>
          <Divider className="about_usline"></Divider>
          <div className="traitcontent">{c[status]}</div>
        </div>
        <div className="about_ustrait">
          <div className="traitename">{d[status]}</div>
          <Divider className="about_usline"></Divider>
          <div className="traitcontent">{e[status]}</div>
        </div>
        <div className="about_ustrait">
          <div className="traitename">{f[status]}</div>
          <Divider className="about_usline"></Divider>
          <div className="traitcontent">{g[status]}</div>
        </div>
      </div>
    </div>
  )
}
