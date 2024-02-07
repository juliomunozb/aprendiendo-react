import { useReducer } from 'react'
import {
  type State,
  type Action,
  type FromLanguage,
  type Language
} from '../types.d'

// 1. create a InitialState
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// 2. create a reducer
function reduce(state: State, action: Action) {
  // pauload -> lo siguiente que se le pasa en cada acción
  const { type } = action
  if (type === 'INTERCHANGE_LANGUAGES') {
    // Logica dentro del reducer
    // se evita dentro del componente
    if (state.fromLanguage === 'auto') return state
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      fromLanguage: action.payload,
      reesult: '',
      loading
    }
  }
  if (type === 'SET_TO_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      toLanguage: action.payload,
      reesult: '',
      loading
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''
    return {
      ...state,
      loading,
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

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reduce, initialState)

  const interchangeLanguage = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }
  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }
  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }
  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
