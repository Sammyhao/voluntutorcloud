import React, { useEffect, useState } from 'react'
import './HeroSection_subjects.css'

const STYLES = [
  'hero--tutor_title',
  'hero--yilan',
  'hero--hualien',
  'hero--taitung',
]

export const Hero = ({ children, type, heroStyle }) => {
  const checkHeroStyle = STYLES.includes(heroStyle) ? heroStyle : STYLES[0]

  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.pageYOffset)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`hero ${checkHeroStyle}`}
      type={type}
      // style={{ transform: `translateY(${offsetY * 1}px)` }}
    >
      {children}
    </div>
  )
}

{
  /* <div className={`hero ${checkHeroStyle}`} type={type} style={transform: `translateY(${offsetY*0.5}px)`}> */
}
