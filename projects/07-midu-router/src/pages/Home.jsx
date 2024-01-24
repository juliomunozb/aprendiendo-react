import { Link } from '../components/Link.jsx'
export default function HomePage () {
  return (
    <>
      <h1>Home</h1>
      <p>Página de ejemplo para crear un react router desde cero</p>
      <Link to='/about'>Ir a sobre nosotros</Link>
    </>
  )
}
