import React from 'react'
import Header from '../Header'
import './styles.css'

interface Props {
  title: string
  onBack?: () => void
  userName?: string
}

const BasicLayout: React.FC<Props> = ({
  children,
  title,
  onBack,
  userName,
}) => {
  return (
    <>
      <Header onBack={onBack} userName={userName} />
      <div className="BasicLayout">
        <h1 className="BasicLayout-title">{title}</h1>
        {children}
      </div>
    </>
  )
}

export default BasicLayout
