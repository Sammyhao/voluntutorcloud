import React from 'react'
import './Team.css'

export default function News() {
  return (
    <div className="about_uscont">
      <div className="newswrap">
        <div className="slidingimage">
          <img></img>
        </div>
        <div className="upcomingnewswrap">
          <div className="upcoming">UPCOMING</div>
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
              <div> Hualian Summer Camp!</div>
              <div className="descriptionnews">
                Hualian in-person summer camp has ended, check out our recent
                Instagram post.
              </div>
            </div>
            <div className="slidingwords" id="titlenews">
              <div>New Features!</div>
              <div className="descriptionnews">
                We have so many new features on our website, including message
                functions, homepage info, and more!
              </div>
            </div>
            <div className="slidingwords" id="titlenews">
              <div>New Collaboration!</div>
              <div className="descriptionnews">
                Welcome 臺東縣溫泉國小 to the Voluntutor Cloud family!
              </div>
            </div>
            <div className="slidingwords" id="titlenews">
              <div>New Collaboration!</div>
              <div className="descriptionnews">
                Welcome 新北市義方國小 to the Voluntutor Cloud family!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
