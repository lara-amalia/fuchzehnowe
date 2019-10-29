import React from 'react'
import Header from '../Header'
import './styles.css'

interface Props {
  title: string
  onBack?: () => void
}

const BasicLayout: React.FC<Props> = ({ children, title, onBack }) => {
  return (
    <>
      <Header onBack={onBack} />
      <div className="BasicLayout">
        <h1 className="BasicLayout-title">{title}</h1>
        {children}
      </div>
    </>
  )
}

export default BasicLayout
