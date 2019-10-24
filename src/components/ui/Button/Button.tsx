import React from 'react'
import './Button.css'

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = props => {
  return <button className="Button" {...props} />
}

export default Button
