import { configureStore, Tuple, type Middleware } from '@reduxjs/toolkit'
import usersReducer from './users/slice'

const persistanceLocalStorageMiddleware: Middleware =
  store => next => action => {
    next(action)
    localStorage.setItem('_redux_state_', JSON.stringify(store.getState()))
  }

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: () => new Tuple(persistanceLocalStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
