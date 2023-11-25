import { useState } from 'react'
export function TwitterFollowCard ({ children, userName = 'unknow', name }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const text = isFollowing ? 'Siguiendo' : 'Seguir'
  const className = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'
  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img
          className='tw-followCard-avatar'
          src={`https://unavatar.io/${userName}`}
          alt='El avatar de midudev'
        />
        <div className='tw-followCard-info'>
          <strong>{children}</strong>
          <span className='tw-followCard-infoUserName'>@{userName}</span>
        </div>
      </header>
      <aside>
        <button className={className} onClick={handleClick}>
          {text}
        </button>
      </aside>
    </article>
  )
}
