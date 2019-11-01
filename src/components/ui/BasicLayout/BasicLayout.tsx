import React from 'react'
import Header from '../Header'
import './styles.css'
import clsx from 'clsx'

interface Props {
  title: string
  onBack?: () => void
  userName?: string
  alignment?: 'center' | 'left'
}

const BasicLayout: React.FC<Props> = ({
  children,
  title,
  onBack,
  userName,
  alignment,
}) => {
  return (
    <>
      <Header onBack={onBack} userName={userName} />
      <div className={clsx('BasicLayout', `BasicLayout--${alignment}`)}>
        <h1 className="BasicLayout-title">{title}</h1>
        {children}
      </div>
    </>
  )
}

export default BasicLayout
