import { type SUPPORTED_LANGUAGES, type AUTO_LANGUAGE } from './constants'
// types.d.ts = Que el archivo no va a tener código, solo las declaraciones de los types
// Cuando se quiere escribir el contrato de un objeto se una una Interfaz
export interface State {
  fromLanguage: string
  toLanguage: string
  fromText: string
  result: string
  loading: boolean
}

export type Action =
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_FROM_LANGUAGE'; payload: string }
  | { type: 'SET_TO_LANGUAGE'; payload: string }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string }

// typeof SUPPORTED_LANGUAGES -> Copia del contrado del Objeto SUPPORTED_LANGUAGES
// keyof -> Del objeto SUPPORTED_LANGUAGES se optienes las keys | "en" | "es" | "de"
export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage
