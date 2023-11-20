// types.d.ts = Que el archivo no va a tener código, solo las declaraciones de los types
// Types: Significa que es un archivo de types
// d: Que son las declaraciones
export interface Todo {
  id: string
  title: string
  completed: boolean
}

export type ListOfTodos = Todo[]
