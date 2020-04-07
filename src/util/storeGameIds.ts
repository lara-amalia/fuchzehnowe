import { LOCAL_STORAGE_KEY_STATS } from './constants'

export const storeGameIdToLocalStorage = (newId: string): void => {
  const currentGameIdEntries = window.localStorage.getItem(
    LOCAL_STORAGE_KEY_STATS,
  )

  if (!currentGameIdEntries) {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY_STATS,
      JSON.stringify([{
        id: newId,
        created: Date.now()
      }]),
    )
    return
  }

  const gameIdArray = JSON.parse(currentGameIdEntries!)
  window.localStorage.setItem(
    LOCAL_STORAGE_KEY_STATS,
    JSON.stringify([{
      id: newId,
      created: Date.now()
    }, ...gameIdArray].slice(0, 10)),
  )
}
