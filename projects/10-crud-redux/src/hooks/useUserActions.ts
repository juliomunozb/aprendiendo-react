import { User, addNewUser, deleteUserById, userID } from '../store/users/slice'
import { useAppDispatch } from './store'

export const useUserActions = () => {
  const dispatch = useAppDispatch()
  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }
  const removeUser = (id: userID) => {
    dispatch(deleteUserById(id))
  }
  return { addUser, removeUser }
}
