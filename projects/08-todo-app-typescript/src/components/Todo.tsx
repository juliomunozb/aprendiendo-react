import React, { useRef, useState, useEffect } from 'react'
import { type Todo as TodoType, type TodoId, type TodoIdCompleted } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: TodoIdCompleted) => void
  setTitle: (params: Omit<TodoType, 'completed'>) => void
  isEditing: string
  setIsEditing: (completed: string) => void
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  setTitle,
  setIsEditing,
  isEditing,
  onRemoveTodo,
  onToggleCompleteTodo
}) => {
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleteTodo(
      {
        id,
        completed: event.target.checked
      }
    )
  }
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())
      if (editedTitle !== title) { setTitle({ id, title: editedTitle }) }
      if (editedTitle === '') { onRemoveTodo({ id }) }
      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])
  return (
    <>
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
      <input
        className='edit'
        value={editedTitle}
        onChange={(e) => { setEditedTitle(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitle}
      />
    </>
  )
}
