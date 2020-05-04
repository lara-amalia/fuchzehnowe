import React, { useRef } from 'react'
import { LocalStorageGameInfo } from '../../../types'
import { LOCAL_STORAGE_KEY_STATS } from '../../../util/constants'
import BackLink from '../../ui/BackLink'
import BasicLayout from '../../ui/BasicLayout'

const StatsOverview: React.FC = () => {
  const storedGameIds = useRef(
    window.localStorage.getItem(LOCAL_STORAGE_KEY_STATS),
  )
  let idInfoList: LocalStorageGameInfo[] = []
  if (storedGameIds.current) {
    idInfoList = JSON.parse(storedGameIds.current)
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }

  return (
    <BasicLayout
      title="Spiel Statistiken"
      leftHeaderItem={<BackLink href="/" />}
      alignment="left"
    >
      {idInfoList.length ? (
        <ul>
          {idInfoList.map((idInfo) => (
            <li key={idInfo.id}>
              <a href={`/stats/${idInfo.id}`}>
                <strong>{formatDate(idInfo.created)}</strong> – ID: {idInfo.id}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Keine gespeicherten Spiele.</p>
      )}
    </BasicLayout>
  )
}

export default StatsOverview
