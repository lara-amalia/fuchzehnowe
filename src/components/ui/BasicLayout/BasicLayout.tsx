import React from 'react'
import Header from '../Header'
import './styles.css'
import clsx from 'clsx'

interface Props {
  title: string
  leftHeaderItem?: React.ReactNode
  userName?: string
  alignment?: 'center' | 'left'
}

const BasicLayout: React.FC<Props> = ({
  children,
  title,
  leftHeaderItem,
  userName,
  alignment,
}) => {
  return (
    <>
      <Header leftItem={leftHeaderItem} userName={userName} />
      <div className={clsx('BasicLayout', alignment && `BasicLayout--${alignment}`)}>
        <h1 className="BasicLayout-title">{title}</h1>
        {children}
      </div>
    </>
  )
}

export default BasicLayout
