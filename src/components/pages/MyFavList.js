import React from 'react'
import '../../App.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Loading from '../Loading'
import Myfav from '../Myfav'

export default function MyFavList() {
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
   
  if(isLoading) {
    return(
      <>
      <Loading/>
      </>
)}else{
  return (
    <>
      <Navbar lang = {lang} isLoggedIn = {true}></Navbar>
      <Myfav></Myfav>
      <Footer lang = {lang}></Footer>
    </>
  )}
}
