import './App.css'
import { TwitterFollowCard } from './components/TwitterFollowCard'
export function App () {
  return (
    <section className='App'>
      <TwitterFollowCard userName='midudev' initialIsFollowing>
        Miguel Angel Duran
      </TwitterFollowCard>
      <TwitterFollowCard userName='pheralb'>
        Pablo Mopreno
      </TwitterFollowCard>
      <TwitterFollowCard name='Paco Hdez'>
        Pablo Mopreno
      </TwitterFollowCard>
    </section>
  )
}
