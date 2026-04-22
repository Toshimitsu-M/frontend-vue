import axios from 'axios'
import { getAuth } from 'firebase/auth'

const baseUrl = (import.meta as any).env.VITE_API_BASE_URL

export type Favorite = {
  userId: string
  characterId: string
  characterName: string
  characterImage: string
  createdAt: string
}

const getAuthHeader = async (): Promise<{ Authorization: string }> => {
  const currentUser = getAuth().currentUser
  if (!currentUser) throw new Error('Not logged in')
  const token = await currentUser.getIdToken()
  return { Authorization: `Bearer ${token}` }
}

export const fetchFavorites = async (): Promise<Favorite[]> => {
  try {
    const headers = await getAuthHeader()
    const response = await axios.get<Favorite[]>(`${baseUrl}/favorite`, { headers })
    return response.data
  } catch (error) {
    console.error('お気に入り取得エラー:', error)
    return []
  }
}

export const addFavorite = async (
  characterId: string,
  characterName: string,
  characterImage: string
): Promise<void> => {
  const headers = await getAuthHeader()
  await axios.post(
    `${baseUrl}/favorite/${characterId}`,
    { characterName, characterImage },
    { headers }
  )
}

export const removeFavorite = async (characterId: string): Promise<void> => {
  const headers = await getAuthHeader()
  await axios.delete(`${baseUrl}/favorite/${characterId}`, { headers })
}
