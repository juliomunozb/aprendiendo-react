import { Link } from '../components/Link.jsx'
export default function Page404 () {
  return (
    <>
      <div>
        <h1>Page not found</h1>
        <img src='https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_1280.png' alt='imagen que muestra el numero 404' />
      </div>
      <Link to='/'> Volver a la pantalla principal</Link>
    </>
  )
}
