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
    'Here are some frequently asked questions. Please refer to this page if you have any questions!',
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
  let w = ['Tutorials', '教學影片']
  let x = ['Phone/tablet setting tutorial (Eng)', '平板手機網站使用設定 (英文)']
  let xx = ['Phone/tablet setting tutorial (Ch)', '平板手機網站使用設定 (中文)']
  let y = ['Account registration', '註冊帳號']
  let yy = ['How to book a meeting (student)', '會議預約教學 (學生)']
  let yyy = ['How to book a meeting (teacher)', '會議預約教學 (老師)']
  let z = ['How to join a meeting (student)', '如何加入上課會議 (學生)']
  let zz = ['How to join a meeting (teacher)', '如何加入上課會議 (老師)']
  const phonesettingtutorialchi = 'https://www.youtube.com/shorts/4pt_JmFWGOQ'
  const phonesettingtutorialeng = 'https://www.youtube.com/shorts/Ojl9JxCmgu4'
  const homepagelink = 'https://voluntutorcloud.org/'
  const registration = 'https://www.youtube.com/watch?v=_EA9h2ajJZ8'
  const bookmeetstu = 'https://www.youtube.com/watch?v=k9FvF23QEA0'
  const bookmeetteach = 'https://www.youtube.com/watch?v=rlLfw9H7EwI'
  const joinmeetstu = 'https://www.youtube.com/watch?v=AEMLtAJ_Mc0'
  const joinmeetteach = 'https://www.youtube.com/watch?v=5V7T9DnTdtI'
  const phonesettingtutorial1 = () => {
    window.open(phonesettingtutorialeng, '_blank', 'noopener,noreferrer')
  }
  const phonesettingtutorial2 = () => {
    window.open(phonesettingtutorialchi, '_blank', 'noopener,noreferrer')
  }
  const openhomepage = () => {
    window.open(homepagelink, '_blank', 'noopener,noreferrer')
  }
  const openreg = () => {
    window.open(registration, '_blank', 'noopener,noreferrer')
  }
  const openbookmeets = () => {
    window.open(bookmeetstu, '_blank', 'noopener,noreferrer')
  }
  const openbookmeett = () => {
    window.open(bookmeetteach, '_blank', 'noopener,noreferrer')
  }
  const openjoinmeets = () => {
    window.open(joinmeetstu, '_blank', 'noopener,noreferrer')
  }
  const openjoinmeett = () => {
    window.open(joinmeetteach, '_blank', 'noopener,noreferrer')
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
            <img className="faqimage" src="/images/google_meet 1.jpg"></img>
            <div className="qaprocedure">{n[status]}</div>
            <img className="faqimage" src="/images/google_meet 2.jpg"></img>
            <div className="qaprocedure">{o[status]}</div>
            <img
              className="faqimage"
              id="googleaccount"
              src="/images/change_google_account.jpg"
            ></img>
            <div className="qaprocedure">{p[status]}</div>
            <img className="faqimage" src="/images/google_meet 3.jpg"></img>
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

            <img
              className="faqimage"
              id="imgstudentsattendance"
              src="/images/student's_attendance.jpg"
            ></img>

            <img className="faqimage" src="/images/class_time.jpg"></img>
          </div>
        </div>
      </div>

      <b className="faqtitle">{w[status]}</b>
      <div className="tutoriallinkswrap">
        <div className="tutorialinksbottom" onClick={phonesettingtutorial1}>
          {x[status]}
        </div>
        <div className="tutorialinksbottom" onClick={phonesettingtutorial2}>
          {xx[status]}
        </div>
        <div className="tutorialinksbottom" onClick={openreg}>
          {y[status]}
        </div>
        <div className="tutorialinksbottom" onClick={openbookmeets}>
          {yy[status]}
        </div>
        <div className="tutorialinksbottom" onClick={openbookmeett}>
          {yyy[status]}
        </div>
        <div className="tutorialinksbottom" onClick={openjoinmeets}>
          {z[status]}
        </div>
        <div className="tutorialinksbottom" onClick={openjoinmeett}>
          {zz[status]}
        </div>
      </div>
    </div>
  )
}
