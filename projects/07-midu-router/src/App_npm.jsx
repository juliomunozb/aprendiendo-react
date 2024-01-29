import './App.css'
import { Router, Route, Link } from 'jrmb-midu-router'
// Importación dinámica

function App () {
  return (
    <main>
      <Router>
        <Route
          path='/' Component={() => {
            return (
              <>
                <h1>Home</h1>
                <p>Home</p>
                <Link to='/about'>Ir a About</Link>
              </>
            )
          }}
        />
        <Route
          path='/about' Component={() => {
            return (
              <>
                <h1>About</h1>
                <p>About</p>
                <Link to='/'>Ir a home</Link>
              </>
            )
          }}
        />
      </Router>

    </main>
  )
}

export default App
