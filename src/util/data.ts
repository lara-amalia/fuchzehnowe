import { Id } from '../types'

export function unwrapDocument<T extends object>(
  snapshot: firebase.firestore.DocumentSnapshot,
): (T & Id) | undefined {
  const data = snapshot.data()

  if (!data) {
    return
  }

  return {
    ...(data as T),
    id: snapshot.id,
  }
}

export function unwrapQuery<T extends object>(
  snapshot: firebase.firestore.QuerySnapshot,
): (T & Id)[] {
  return snapshot.docs.map(s => ({
    ...(s.data() as T),
    id: s.id,
  }))
}
