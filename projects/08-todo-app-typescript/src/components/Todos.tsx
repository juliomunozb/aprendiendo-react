import { type ListOfTodos, type TodoId, type TodoIdCompleted } from '../types'
import { Todo } from './Todo'
interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: TodoIdCompleted) => void
}
// Se pasa un tipo generico por que la Props pueden tener cualquier forma
// Se debe indicar la forma que tienen las Props
const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleteTodo }) => {
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompleteTodo={onToggleCompleteTodo}
          />
        </li>
      ))}
    </ul>
  )
}

export default Todos
