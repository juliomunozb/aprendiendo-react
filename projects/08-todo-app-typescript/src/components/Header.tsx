import { type TodoTitle } from '../types'
import { CreateTodo } from './CreateTodo'

interface Props {
  onAddTodo: ({ title }: TodoTitle) => void
}
export const Header: React.FC<Props> = ({ onAddTodo }) => {
  return (
    <header>
      <h1>Todo <img
        style={{ width: '60px', height: 'auto' }}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png" alt="" />
      </h1>
      <CreateTodo saveTodo={onAddTodo} />
    </header>
  )
}
