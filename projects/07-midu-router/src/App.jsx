import { useState } from 'react'
import './App.css'

function Home () {
  return (
    <>
      <h1>Home</h1>
      <p>Página de ejemplo para crear un react router desde cero</p>
      <a href='/about'>Ir a sobre nosotros</a>
    </>
  )
}

function About () {
  return (
    <>
      <h1>About</h1>
      <div>
        <img src='https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4fdce208-7949-4e0b-9bd1-649fd8d50b82%2Fimg-perfil-final-2.png?table=block&id=5d6abebf-6ffe-4554-814c-69361d834594&spaceId=57a3b57a-8058-45f2-8edd-96ecd7ab6893&width=250&userId=f5b820be-8baf-4127-859f-0b6877d921e9&cache=v2' alt='Imagen Julio Munoz' />
        <p>
          Hola, me llamo Julio y estoy practicando react, creando un clon de React Router
        </p>
      </div>
      <a href='/'>Ir al home </a>
    </>
  )
}

function App () {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  console.log(currentPath)
  return (
    <main>
      {currentPath === '/' && <Home />}
      {currentPath === '/about' && <About />}
    </main>
  )
}

export default App
