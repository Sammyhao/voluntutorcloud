import React from 'react'
import '../../App.css'
import S_Message from '../S_Msg'
import Message from '../Msg'
import S_Navbar from '../S_Navbar'

import Loading from '../Loading'
import Navbar from '../Navbar'

export default function Messages() {
  const [role, setRole] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  let username = "";
  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        console.log(response.data);
        if(!response.data.isLoggedIn) {
          setLoading(false);
          setIsLoggedIn(false);
          console.log("isLoggedIn");
          console.log(isLoggedIn);
        }else {
          username = response.data.user[0].username
          Axios.post('https://voluntutorcloud-server.herokuapp.com/getRole', {
            username: username,
          }).then((response) => {
            console.log("role");
            console.log(response.data);
            setRole(response.data);
            setLoading(false);
          })
        }
      }
    )
  })
  if(isLoading) {
    return(
      <>
      <Loading/>
      </>
    )

  }
  if(role ==0){
    return(
      <>
        <Navbar></Navbar>
        <Message></Message>
      </>
    )
  }else{
  return (
    <>
      <S_Navbar></S_Navbar>
      <S_Message></S_Message>
    </>
  )}
}
