export const fetchUsers = async ({ pageParam = 1 }: { pageParam: number }) => {
  return await fetch(
    `https://randomuser.me/api/?results=10&seed=users&page=${pageParam}`
  )
    .then(async res => {
      // Validar si ha fallado la peticion asíncrona
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then(res => {
      const currentPage = Number(res.info.page)
      const nextCursor = currentPage > 3 ? undefined : currentPage + 1

      return {
        users: res.results,
        nextCursor,
      }
    })
}
