import './App.css'
import { TwitterFollowCard } from './components/TwitterFollowCard'
export function App () {
  const users = [
    {
      userName: 'midudev',
      name: 'Miguel Angel Durán',
      isFollowing: false
    },
    {
      userName: 'pheralb',
      name: 'Pablo H',
      isFollowing: false
    },
    {
      userName: 'PacoHdezs',
      name: 'Paco Hdez',
      isFollowing: true
    },
    {
      userName: 'TMChein',
      name: 'Tomas',
      isFollowing: true
    }
  ]
  return (
    <section className='App'>
      {
        users.map(({ userName, name, isFollowing }) =>
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        )
      }

    </section>
  )
}
