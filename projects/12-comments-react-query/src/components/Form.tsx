export const FormInput = ({
  isLoadingMutation,
}: {
  isLoadingMutation: boolean
}) => {
  return (
    <div>
      <label htmlFor='title'></label>
      <input
        type='text'
        id='title'
        name='title'
        placeholder='Title'
        disabled={isLoadingMutation}
      />
    </div>
  )
}

export const FormTextArea = ({
  isLoadingMutation,
}: {
  isLoadingMutation: boolean
}) => {
  return (
    <div>
      <textarea
        name='message'
        placeholder='Comment'
        disabled={isLoadingMutation}
      ></textarea>
    </div>
  )
}
