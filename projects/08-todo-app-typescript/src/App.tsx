import { useState } from 'react'
import Todos from './components/Todos'
import { Footer } from './components/Footer'
import { type filterValue, type TodoId, type Todo as TodoType } from './types'
import { TODO_FILTERS } from './const'
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
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setfilterSelected] = useState<filterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: filterValue): void => {
    setfilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completeCount = todos.length - activeCount
  const filterTodo = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <div className='todoapp'>
      <Todos
        onToggleCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filterTodo} />

      <Footer
        activeCount={activeCount}
        completedCount={completeCount}
        filterSelected={filterSelected}
        onClearCompleted={() => { }}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
