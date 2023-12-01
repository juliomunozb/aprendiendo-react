import { useCatImage } from '../hooks/useCatImage'

export const Otro = () => {
  const { imageUrl, catImageError } = useCatImage({ fact: 'cat' })
  return (
    <>
      {imageUrl && <img src={imageUrl} alt='Image Random' />}
      <section>
        {catImageError && <p>{catImageError}</p>}
      </section>
    </>
  )
}
