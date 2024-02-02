// types.d.ts = Que el archivo no va a tener código, solo las declaraciones de los types
// Cuando se quiere escribir el contrato de un objeto se una una Interfaz
export interface State {
  fromLanguage: string
  toLanguage: string
  fromText: string
  result: string
  loagin: false
}

export type Action =
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_FROM_LANGUAGE'; payload: string }
  | { type: 'SET_TO_LANGUAGE'; payload: string }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string }
