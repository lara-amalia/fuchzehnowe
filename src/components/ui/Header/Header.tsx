import React from 'react'
import Button from '../Button'
import './styles.css'

interface Props {
  leftItem?: React.ReactNode
  userName?: string
}

const Header: React.FC<Props> = ({ leftItem, userName }) => {
  return (
    <header className="Header">
      {leftItem && <div className="Header-left-actions">{leftItem}</div>}
      <span className="Header-title">15 owe</span>
      {userName && <span className="Header-username">{userName}</span>}
    </header>
  )
}

export default Header
