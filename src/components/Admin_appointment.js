import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import './Admin_appointment.css'
import Axios from 'axios'

export default function Admin_appointment() {
	const [isLoading, setLoading] = useState(true)
	const [stpair, setStpair] = useState([])
	const [servHr, setServHr] = useState([]);
	const [ech, setEch] = useState(4); // manually change the echelon number

	const DisplayServHr = () => {
		for(let i = 0; i < servHr.length; i++) {
			console.log(servHr[i]);
		}
	}

	useEffect(() => {
			Axios.post(
				'https://voluntutorcloud-server.herokuapp.com/findAllContact',
			).then((response) => {
				for (let i = 0; i < response.data.length; i++) {
					let tempStpair = response.data[i]
					setStpair((stpair) => [...stpair, tempStpair])
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
	}, [ech])
	if(isLoading) {
		return <Loading />
	} else {
		return (
			<>
				<input
					type="text"
					placeholder="Input echelon number"
					value={ech}
					onChange={(e) => {setEch(e.target.value);}}
				></input>
				<div onClick={DisplayServHr}>Press me to see service hour list</div>
			</>
		)
	}
	return <></>
}
