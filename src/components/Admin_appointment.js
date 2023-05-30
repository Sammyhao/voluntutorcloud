import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import './Admin_appointment.css'
import Axios from 'axios'

export default function Admin_appointment() {
	const [isLoading, setLoading] = useState(true)
	const [servHr, setServHr] = useState([]);
	const [ech, setEch] = useState(5);
	const [inputech, setinputech] = useState(ech)

	const fetchdata = () => {
		Axios.post(
			'https://voluntutorcloud-server.herokuapp.com/findAllContact',
		).then((response) => {
			for (let i = 0; i < response.data.length; i++) {
				let tempStpair = response.data[i]
				Axios.post('https://voluntutorcloud-server.herokuapp.com/getRecord', {
					username: tempStpair.username,
					studentname: tempStpair.studentname,
					studentmail: tempStpair.studentmail,
					echelon: ech,
				}).then((response) => {
					let hr = 0;
					for (let i = 0; i < response.data.length; i++) {
						hr += response.data[i].duration;
						// console.log(response.data[i].duration);
					}
					setServHr(servHr => [...servHr, { trUsername: tempStpair.username, stuName: tempStpair.studentname, hr: hr }]);
				})
			}
			setLoading(false);
		})
	}

	useEffect(() => {
		fetchdata()
	}, [ech])
	if (isLoading) {
		return <Loading />
	} else {
		console.log(servHr);
		return (
			<>
				<div className='admin_wrap'>
					<div className='admin_title'>服務時數紀錄（第{ech}梯次）</div>
					<input
						className="admin_input"
						type="number"
						value={inputech}
						placeholder="請輸入欲查詢梯次"
						onChange={(e) => {
							setinputech(e.target.value)
						}}
					/>
					<button
						className="admin_button"
						onClick={() => {
							setEch(inputech);
							setinputech("");

							setServHr([])
						}}>
						Search
					</button>
					<div className='admin_chart_pu'>
						{servHr.map((e, ind) => {
							return (
								<div key={ind}>{e.trUsername}:&nbsp;{e.hr}&nbsp;hr</div>
							)
						})}
					</div>
				</div>
			</>
		)
	}
}
