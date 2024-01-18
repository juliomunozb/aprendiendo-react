import './App.css'
import HomePage from './pages/Home.jsx'
import AboutPage from './pages/About.jsx'
import { Route } from './Router.jsx'

function App () {
// Objeto que declara la ruta
  const appRoutes = [
    {
      path: '/',
      Component: HomePage
    },
    {
      path: '/about',
      Component: AboutPage

    }
  ]
  return (
    <main>
      <Route routes={appRoutes} />
    </main>
  )
}

export default App
