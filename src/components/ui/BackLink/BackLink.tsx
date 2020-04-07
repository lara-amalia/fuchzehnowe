import React from 'react'
import ArrowBackIcon from '../ArrowBackIcon'
import './styles.css'

interface Props {
  href: string
}

const BackLink: React.FC<Props> = ({ href }) => (
  <a href={href} aria-label="Zurück" className="BackLink">
    <ArrowBackIcon />
  </a>
)

export default BackLink
