import React, { useState, useEffect } from 'react'
import './FAQs.css'
import { useSelector } from 'react-redux'

export default function FAQs() {
  const [status, setStatus] = useState(1)
  const user = useSelector((state) => state.user.value)
  console.log('store data: ', user)

  useEffect(() => {
    setStatus(user.language)
  }, [])
  let a = ['Common Questions', '常見問題']
  let b = [
    'Here are some frequently asked questions. Please refer to this page if you have any questions about us or the website!',
    '此頁列出了關於網站或者是Voluntutor Cloud團隊的常見問題，有任何問題都可以在這邊找到解答喔！',
  ]
  let c = ['Answer ', '我們幫']
  let cc = ['\xa0' + 'YOUR' + '\xa0', '你']
  let ccc = [' questions!', '解惑！']
  let d = [
    "1. Which web browser should I use when I'm using the Voluntutor Cloud website?",
    '1. 在使用Voluntutor Cloud網站時，我應該使用哪一個瀏覽器呢？',
  ]
  let e = [
    "• If you're using computer/laptop, open the website in Chrome.",
    '• 若您是使用桌機或者是平板電腦，請使用Chrome。',
  ]
  let f = [
    "• If you're using your phone/tablet (ex: iPad), please follow the instructions in the tutorials below. After that, open the website in Safari.",
    '• 若您是使用手機或平板，請按照以下教學影片操作後，在Safari打開網站。',
  ]
  let g = [
    'Click me to watch phone/tablet setting tutorial (Eng)',
    '點我以觀看平版手機網站使用設定 (英)',
  ]
  let h = [
    'Click me to watch Phone/tablet setting tutorial (Ch)',
    '點我以觀看平版手機網站使用設定 (中)',
  ]
  let i = [
    '2. If the website keeps loading, what should I do?',
    '2. 若網站一直在loading，我要如何處理？',
  ]
  let j = ['• Please return to the homepage or ' + '\xa0', '• 請回到主頁面或']
  let jj = ['click me', '點我']
  let jjj = [
    '\xa0' + 'After signing in, you should be good to go!',
    '重新進入主頁，並且重新登入即可使用。',
  ]
  let k = [
    "3. What should I do if I can't enter the Google meet for class?",
    '3. 請問無法進入上課Google meet會議怎麼辦？',
  ]
  let l = [
    "• If you're in the waiting room, please give the teacher some time, he/she will open the meeting soon.",
    '• 若您在等候室，請給老師幾分鐘的時間，他會盡快進入會議進行課程。',
  ]
  let m = [
    "• If you can't join the meeting (as shown below), please make sure you have signed in with your personal account, if not, please follow the following procedures.",
    '• 若您無法加入會議 (如下圖)，請確認是否登入私人帳號，若登入的為學校帳號，請按照以下步驟操作。',
  ]
  let n = ['(1) Return to Google meet homepage.', '(1) 回到Google meet主畫面。']
  let o = [
    '(2) Click the avatar on the top right corner and sign in to your personal account (should end with @xxx.com).',
    '(2) 點選右上角圓形圖示，並且選擇私人帳號 (應該為 @xxx.com 結尾)。',
  ]
  let p = [
    '(3) Go back to Voluntutor Cloud website and re-enter the Google meet.',
    '(3) 完成後，重新進入會議即可。',
  ]
  let q = [
    '4. If the teacher or the student is absent without notifying, what should I do?',
    '4. 若老師或學生其中一方尚未上線上課，如何處理？',
  ]
  let r = [
    '• Please send a message to Voluntutor Cloud Line official or Instagram, we will contact he/she immediately. Meanwhile, please wait online.',
    '• 請傳送訊息給Voluntutor Cloud官方Line或instagram帳號，以便我們通知，並同時掛在線上等待另一方上線。',
  ]
  let s = [
    "5. If the student doesn't show up in class or isn't on time, what should I do?",
    '5. 若學生不斷遲到或完全沒有上線怎麼辦？',
  ]
  let t = [
    '• Please send a message to Voluntutor Cloud Line official or Instagram, we will contact he/she immediately.',
    '• 請傳送訊息給Voluntutor Cloud官方Line或instagram帳號，負責幹部要通知主任狀況。',
  ]
  let u = [
    "• When the teacher is filling in the class appointment form at the end of the session, please fill in the initially planned session time and select the correct choice under student's attendance.",
    '• 請志工在填寫教學紀錄表時正確選取遲到時間，上課時間依照原本約定的時間填寫。',
  ]
  let v = [
    '• For example: If the session is initially planned to be from 8:00 am to 9:00 am, but the student is late for 15 minutes, please fill in the appointment form as following.',
    '• 例如：若原本預約8:00-9:00上課、遲到15分鐘，請依照以下填寫。',
  ]
  const phonesettingtutorialchi = 'https://www.youtube.com/shorts/4pt_JmFWGOQ'
  const phonesettingtutorialeng = 'https://www.youtube.com/shorts/Ojl9JxCmgu4'
  const homepagelink = 'https://voluntutorcloud.org/'
  const phonesettingtutorial1 = () => {
    window.open(phonesettingtutorialeng, '_blank', 'noopener,noreferrer')
  }
  const phonesettingtutorial2 = () => {
    window.open(phonesettingtutorialchi, '_blank', 'noopener,noreferrer')
  }
  const openhomepage = () => {
    window.open(homepagelink, '_blank', 'noopener,noreferrer')
  }
  return (
    <div className="faqwrap">
      <b className="faqtitle">{a[status]}</b>
      <div className="faqintro">{b[status]}</div>
      <div className="qabackground">
        <div className="qawrap">
          <div className="qatitle">
            <div>{c[status]}</div>
            <b className="emphasis">{cc[status]}</b>
            <div>{ccc[status]}</div>
          </div>
          <div className="questionwrap">
            <div className="question">{d[status]}</div>
            <div className="answer">
              <div className="answerdots">{e[status]}</div>
              <div className="answerdots">{f[status]}</div>
            </div>
            <div className="linkqa" onClick={phonesettingtutorial1}>
              {g[status]}
            </div>
            <div className="linkqa" onClick={phonesettingtutorial2}>
              {h[status]}
            </div>
          </div>
          <div className="questionwrap">
            <div className="question">{i[status]}</div>
            <div className="answer">
              <div className="answerdots" id="answerlink">
                <div className="linkwrap">
                  <div>{j[status]}</div>
                  <div className="linkclickable" onClick={openhomepage}>
                    {jj[status]}
                  </div>
                </div>
                <div>{jjj[status]}</div>
              </div>
            </div>
          </div>
          <div className="questionwrap">
            <div className="question">{k[status]}</div>
            <div className="answer">
              <div className="answerdots">{l[status]}</div>
              <div className="answerdots">{m[status]}</div>
            </div>
            <div className="qaprocedure">{n[status]}</div>

            <div className="qaprocedure">{o[status]}</div>
            <div className="qaprocedure">{p[status]}</div>
          </div>
          <div className="questionwrap">
            <div className="question">{q[status]}</div>
            <div className="answer">
              <div className="answerdots">{r[status]}</div>
            </div>
          </div>
          <div className="questionwrap">
            <div className="question">{s[status]}</div>
            <div className="answer">
              <div className="answerdots">{t[status]}</div>
              <div className="answerdots">{u[status]}</div>
              <div className="answerdots">{v[status]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
