import React from 'react'
import BasicLayout from '../../../ui/BasicLayout'
import './styles.css'

interface Props {
  onBack: () => void
}

const InitRules: React.FC<Props> = ({ onBack }) => {
  return (
    <BasicLayout title="Spielregeln" onBack={onBack}>
      <p>... coming soon</p>
    </BasicLayout>
  )
}

export default InitRules
