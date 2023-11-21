// types.d.ts = Que el archivo no va a tener código, solo las declaraciones de los types
// Types: Significa que es un archivo de types
// d: Que son las declaraciones
export interface Todo {
  id: string
  title: string
  completed: boolean
}
// Para que sea mas escalable, para los datos de negocio es recomendable tener los tipos separados
export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>
export type TodoIdCompleted = Pick<TodoType, 'id' | 'completed'>

export type ListOfTodos = Todo[]
