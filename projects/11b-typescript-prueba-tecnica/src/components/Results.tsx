import { useUsers } from '../hooks/useUsers'

export const Results = () => {
  const { users } = useUsers()
  return <h4>Results: {users?.length}</h4>
}
