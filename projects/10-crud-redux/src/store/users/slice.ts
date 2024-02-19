import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
export type userID = string
export interface User {
  name: string
  email: string
  github: string
}

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'yazmanito',
    email: 'yazmanito@gmail.com',
    github: 'midudev',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'leo@gmail.com',
    github: 'leo',
  },
  {
    id: '3',
    name: 'Julio Mendez',
    email: 'Julio@gmail.com',
    github: 'juliomunozb',
  },
]

export interface UserWhithId extends User {
  id: userID
}

//Manejo del estado inicial con localtorage
//1. Opcion uno
/*let initialState: UserWhithId[] = DEFAULT_STATE
const presistedState = localStorage.getItem('_redux_state_')
if (presistedState) {
  initialState = JSON.parse(presistedState).users
}*/

//2. Opción 2. utilizando un clousure
const initialState: UserWhithId[] = (() => {
  const presistedState = localStorage.getItem('_redux_state_')
  return presistedState ? JSON.parse(presistedState).users : DEFAULT_STATE
})()

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      // Crear nuevo estado a partir del anterior
      // Pasamos el estado ...state
      // Agregamos el nuevo usuario { id, ...action.payload }
      state.push({ id, ...action.payload })
    },
    deleteUserById: (state, action: PayloadAction<userID>) => {
      const id = action.payload
      return state.filter(user => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWhithId>) => {
      const isUserAlreadyDefined = state.some(
        user => user.id === action.payload.id
      )
      if (!isUserAlreadyDefined) {
        state.push(...state, action.payload)
      }
    },
  },
})

export default userSlice.reducer
export const { addNewUser, deleteUserById, rollbackUser } = userSlice.actions
