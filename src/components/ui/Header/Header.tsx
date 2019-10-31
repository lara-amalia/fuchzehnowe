import React from 'react'
import Button from '../Button'
import './Header.css'

interface Props {
  onBack?: () => void
  userName?: string
}

const Header: React.FC<Props> = ({ onBack, userName }) => {
  return (
    <header className="Header">
      {onBack && (
        <div className="Header-left-actions">
          <Button onClick={onBack} aria-label="Zurück" variant="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#ffffff"
            >
              <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
            </svg>
          </Button>
        </div>
      )}
      <span className="Header-title">15 owe</span>
      {userName && <span className="Header-username">{userName}</span>}
    </header>
  )
}

export default Header
