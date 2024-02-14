import { createSlice } from '@reduxjs/toolkit'

export interface users {
  name: string
  email: string
  github: string
}

export interface UserWhithId extends users {
  id: string
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
  reducers: {},
})

export default userSlice.reducer
