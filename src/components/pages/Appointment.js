import React from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Loading from '../Loading'
import App from '../Appointmentmeet'

export default function Appointment() {
  const [isLoading, setLoading] = useState(true);
  const [lang, setLang] = useState(""); // lang of the user

  useEffect(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        console.log(response.data);
        setLang(response.data.user[0].lang);
        setLoading(false);
      }
    )
  })

if(isLoading){
  return(
    <Loading></Loading>
  )
}else{
  return (
    <>
      <Navbar isLoggedIn={true} lang = {lang}></Navbar>
      <App></App>
      <Footer lang={lang}></Footer>
    </>
  )
}}
