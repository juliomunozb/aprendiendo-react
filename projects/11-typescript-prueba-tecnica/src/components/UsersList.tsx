import { SortBy, type User } from '../types.d'
interface Props {
  changeSorting: (sort: SortBy) => void
  deleteUser: (email: string) => void
  users: User[]
  showColors: boolean
}
export function UsersList({
  changeSorting,
  deleteUser,
  users,
  showColors,
}: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th
            className='pointer'
            onClick={() => {
              changeSorting(SortBy.NAME)
            }}
          >
            Nombre
          </th>
          <th
            className='pointer'
            onClick={() => {
              changeSorting(SortBy.LAST)
            }}
          >
            Apellido
          </th>
          <th
            className='pointer'
            onClick={() => {
              changeSorting(SortBy.COUNTRY)
            }}
          >
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgroundColor : 'transparent'
          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <th>
                <img src={user.picture.thumbnail} />
              </th>
              <th>{user.name.first}</th>
              <th>{user.name.last}</th>
              <th>{user.location.country}</th>
              <th>
                <button
                  onClick={() => {
                    deleteUser(user.email)
                  }}
                >
                  Borrar
                </button>
              </th>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
