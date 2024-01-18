import './App.css'
import HomePage from './pages/Home.jsx'
import AboutPage from './pages/About.jsx'
import Page404 from './pages/Page404.jsx'
import { Search } from './pages/Search.jsx'
import { Router } from './Router.jsx'
import { Route } from './Route.jsx'

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

    },
    {
      path: '/search/:query',
      Component: Search
    }
  ]
  return (
    <main>
      <Router routes={appRoutes} defaultComponent={Page404}>
        <Route path='/' Component={HomePage} />
        <Route path='/about' Component={AboutPage} />
      </Router>
    </main>
  )
}

export default App
