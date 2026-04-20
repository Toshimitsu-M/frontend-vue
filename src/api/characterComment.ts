
import axios from 'axios'
import { ref } from 'vue'

const baseUrl = (import.meta as any).env.VITE_API_BASE_URL;

// 型定義
export type CharacterComment = {
  commentId: number
  characterId: string
  userId: string
  commentText: string
}

// ファクトリ関数
export function createCharacterComment(
  commentId: number,
  characterId: string,
  userId: string,
  commentText: string
): CharacterComment {
  return {
    commentId,
    characterId,
    userId,
    commentText
  }
}


//コメントリストAPI取得
export const fetchCharacterComments = async (characterId: string): Promise<CharacterComment[]> => {
    try { 
    const response = await axios.get<CharacterComment[]>(`${baseUrl}/characterComment/all/${characterId}`)
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    return []
  }
}


//コメントの追加、更新API
export const saveCharacterComment = async (commentData: CharacterComment): Promise<void> => {
  const response = await axios.post<string>(`${baseUrl}/characterComment/process`, commentData)
  console.log(response.data)
}

//コメント削除
export const deleteCharacterComment = async (id: number): Promise<void> => {
  await axios.delete<string>(`${baseUrl}/characterComment/delete/${id}`)
}