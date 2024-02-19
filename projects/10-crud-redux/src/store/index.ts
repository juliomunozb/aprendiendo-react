import { configureStore, Tuple, type Middleware } from '@reduxjs/toolkit'
import usersReducer, { rollbackUser, userID } from './users/slice'
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
  const previousState = store.getState()
  next(action)

  if (type === 'users/deleteUserById') {
    // <- eliminado un usuario
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(
      (user: { id: userID }) => user.id === userIdToRemove
    )

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          toast.success(`Usuario ${payload} eliminado correctamente`)
        }
        //throw new Error('Error al eliminar el usuario')
      })
      .catch(err => {
        toast.error(`Error deleting user ${userIdToRemove}`)
        if (userToRemove) store.dispatch(rollbackUser(userToRemove))
        console.log(err)
        console.log('error')
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
