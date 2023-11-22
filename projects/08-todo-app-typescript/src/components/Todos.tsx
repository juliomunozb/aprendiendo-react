import { useState } from 'react'
import { type ListOfTodos, type TodoId, type TodoIdCompleted, type Todo as TodoType } from '../types'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: TodoIdCompleted) => void
  // Se estrae del Tipo Todo el item completed, los argumentos de la función seria asi:
  // params: { id: string, title: string }
  setTitle: (params: Omit<TodoType, 'completed'>) => void
}
// Se pasa un tipo generico por que la Props pueden tener cualquier forma
// Se debe indicar la forma que tienen las Props
const Todos: React.FC<Props> = ({
  todos,
  onRemoveTodo,
  onToggleCompleteTodo,
  setTitle
}) => {
  const [isEditing, setIsEditing] = useState('')
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => { setIsEditing(todo.id) }}
          className={`
          ${todo.completed ? 'completed' : ''}
          ${isEditing === todo.id ? 'editing' : ''}
          `}

        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            setTitle={setTitle}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompleteTodo={onToggleCompleteTodo}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  )
}

export default Todos
