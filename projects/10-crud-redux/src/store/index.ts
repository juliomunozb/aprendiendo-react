import { configureStore, Tuple, type Middleware } from '@reduxjs/toolkit'
import usersReducer, { userID } from './users/slice'
import { toast } from 'sonner'

export type Action = { type: 'users/deleteUserById'; payload: userID }

const persistanceLocalStorageMiddleware: Middleware =
  store => next => action => {
    next(action)
    localStorage.setItem('_redux_state_', JSON.stringify(store.getState()))
  }
// Se refleja el borrado del usurio en la interfaz
// Posteriormente se hace el sincronizado con base de datos
const syncWithDatabaseMiddleware: Middleware = store => next => action => {
  const { type, payload } = action as Action

  //Fase 1
  next(action)
  if (type === 'users/deleteUserById') {
    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          toast.success(`Usuario ${payload} borrado correctamente`)
        }
      })
      .catch(err => {
        console.log(err)
        console.log('Error')
      })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: () =>
    new Tuple(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
