import React from 'react'
import Header from '../Header'
import './styles.css'

const InitLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className="InitLayout">{children}</div>
    </>
  )
}

export default InitLayout
