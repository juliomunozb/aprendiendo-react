import { type ListOfTodos, type TodoId } from '../types'
import { Todo } from './Todo'
interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
}
// Se pasa un tipo generico por que la Props pueden tener cualquier forma
// Se debe indicar la forma que tienen las Props
const Todos: React.FC<Props> = ({ todos, onRemoveTodo }) => {
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
          />
        </li>
      ))}
    </ul>
  )
}

export default Todos
