import React from 'react'
import './Button.css'

const STYLES = [
  'btn--primary',
  'btn--outline',
  'btn--test',
  'btn--footer',
  'btn--signup',
]

const SIZES = [
  'btn--medium',
  'btn--large',
  'btn--large2',
  'btn--footerSize',
  'btn--signupSize',
]

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0]

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
