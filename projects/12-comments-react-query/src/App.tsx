import {
  getComments,
  type Comment,
  type CommentWithId,
  postComment,
} from './service/comments'
import { Result } from './components/Result'
import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FormInput, FormTextArea } from './components/Form'
import { useRef } from 'react'

function App() {
  const refForm = useRef<null | HTMLFormElement>(null)
  const { data, isLoading, error } = useQuery<CommentWithId[]>({
    queryKey: ['comments'],
    queryFn: getComments,
  })

  const queryClient = useQueryClient()
  const { mutate, isPending: isLoadingMutation } = useMutation({
    mutationFn: async (comment: Comment) => await postComment(comment),
    onMutate: async newComment => {
      // Guardando el estado previo
      // por si se necesita hacer un rollback
      const previousComments = queryClient.getQueryData(['comments'])
      queryClient.setQueriesData(
        { queryKey: ['comments'] },
        (oldData?: Comment[]) => {
          const newCommentToAdd = structuredClone(newComment)
          newCommentToAdd.preview = true
          if (oldData == null) return [newCommentToAdd]
          return [...oldData, newCommentToAdd]
        }
      )
      return { previousComments } // --> context
    },
    onError: (error, variables, context) => {
      console.error(error)
      if (context?.previousComments != null) {
        queryClient.setQueriesData(
          { queryKey: ['comments'] },
          context?.previousComments
        )
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
    onSuccess: async newComment => {
      refForm.current?.reset()
      console.log('onSucces:', newComment)

      // 1. Actualizar el cache de react query manualmente
      /* queryClient.setQueriesData(
        { queryKey: ['comments'] },
        (oldData?: CommentWithId[]) => {
          if (oldData == null) return [newComment]
          return [...oldData, newComment]
        }
      ) */
      // 2. Hacer otra vez un refresh de la query
      /* await queryClient.invalidateQueries({
        queryKey: ['comments'],
      }) */
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isLoadingMutation) return
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = formData.get('title')?.toString() ?? ''
    const message = formData.get('message')?.toString() ?? ''
    const newMessage = { title, message }
    if (title !== '' && message !== '') {
      console.log(newMessage)
      mutate(newMessage)
    }
  }

  return (
    <main>
      <div className='comments'>
        {isLoading && <strong>Cargando..</strong>}
        {error !== null && <strong>Algo salió mal</strong>}

        <Result data={data} />
      </div>
      <div className='create-comments'>
        <form
          onSubmit={handleSubmit}
          ref={refForm}
          style={{ opacity: isLoadingMutation ? '0.55' : '' }}
        >
          <FormInput isLoadingMutation={isLoadingMutation} />
          <FormTextArea isLoadingMutation={isLoadingMutation} />

          <button disabled={isLoadingMutation}>
            {isLoadingMutation ? 'sending Comment' : 'send Comment'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
