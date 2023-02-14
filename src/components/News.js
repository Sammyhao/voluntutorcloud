import React from 'react'
import './Team.css'

export default function News() {
	return (
		<div className="about_uscont">
			<div className="newswrap">
				<div className="wrapslidingimage">
					<div className="slidingimage" id="titlenews">
						<img
							classname="slidingimage_img"
							src="/images/news-international.png"
						></img>
					</div>
					<div className="slidingimage" id="titlenews">
						<img
							classname="slidingimage_img"
							src="/images/news-東成國小.png"
						></img>
					</div>
					<div className="slidingimage" id="titlenews">
						<img
							classname="slidingimage_img"
							src="/images/news-開瑄國小.png"
						></img>
					</div>
					<div className="slidingimage" id="titlenews">
						<img
							classname="slidingimage_img"
							src="/images/news-南王國小.png"
						></img>
					</div>
					{/* <div className="slidingimage" id="titlenews">
						<img
							classname="slidingimage_img"
							src="/images/news-義方國小.png"
						></img>
					</div> */}
				</div>
				<div className="upcomingnewswrap">
					<div className="upcoming">BREAKING</div>
					<b className="newswords">NEWS</b>
					<div className="wrapslidingwords">
						<div className="slidingwords" id="titlenews">
							<div>Voluntutor Cloud going INTERNATIONAL!</div>
							<div className="descriptionnews">
								We are now collaborating with Australian schools! Refer to our
								Instagram for more info.
							</div>
						</div>
						<div className="slidingwords" id="titlenews">
							<div>New Collaboration!</div>
							<div className="descriptionnews">
								Welcome 臺東縣卑南鄉東成民小學 to the VolunTutor Cloud Family!
							</div>
						</div>
						<div className="slidingwords" id="titlenews">
							<div>New Collaboration!</div>
							<div className="descriptionnews">
								Welcome 金門縣金湖鎮開瑄國民小學 to the VolunTutor Cloud Family!
							</div>
						</div>

						<div className="slidingwords" id="titlenews">
							<div>New Collaboration!</div>
							<div className="descriptionnews">
								Ｗelcome 臺東縣南王Puyuma花環實驗小學 to the VolunTutor Cloud Family!
							</div>
						</div>
						{/* <div className="slidingwords" id="titlenews">
							<div>New Collaboration!</div>
							<div className="descriptionnews">
								Welcome 金門縣金湖鎮開瑄國民小學 to the VolunTutor Cloud Family!
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	)
}
