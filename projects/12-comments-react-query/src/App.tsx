import { useEffect, useState } from 'react'
import './App.css'

export interface Comment {
  title: string
  message: string
}
export interface CommentWithId extends Comment {
  id: string
}
export const getComments = async () => {
  const respoonse = await fetch(
    'https://api.jsonbin.io/v3/b/65fb38aadc74654018b5d2d1',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': import.meta.env.VITE_X_MASTER_KEY, // se agrega el simbolo \ antes del caracter especial $
        'X-Access-Key': import.meta.env.VITE_X_ACCESS_KEY,
      },
    }
  )
  if (!respoonse.ok) {
    throw new Error('Failed to fetch comment')
  }
  const json = await respoonse.json()
  return json?.record
}

function App() {
  const [data, setData] = useState<CommentWithId[]>([])

  useEffect(() => {
    getComments()
      .then(response => {
        setData(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <main>
      <div className='comments'>
        <ul className='list-comments'>
          {data.map(comment => (
            <li key={comment.id}>
              <h4>{comment.title}</h4>
              {comment.message}
            </li>
          ))}
        </ul>
      </div>
      <div className='create-comments'>
        <form action=''>
          <div>
            <label htmlFor='title'></label>
            <input type='text' id='title' placeholder='title' />
          </div>
          <div>
            <textarea placeholder='comment'></textarea>
          </div>
          <button>Send comment</button>
        </form>
      </div>
    </main>
  )
}

export default App
