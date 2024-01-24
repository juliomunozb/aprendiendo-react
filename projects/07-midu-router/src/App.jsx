import { lazy, Suspense } from 'react'
import './App.css'
import Page404 from './pages/Page404.jsx'// Importación estática
import { Search } from './pages/Search.jsx'
import { Router } from './components/Router.jsx'
import { Route } from './components/Route.jsx'

// Importación dinámica
const lazyHome = lazy(() => import('./pages/Home.jsx'))
const lazyAbout = lazy(() => import('./pages/About.jsx'))

function App () {
// Objeto que declara la ruta
  const appRoutes = [
    {
      path: '/:lang/about',
      Component: lazyAbout
    },
    {
      path: '/search/:query',
      Component: Search
    }
  ]
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={lazyHome} />
          <Route path='/about' Component={lazyAbout} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
