// imports
import React, { useState, useEffect } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { AiFillLock } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import { changelang } from '../reducer/user'
import './Profile_user.css'
import { Divider } from '@mui/material'
import { BsFillEmojiSmileFill } from 'react-icons/bs'
import Axios from 'axios'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getloggedout } from '../reducer/user'
import Loading from './Loading'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}))

function Profile_user() {
	const dispatch = useDispatch()

	const store = () => {
		dispatch(changelang())
		console.log('dispatched')
	}
	const [name, setname] = useState('VolunTutor Cloud')
	const [phone, setphone] = useState('0912345678')
	const [email, setemail] = useState('vc@gmail.com')
	const [password, setPassword] = useState("");
	const [gender, setgender] = useState('other')
	const [birthday, setbirthday] = useState('20040101')
	const [grade, setgrade] = useState('11th')
	const [school, setschool] = useState('Wego Private High School')
	const [preferredsubject, setpreferredsubject] = useState('Math')
	const [studentage, setstudentage] = useState('3th')
	const [studentgender, setstudentgender] = useState('No preference')
	const [studentpers, setstudentpers] = useState('outgoing')
	const [bio, setbio] = useState('For Better Unity, Help Your Community ')
	const [about, setabout] = useState('Join Voluntutor Cloud!')
	const [curVolProg, setCurVolProg] = useState('')
	const [errormessage, seterrormessage] = useState('')
	const [contacterror, setcontacterror] = useState('')
	const [personerror, setpersonerror] = useState('')
	const [prefererror, setprefererror] = useState('')
	const [bioerror, setbioerror] = useState('')
	const [abouterror, setabouterror] = useState('')
	const [readonlycontact, setreadcontact] = useState('disabled')
	const [readonlypersoninfo, setreadpersoninfo] = useState('disabled')
	const [readonlyprefer, setreadprefer] = useState('disabled')
	const [readonlybio, setreadbio] = useState('disabled')
	const [readonlyabout, setreadabout] = useState('disabled')
	const [click, setClick] = useState(false)
	const [contactclick, setcontactclick] = useState(false)
	const [personinfoclick, setpersoninfoclick] = useState(false)
	const [preferclick, setpreferclick] = useState(false)
	const [bioclick, setbioclick] = useState(false)
	const [aboutclick, setaboutclick] = useState(false)
	const [emailError, setEmailError] = useState('')
	const [googlemeetlink, setGooglemeetlink] = useState('')
	const [open, setOpen] = useState(false)
	const [status, setStatus] = useState(1)
	const [totalhours, settotalhours] = useState(0)
	const [detailedhours, setdetailedhours] = useState([
		{
			date: '5/1 ~ 6/30',
			hours: 0,
		},
		{
			date: '7/1 ~ 8/31',
			hours: 0,
		},
		{
			date: '9/1 ~ 10/31',
			hours: 0,
		},

		{
			date: '11/1 ~ 1/31',
			hours: 0,
		},

		{
			date: '2/1 ~ 3/31',
			hours: 0,
		},
	])
	const [contactstyle, setcontactstyle] = useState(
		<div>
			<BiEdit />
		</div>,
	)
	const [expanse, setexpanse] = useState([true, '⏷'])
	const [persostyle, setpersostyle] = useState(
		<div>
			<BiEdit />
		</div>,
	)
	const [prefstyle, setprefstyle] = useState(
		<div>
			<BiEdit />
		</div>,
	)
	const [biostyle, setbiostyle] = useState(
		<div>
			<BiEdit />
		</div>,
	)
	const [aboutstyle, setaboutstyle] = useState(
		<div>
			<BiEdit />
		</div>,
	)
	const navigate = useNavigate()

	// titles
	let b = ['Please enter a valid email.', '請輸入正確的Email']
	let c = ['Please fill in the blanks.', '請完整填入資訊']
	let e = ['Enter Your Name', '請輸入你的名字']
	let f = ['Contact Information', '聯絡資訊']
	let g = ['Phone: ', '手機號碼：']
	let h = ['Enter Phone number', '請輸入手機號碼']
	let i = ['Email: ', 'Email帳號：']
	let hdf = ['Enter Email', '請輸入Email帳號']
	let j = ['Personal Information', '個人資料']
	let k = ['Gender: ', '性別：']
	let l = ['Female/Male/Others', '男/女/其他']
	let m = ['Birthday: ', '生日：']
	let n = ['Format: 2004/01/01', '格式：2004/01/01']
	let o = ['Grade: ', '年級：']
	let p = ['9th/10th/11th', '九/十/十一']
	let q = ['School: ', '學校：']
	let r = ['Enter school', '輸入學校']
	let s = ['Preferences', '喜好']
	let t = ['Subjects: ', '科目：']
	let u = ['ex: Chinese/Math...', '例如：國/數...']
	let v = ['Grade: ', '年級：']
	let w = ['ex: 1th/2th', '例如：一/二...']
	let x = ['Gender: ', '性別：']
	let y = ['Female/Male/No pref', '男/女/無偏好']
	let z = ['Character: ', '性格：']
	let ab = ['Enter personality', '輸入性格']
	let bc = ['Bio', '自介']
	let cd = ['Add your bio here!', '填入你的自介！']
	let de = ['About me', '關於我']
	let ef = ['Tell us more about you!', '讓我們更了解你吧！']
	let fg = ['Language Setting', '語言設定']
	let gh = ['Privacy & Security', '隱私以及安全性']
	let jj = ['Volunteer History', '服務時數歷史紀錄']
	let jjj = ['Total volunteer hours: ', '總服務小時數：']
	let jjjj = ['hours', '小時']
	let rr = ['Session ', '梯次']
	let rrrr = ['Click me to switch to ', '點我以更改語言為']
	let rrrrrr = ['Chinese', '英文']
	let rrr = [': ', '：']
	let hi = ['Change Password', '更改密碼']
	let ij = ['Log Out', '登出']
	let jk = [
		'Please contact the administrator to change the password.',
		'請聯絡管理者以更改密碼',
	]
	let no = ['You are now enrolled in: ', '目前參與的計畫為：']
	let op = [' volunteering program', ' 志工計畫']

	// google meet changing for future uses
	let kl = [
		'Make sure the Google Meet Link is set up with your PERSONAL account, not school account. If your link is incorrect, update the correct link down below.',
		'請確認你的Google Meet連結是用你的私人帳號設定的，而非學校帳號。若你的連結於一開始設定時錯誤，請將正確的連結填入以下欄位',
	]
	let lm = ['Save', '儲存']
	let mn = [
		'The following Google Meet Link is the link you provided during registration.',
		'以下連結為你當時報名時提供的Google Meet 連結',
	]

	// dialog
	const BootstrapDialogTitle = (props) => {
		const { children, ...other } = props

		return (
			<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
				{children}
			</DialogTitle>
		)
	}

	BootstrapDialogTitle.propTypes = {
		children: PropTypes.node,
	}
	const handleClose = () => {
		setOpen(false)
	}

	//functions
	const validateEmail = (e) => {
		var email = e.target.value
		if (!validator.isEmail(email)) {
			setEmailError(b[status])
		} else {
			setEmailError('')
		}
	}

	const handleclick_password = () => {
		Axios.post('https://voluntutorcloud-server.herokuapp.com/updatePassword', {
			username: name,
			password: password,
		}).then((response) => {
			// console.log(response);
		})
		setOpen(false);
	}

	const handleclick_contact = () => {
		//console.log(contactclick)
		if (phone === '' || email === '') {
			setcontacterror(c[status])
		} else {
			//console.log('cc')
			setcontacterror('')
			setcontactclick(!contactclick)
			setcontactstyle(<BiEdit />)
			if (!contactclick) {
				setreadcontact('')
				setcontactstyle(<BsCheckLg />)
			} else {
				setreadcontact('disabled')
			}
		}

		Axios.post('https://voluntutorcloud-server.herokuapp.com/updatePhone', {
			username: name,
			phone: phone,
		}).then((response) => {
			//console.log(response)
		})
		Axios.post('https://voluntutorcloud-server.herokuapp.com/updateEmail', {
			username: name,
			email: email,
		}).then((response) => {
			//console.log(response)
		})
	}

	const handleclick_pers = () => {
		//console.log('dd')
		if (gender === '' || birthday === '' || grade === '' || school === '') {
			setpersonerror(c[status])
		} else {
			setpersonerror('')
			setpersoninfoclick(!personinfoclick)
			setpersostyle(<BiEdit />)
			if (!personinfoclick) {
				setreadpersoninfo('')
				setpersostyle(<BsCheckLg />)
			} else {
				setreadpersoninfo('disabled')
			}
		}

		Axios.post('https://voluntutorcloud-server.herokuapp.com/updateGender', {
			username: name,
			gender: gender,
		}).then((response) => {
			//console.log(response)
		})
		Axios.post('https://voluntutorcloud-server.herokuapp.com/updateBirthday', {
			username: name,
			birthday: birthday,
		}).then((response) => {
			//console.log(response)
		})
		Axios.post('https://voluntutorcloud-server.herokuapp.com/updateGrade', {
			username: name,
			grade: grade,
		}).then((response) => {
			//console.log(response)
		})
		Axios.post(
			'https://voluntutorcloud-server.herokuapp.com/updateSchoolname',
			{
				username: name,
				schoolname: school,
			},
		).then((response) => {
			//console.log(response)
		})
	}

	const handleclick_pref = () => {
		setprefererror('')
		setpreferclick(!preferclick)
		setprefstyle(<BiEdit />)
		if (!preferclick) {
			setreadprefer('')
			setprefstyle(<BsCheckLg />)
		} else {
			setreadprefer('disabled')
		}

		Axios.post(
			'https://voluntutorcloud-server.herokuapp.com/updatePreferredSubjects',
			{
				username: name,
				preferredSubjects: preferredsubject,
			},
		).then((response) => {
			//console.log(response)
		})
		Axios.post(
			'https://voluntutorcloud-server.herokuapp.com/updateTargetStuAge',
			{
				username: name,
				targetStuAge: studentage,
			},
		).then((response) => {
			//console.log(response)
		})
		Axios.post(
			'https://voluntutorcloud-server.herokuapp.com/updateTargetStuGen',
			{
				username: name,
				targetStuGen: studentgender,
			},
		).then((response) => {
			//console.log(response)
		})
		Axios.post(
			'https://voluntutorcloud-server.herokuapp.com/updateTargetStuPerso',
			{
				username: name,
				targetStuPerso: studentpers,
			},
		).then((response) => {
			//console.log(response)
		})
	}

	const handleclick_bio = () => {
		setbioerror('')
		setbioclick(!bioclick)
		setbiostyle(<BiEdit />)
		if (!bioclick) {
			setreadbio('')
			setbiostyle(<BsCheckLg />)
		} else {
			setreadbio('disabled')
		}
		Axios.post('https://voluntutorcloud-server.herokuapp.com/updateBio', {
			username: name,
			bio: bio,
		}).then((response) => {
			//console.log(response)
		})
	}

	const handleclick_about = () => {
		setabouterror('')
		setaboutclick(!aboutclick)
		setaboutstyle(<BiEdit />)
		if (!aboutclick) {
			setreadabout('')
			setaboutstyle(<BsCheckLg />)
		} else {
			setreadabout('disabled')
		}

		Axios.post('https://voluntutorcloud-server.herokuapp.com/updateAbout', {
			username: name,
			about: about,
		}).then((response) => {
			//console.log(response)
		})
	}

	const logout = () => {
		Axios.post('https://voluntutorcloud-server.herokuapp.com/logout').then(
			(response) => {
				navigate('/')
				dispatch(getloggedout())
				console.log('logged out')
			},
		)
	}

	const changeLang = (lang) => {
		store()
		Axios.post('https://voluntutorcloud-server.herokuapp.com/setLang', {
			username: name,
			lang: lang,
		})
	}

	function addHis(name) {
		console.log(name)
		Axios.all([
			Axios.post(
				'https://voluntutorcloud-server.herokuapp.com/getRecordByUsername',
				{
					username: name,
					echelon: 1,
				},
			),
			Axios.post(
				'https://voluntutorcloud-server.herokuapp.com/getRecordByUsername',
				{
					username: name,
					echelon: 2,
				},
			),
			Axios.post(
				'https://voluntutorcloud-server.herokuapp.com/getRecordByUsername',
				{
					username: name,
					echelon: 3,
				},
			),

			Axios.post(
				'https://voluntutorcloud-server.herokuapp.com/getRecordByUsername',
				{
					username: name,
					echelon: 4,
				},
			),

			Axios.post(
				'https://voluntutorcloud-server.herokuapp.com/getRecordByUsername',
				{
					username: name,
					echelon: 5,
				},
			),
			,
		]).then(
			Axios.spread((response1, response2, response3, response4, response5) => {
				if(response1.status == 200 && response2.status == 200 && response3.status == 200 && response4.status == 200 && response5.status == 200) {
					console.log("Get session records successfully")
				}
				if (response1.data.length > 0) {
					for (let i = 0; i < response1.data.length; i++) {
						ech1total += response1.data[i].duration
					}
				}
				if (response2.data.length > 0) {
					for (let i = 0; i < response2.data.length; i++) {
						ech2total += response2.data[i].duration
					}
				}
				if (response3.data.length > 0) {
					for (let i = 0; i < response3.data.length; i++) {
						ech3total += response3.data[i].duration
					}
				}

				if (response4.data.length > 0) {
					for (let i = 0; i < response4.data.length; i++) {
						ech4total += response4.data[i].duration
					}
				}

				if (response5.data.length > 0) {
					for (let i = 0; i < response5.data.length; i++) {
						ech5total += response5.data[i].duration
					}
				}
				ech1total = Math.round(ech1total * 100.0) / 100.0
				ech2total = Math.round(ech2total * 100.0) / 100.0
				ech3total = Math.round(ech3total * 100.0) / 100.0
				ech4total = Math.round(ech4total * 100.0) / 100.0
				ech5total = Math.round(ech5total * 100.0) / 100.0
				//console.log(ech1total, ' ', ech2total)
				settotalhours(ech1total + ech2total + ech3total + ech4total + ech5total)
				setdetailedhours([
					{ date: '5/1 ~ 6/30', hours: ech1total },
					{ date: '7/1 ~ 8/31', hours: ech2total },
					{ date: '9/1 ~ 10/31', hours: ech3total },
					{ date: '11/1 ~ 1/31', hours: ech4total },
					{ date: '2/1 ~ 3/31', hours: ech5total },
				])
			}),
		)
	}

	const user = useSelector((state) => state.user.value)
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		setStatus(user.language)
	}, [])

	useEffect(() => {
		Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
			(response) => {
				console.log(response.data.user)
				if (response.data.user) {
					setname(response.data.user[0].username)
					setphone(response.data.user[0].phone)
					setemail(response.data.user[0].email)
					setgender(response.data.user[0].gender)
					setbirthday(response.data.user[0].birthday)
					setgrade(response.data.user[0].grade)
					setschool(response.data.user[0].schoolname)
					setpreferredsubject(response.data.user[0].preferredSubjects)
					setstudentage(response.data.user[0].targetStuAge)
					setstudentgender(response.data.user[0].targetStuGen)
					setstudentpers(response.data.user[0].targetStuPerso)
					setbio(response.data.user[0].bio)
					setabout(response.data.user[0].about)
					setGooglemeetlink(response.data.user[0].googlemeetlink)
					setCurVolProg(response.data.user[0].curvolprog)
					addHis(response.data.user[0].username)
				}
				setLoading(false)
			},
		)
	}, [])

	let ech1total = 0,
		ech2total = 0,
		ech3total = 0,
		ech4total = 0,
		ech5total = 0

	if (isLoading) return <Loading />

	return (
		<div className="frame">
			<div id="dialog_reg_wrap">
				<BootstrapDialog
					onClose={handleClose}
					id="dialog_registered"
					aria-labelledby="customized-dialog-title"
					open={open}
				>
					<div id="prof_registeredsucc">Enter new password: </div>
					<input
						className={contactclick ? 'edittabley' : 'edittablen'}
						type="text"
						placeholder="please enter password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value)
						}}
					/>
					<div onClick={handleclick_password}>Confirm</div>
				</BootstrapDialog>
			</div>
			<div className="background">
				<div className="profile">
					<div className="imageprofile">
						<FaUser className="prof_icon_main" />
					</div>
					<div className="nameprof">
						<input
							className={click ? 'edity' : 'editn'}
							type="text"
							placeholder={e[status]}
							disabled="disabled"
							value={name}
							onChange={(e) => {
								setname(e.target.value)
							}}
						/>
					</div>

					<div class="warning_prof">{errormessage}</div>
				</div>
				<div className="currentprogram">
					<BsFillEmojiSmileFill className="currentprogramicon"></BsFillEmojiSmileFill>
					<div className="currentprogramcontent">
						{no[status]}
						{curVolProg}
						{op[status]}
					</div>
				</div>
				<div className="containerprofile">
					<div className="left">
						<div className="contact">
							<div className="titleprofile">
								<div className="titlepro">{f[status]}</div>
								<div className="edit" onClick={handleclick_contact}>
									{contactstyle}
								</div>
							</div>
							<Divider className="line"></Divider>
							<div className="information">
								<div class="warning_prof">{contacterror}</div>
								<div className="wrapprof">
									<div className="textbef">{g[status]} </div>
									<input
										id="phone_input"
										className={contactclick ? 'edittabley' : 'edittablen'}
										type="tel"
										placeholder={h[status]}
										disabled={readonlycontact}
										value={phone}
										maxLength={10}
										onChange={(e) => {
											setphone(e.target.value)
										}}
									/>
								</div>
								<div className="wrapprof">
									<div className="textbef">{i[status]}</div>
									<input
										className={contactclick ? 'edittabley' : 'edittablen'}
										type="text"
										placeholder={hdf[status]}
										disabled={readonlycontact}
										value={email}
										onChange={(e) => {
											validateEmail(e)
											setemail(e.target.value)
										}}
									/>
								</div>
								<div class="emailwarning_prof">{emailError}</div>
							</div>
						</div>
						<div className="contact">
							<div className="titleprofile">
								<div className="titlepro">{j[status]}</div>
								<div className="edit" onClick={handleclick_pers}>
									{persostyle}
								</div>
							</div>
							<Divider className="line"></Divider>
							<div className="information">
								<div class="warning_prof">{personerror}</div>
								<div className="wrapprof">
									<div className="textbef">{k[status]} </div>
									<input
										className={personinfoclick ? 'edittabley' : 'edittablen'}
										type="text"
										placeholder={l[status]}
										disabled={readonlypersoninfo}
										value={gender}
										maxLength={15}
										onChange={(e) => {
											setgender(e.target.value)
										}}
									/>
								</div>
								<div className="wrapprof">
									<div className="textbef">{m[status]} </div>
									<input
										className={personinfoclick ? 'edittabley' : 'edittablen'}
										type="tel"
										placeholder={n[status]}
										disabled={readonlypersoninfo}
										value={birthday}
										maxLength={20}
										onChange={(e) => {
											//console.log(birthday)
											setbirthday(e.target.value)
										}}
									/>
								</div>
								<div className="wrapprof">
									<div className="textbef">{o[status]}</div>
									<input
										className={personinfoclick ? 'edittabley' : 'edittablen'}
										type="text"
										placeholder={p[status]}
										disabled={readonlypersoninfo}
										value={grade}
										maxLength={4}
										onChange={(e) => {
											setgrade(e.target.value)
										}}
									/>
								</div>
								<div className="wrapprof">
									<div className="textbef">{q[status]} </div>
									<input
										className={personinfoclick ? 'edittabley' : 'edittablen'}
										type="text"
										placeholder={r[status]}
										disabled={readonlypersoninfo}
										value={school}
										onChange={(e) => {
											setschool(e.target.value)
										}}
									/>
								</div>
							</div>
						</div>
						<div className="contact">
							<div className="titleprofile">
								<div className="titlepro">{s[status]}</div>
								<div className="edit" onClick={handleclick_pref}>
									{prefstyle}
								</div>
							</div>
							<Divider className="line"></Divider>
							<div className="information">
								<div class="warning_prof">{prefererror}</div>
								<div className="wrapprof">
									<div className="textbef">{t[status]} </div>
									<input
										className={preferclick ? 'edittabley' : 'edittablen'}
										type="text"
										placeholder={u[status]}
										disabled={readonlyprefer}
										value={preferredsubject}
										onChange={(e) => {
											setpreferredsubject(e.target.value)
										}}
									/>
								</div>
								<div className="wrapprof">
									<div className="textbef">{v[status]} </div>
									<input
										className={preferclick ? 'edittabley' : 'edittablen'}
										type="text"
										placeholder={w[status]}
										disabled={readonlyprefer}
										value={studentage}
										onChange={(e) => {
											setstudentage(e.target.value)
										}}
									/>
								</div>
								<div className="wrapprof">
									<div className="textbef">{x[status]}</div>
									<input
										className={preferclick ? 'edittabley' : 'edittablen'}
										type="text"
										placeholder={y[status]}
										disabled={readonlyprefer}
										value={studentgender}
										maxLength={15}
										onChange={(e) => {
											setstudentgender(e.target.value)
										}}
									/>
								</div>
								<div className="wrapprof">
									<div className="textbef">{z[status]} </div>
									<input
										className={preferclick ? 'edittabley' : 'edittablen'}
										type="text"
										placeholder={ab[status]}
										disabled={readonlyprefer}
										value={studentpers}
										maxLength={15}
										onChange={(e) => {
											setstudentpers(e.target.value)
										}}
									/>
								</div>
							</div>
						</div>

						<div className="contact">
							<div className="titleprofile">
								<div className="titlepro">{jj[status]}</div>
							</div>
							<Divider className="line"></Divider>
							<div className="information">
								<div id="historywrap">
									<div className="hrs">
										{jjj[status]}
										{totalhours}
										<div className="margin2">{jjjj[status]}</div>
									</div>
									<div
										className="expand"
										onClick={() => {
											if (expanse[0]) {
												setexpanse([false, '⏶'])
												//console.log(expanse)
											} else {
												setexpanse([true, '⏷'])
											}
										}}
									>
										{expanse[1]}
									</div>
								</div>
								<div className={expanse[0] ? 'none' : 'expanded'}>
									{detailedhours.map((e, ind) => {
										return (
											<div className="expandedwrap">
												<div>{rr[status]}</div>
												<div className="margin1">{ind + 1}</div>
												<div className="margin">
													{' ('}
													{e.date}
													{')'}
												</div>
												<div>{rrr[status]}</div>
												<div className="margin2">{e.hours}</div>
												<div className="margin2">{jjjj[status]}</div>
											</div>
										)
									})}
								</div>
							</div>
						</div>
					</div>
					<div className="right">
						<div className="contact" id="bio_contact">
							<div className="titleprofile">
								<div className="titlepro">{bc[status]}</div>
								<div className="edit" onClick={handleclick_bio}>
									{biostyle}
								</div>
							</div>
							<Divider className="line"></Divider>
							<div className="information">
								<div class="warning_prof_bio">{bioerror}</div>

								<div className="wrapprof">
									<textarea
										id="bio_enter"
										className={bioclick ? 'texty' : 'textn'}
										type="text"
										placeholder={cd[status]}
										disabled={readonlybio}
										value={bio}
										onChange={(e) => {
											setbio(e.target.value)
										}}
									/>
								</div>
							</div>
						</div>
						<div className="contact">
							<div className="titleprofile" id="aboutmetitle">
								<div className="titlepro">{de[status]}</div>
								<div className="edit" onClick={handleclick_about}>
									{aboutstyle}
								</div>
							</div>
							<Divider className="line"></Divider>
							<div className="information" id="bioandhobby">
								<div class="warning_prof_bio">{abouterror}</div>

								<div className="wrapprof">
									<textarea
										className={aboutclick ? 'texty' : 'textn'}
										type="text"
										placeholder={ef[status]}
										disabled={readonlyabout}
										value={about}
										onChange={(e) => {
											setabout(e.target.value)
										}}
									/>
								</div>
							</div>
						</div>
						<div className="contact">
							<div className="titleprofile">
								<div className="titlepro">{fg[status]}</div>
							</div>
							<Divider className="line"></Divider>
							<div className="information">
								<div className="language">
									<div
										style={{
											textDecoration: 'underline',
										}}
										className="lang"
										onClick={() => {
											if (status == 0) {
												setStatus(1)
												changeLang('chinese')
											} else {
												setStatus(0)
												changeLang('english')
											}
										}}
									>
										{rrrr[status]}
										{rrrrrr[status]}
									</div>
								</div>
							</div>
						</div>

						<div className="contact">
							<div className="titleprofile">
								<div className="titlepro">{gh[status]}</div>
							</div>
							<Divider className="line"></Divider>
							<div className="information">
								<div className="containpro">
									<div className="edittable">{hi[status]}</div>
									<AiFillLock
										className="lock"
										onClick={() => {
											setOpen(true)
										}}
									></AiFillLock>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="btn-prof" onClick={logout}>
					{ij[status]}
				</div>
			</div>
		</div>
	)
}
export default Profile_user
