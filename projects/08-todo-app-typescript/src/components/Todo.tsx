import React from 'react'
import { type Todo as TodoType, type TodoId, type TodoIdCompleted } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: TodoIdCompleted) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleteTodo }) => {
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleteTodo(
      {
        id,
        completed: event.target.checked
      }
    )
  }
  return (
    <div className='view'>
      <input
        type="checkbox"
        className='toggle'
        checked={completed}
        onChange={handleChangeCheckbox}
      />
      <label>{title}</label>
      <button
        className='destroy'
        onClick={() => { onRemoveTodo({ id }) }}
      />
    </div>
  )
}
