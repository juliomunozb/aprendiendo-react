import './App.css'
import { TwitterFollowCard } from './components/TwitterFollowCard'
export function App () {
  return (
    <section className='App'>
      <TwitterFollowCard userName='midudev' isFollowing={false}>
        Miguel Angel Duran
      </TwitterFollowCard>
      <TwitterFollowCard userName='pheralb' isFollowing>
        Pablo Mopreno
      </TwitterFollowCard>
      <TwitterFollowCard name='Paco Hdez' isFollowing>
        Pablo Mopreno
      </TwitterFollowCard>
    </section>
  )
}
