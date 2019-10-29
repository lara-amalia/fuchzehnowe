import React from 'react'
import clsx from 'clsx'
import './Button.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon'
}

const Button: React.FC<Props> = ({ variant = 'primary', ...rest }) => {
  return <button className={clsx('Button', `Button--${variant}`)} {...rest} />
}

export default Button
