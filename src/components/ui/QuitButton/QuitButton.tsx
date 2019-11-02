import React from 'react'
import Button from '../Button'

const QuitButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = props => (
  <Button aria-label="Spiel verlassen" variant="icon" {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="#ffffff"
    >
      <path d="M13.91,8.41,12.5,7l-5,5,5,5,1.41-1.41L11.33,13H21V11H11.33ZM5,21H19a2,2,0,0,0,2-2V15H19v4H5V5H19V9h2V5a2,2,0,0,0-2-2H5A2,2,0,0,0,3,5V19A2,2,0,0,0,5,21Z" />
    </svg>
  </Button>
)

export default QuitButton
