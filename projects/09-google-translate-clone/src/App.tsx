import { useReducer } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { type State, type Action } from './types.d'
// 1. create a InitialState
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loagin: false
}

// 2. create a reducer
function reduce(state: State, action: Action) {
  // pauload -> lo siguiente que se le pasa en cada acción
  const { type } = action
  if (type === 'INTERCHANGE_LANGUAGES') {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }
  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

function App() {
  // 3. usar el hook useReducer
  const [{ fromLanguage }, dispatch] = useReducer(reduce, initialState)
  console.log({ fromLanguage })

  return (
    <>
      <div>
        <h1>Google Translate</h1>
        <button
          onClick={() => {
            dispatch({ type: 'SET_FROM_LANGUAGE', payload: 'es' })
          }}
        >
          Cambiar a Español
        </button>
        {fromLanguage}
      </div>
    </>
  )
}

export default App
