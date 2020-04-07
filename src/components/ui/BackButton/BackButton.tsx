import React from 'react'
import ArrowBackIcon from '../ArrowBackIcon'
import Button from '../Button'

const BackButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = props => (
  <Button aria-label="Zurück" variant="icon" {...props}>
    <ArrowBackIcon />
  </Button>
)

export default BackButton
