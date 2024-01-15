import { navigate } from '../App.jsx'
export default function Home () {
  return (
    <>
      <h1>Home</h1>
      <p>Página de ejemplo para crear un react router desde cero</p>
      <button onClick={() => navigate('/about')}>Ir a sobre nosotros</button>
    </>
  )
}
