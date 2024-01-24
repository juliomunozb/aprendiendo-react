import { Link } from '../components/Link.jsx'

const i18n = {
  es: {
    title: 'Acerca de mi',
    button: 'Ir al Home',
    description: 'Hola, soy Julio y estoy practicando react, creando un clone de React Router'
  },
  en: {
    title: 'About',
    button: 'Go to Home',
    description: 'Hi, I am Julio and I am practicing react, creating a React Router clone'
  }
}
const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}
export default function AboutPage ({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')
  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img src='https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4fdce208-7949-4e0b-9bd1-649fd8d50b82%2Fimg-perfil-final-2.png?table=block&id=5d6abebf-6ffe-4554-814c-69361d834594&spaceId=57a3b57a-8058-45f2-8edd-96ecd7ab6893&width=250&userId=f5b820be-8baf-4127-859f-0b6877d921e9&cache=v2' alt='Imagen Julio Munoz' />
        <p>
          {i18n.description}
        </p>
      </div>
      <Link to='/'>{i18n.button}</Link>
    </>
  )
}
