import { type User } from '../types'
interface Props {
  users: User[]
}
export function UsersList({ users }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <tr key={user.id.value}>
              <th>
                <img src={user.picture.thumbnail} />
              </th>
              <th>{user.name.first}</th>
              <th>{user.name.last}</th>
              <th>{user.location.country}</th>
              <th>
                <button>Editar</button>
              </th>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
