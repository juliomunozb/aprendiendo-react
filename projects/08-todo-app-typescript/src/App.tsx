import { useState } from 'react'
import Todos from './components/Todos'
const mockTodos = [
  {
    id: '1',
    title: 'Tarea 1',
    completed: true
  },
  {
    id: '2',
    title: 'Tarea 2',
    completed: false
  },
  {
    id: '3',
    title: 'Tarea 3',
    completed: false
  }
]
const App = (): JSX.Element => {
  const [todos] = useState(mockTodos)

  return (
    <div className='todoapp'>
      <Todos todos={todos} />
    </div>
  )
}

export default App
