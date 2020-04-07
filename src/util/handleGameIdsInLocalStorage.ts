import { GameInfo, LocalStorageGameInfo } from '../types'
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_STATS } from './constants'

/**
 * Adds a new game ID object to the array that holds the last 10
 * game IDs for loading game stats of those games.
 * Data is stored in the browser's local storage.
 */
export const storeGameIdToLocalStorage = (gameInfo: GameInfo): void => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameInfo))

  const currentGameIdEntries = window.localStorage.getItem(
    LOCAL_STORAGE_KEY_STATS,
  )

  if (!currentGameIdEntries) {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY_STATS,
      JSON.stringify([
        {
          id: gameInfo.gameId,
          created: Date.now(),
        },
      ]),
    )
    return
  }

  const gameIdArray = JSON.parse(currentGameIdEntries!)

  // Only add the given ID if it's not stored already
  const idAlreadyStored = gameIdArray.some(
    (entry: LocalStorageGameInfo) => entry.id === gameInfo.gameId,
  )
  if (idAlreadyStored) {
    return
  }

  window.localStorage.setItem(
    LOCAL_STORAGE_KEY_STATS,
    JSON.stringify(
      [
        {
          id: gameInfo.gameId,
          created: Date.now(),
        },
        ...gameIdArray,
      ].slice(0, 10),
    ),
  )
}

/**
 * Removes the given ID from local storage and from the array that holds the last 10
 * game IDs for loading game stats of those games.
 */
export const removeGameFromLocalStorage = (id: string, keepStatistics = false): void => {
  // Remove game (continue game no longer available)
  window.localStorage.removeItem(LOCAL_STORAGE_KEY)

  if (keepStatistics) {
    return;
  }

  // Remove game from list of IDs
  const currentGameIdEntries = window.localStorage.getItem(
    LOCAL_STORAGE_KEY_STATS,
  )

  if (currentGameIdEntries) {
    const newGameIdArray = JSON.parse(currentGameIdEntries).filter(
      (entry: LocalStorageGameInfo) => entry.id !== id,
    )

    window.localStorage.setItem(
      LOCAL_STORAGE_KEY_STATS,
      JSON.stringify(newGameIdArray),
    )
  }
}
