import { deleteUserById, userID } from '../store/users/slice'
import { useAppDispatch } from './store'

export const useUserActions = () => {
  const dispatch = useAppDispatch()
  const removeUser = (id: userID) => {
    dispatch(deleteUserById(id))
  }
  return { removeUser }
}
