import { API_URL_ROOT, ACTIONS_PATH } from '../utils/const'
export interface Comment {
  title: string
  message: string
  preview?: boolean
}
export interface CommentWithId extends Comment {
  id: string
}
export const getComments = async () => {
  const respoonse = await fetch(`${API_URL_ROOT}${ACTIONS_PATH.GET}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': import.meta.env.VITE_X_MASTER_KEY, // se agrega el simbolo \ antes del caracter especial $
      'X-Access-Key': import.meta.env.VITE_X_ACCESS_KEY,
    },
  })
  if (!respoonse.ok) {
    throw new Error('Failed to fetch comment')
  }
  const json = await respoonse.json()
  return json?.record
}

const delay = async (ms: number) =>
  await new Promise(resolve => setTimeout(resolve, ms))
export const postComment = async (comment: Comment) => {
  await delay(1000)
  /* throw new Error('Error') */
  const comments = await getComments()
  const id = crypto.randomUUID()
  const newComment = { ...comment, id }
  const commentsToSave = [...comments, newComment]
  const response = await fetch(`${API_URL_ROOT}${ACTIONS_PATH.PUT}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': import.meta.env.VITE_X_MASTER_KEY, // se agrega el simbolo \ antes del caracter especial $
      'X-Access-Key': import.meta.env.VITE_X_ACCESS_KEY,
    },
    body: JSON.stringify(commentsToSave),
  })

  if (!response.ok) {
    throw new Error('Failed to post comment')
  }
  return newComment
}
