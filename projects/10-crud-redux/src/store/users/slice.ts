import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
export type userID = string
export interface users {
  name: string
  email: string
  github: string
}

export interface UserWhithId extends users {
  id: userID
}

const initialState: UserWhithId[] = [
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

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<userID>) => {
      const id = action.payload
      return state.filter(user => user.id !== id)
    },
  },
})

export default userSlice.reducer
export const { deleteUserById } = userSlice.actions
