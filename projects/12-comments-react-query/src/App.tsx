import './App.css'
import { useQuery, useMutation } from '@tanstack/react-query'
import { API_URL_ROOT, ACTIONS_PATH } from './utils/const'

export interface Comment {
  title: string
  message: string
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

export const postComment = async (comment: Comment) => {
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

function App() {
  const { data, isLoading, error } = useQuery<CommentWithId[]>({
    queryKey: ['comments'],
    queryFn: getComments,
  })

  const { mutate } = useMutation({
    mutationFn: async (comment: Comment) => await postComment(comment),
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = formData.get('title')?.toString() ?? ''
    const message = formData.get('message')?.toString() ?? ''
    const newMessage = { title, message }
    if (title !== '' && message !== '') {
      console.log(newMessage)
      mutate(newMessage)
    }
  }

  return (
    <main>
      <div className='comments'>
        {isLoading && <strong>Cargando..</strong>}
        {error !== null && <strong>Algo salió mal</strong>}

        <ul className='list-comments'>
          {data?.map(comment => (
            <li key={comment.id}>
              <h4>{comment.title}</h4>
              {comment.message}
            </li>
          ))}
        </ul>
      </div>
      <div className='create-comments'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='title'></label>
            <input type='text' id='title' name='title' placeholder='title' />
          </div>
          <div>
            <textarea name='message' placeholder='comment'></textarea>
          </div>
          <button>Send comment</button>
        </form>
      </div>
    </main>
  )
}

export default App
