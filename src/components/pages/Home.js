import '../../App.css'
import HeroSection from '../HeroSection'
import Footer from '../Footer'
import Maintainance from '../Maintainance'
import Navbar from '../Navbar'
import Homepageprog from '../Homepg_choose'
import About_us from '../About_us'
import Team from '../Team'
import Function from '../Function'
import S_Navbar from '../S_Navbar'
import S_hero from '../S_HeroSection'
import S_Function from '../S_Function'
function Home() {
  let role = 0
  // return (
  //   <>
  //   <Maintainance/>
  //   </>
  // )
  if(role ==0){
  return (
    <>
      <Navbar></Navbar>
      <HeroSection />
      <Function></Function>
      <Homepageprog></Homepageprog>
      <About_us></About_us>
      <Team></Team>
      <Footer></Footer>
    </>
  )}else{
    return(
      <>
      <S_Navbar></S_Navbar>
      <S_hero />
      <S_Function></S_Function>
      <About_us></About_us>
      <Team></Team>
      <Footer></Footer>
    </>
    )
  }
}

export default Home
