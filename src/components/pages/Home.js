import '../../App.css'
import HeroSection from '../HeroSection'
// import C_HeroSection from '../C_HeroSection'
import Footer from '../Footer'
// import C_Footer from '../C_Footer'
import Navbar from '../Navbar'
// import C_Navbar from '../C_Navbar'
import Homepageprog from '../Homepg_choose'
// import C_Homepageprog from '../C_Homepg_choose'
import About_us from '../About_us'
// import C_Team from '../C_Team'
import Team from '../Team'
import Function from '../Function'
// import C_Function from '../C_Function'
function Home() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection />
      <Function></Function>
      <Homepageprog></Homepageprog>
      <About_us></About_us>
      <Team></Team>
      <Footer id = "footer_homepage"></Footer>
    </>
  )
}

export default Home
