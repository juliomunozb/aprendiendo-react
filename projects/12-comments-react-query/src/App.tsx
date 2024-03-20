import './App.css'
function App() {
  return (
    <main>
      <div className='comments'>
        <ul className='list-comments'>
          <li>coment1</li>
          <li>coment2</li>
        </ul>
      </div>
      <div className='create-comments'>
        <form action=''>
          <div>
            <label htmlFor='title'></label>
            <input type='text' id='title' placeholder='title' />
          </div>
          <div>
            <textarea placeholder='comment'></textarea>
          </div>
          <button>Send comment</button>
        </form>
      </div>
    </main>
  )
}

export default App
