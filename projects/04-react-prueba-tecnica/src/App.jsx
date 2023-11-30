import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_CAT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'

export function App () {
  const [fact, setFact] = useState()
  const [image, setImage] = useState()

  useEffect(() => {
    const getRandomFact = async () => {
      try {
        const response = await fetch(CAT_ENDPOINT_RANDOM_CAT)
        const data = await response.json()
        const { fact } = data
        setFact(fact)
        const threeFirstWords = fact.split(' ', 3).join(' ')
        console.log(threeFirstWords)
        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
          .then(res => res.json())
          .then(response => {
            const { _id } = response
            const url = `cat/${_id}/says/${threeFirstWords}`
            setImage(url)
            console.log(response)
          })
      } catch (error) {
        console.log('Error Invocando API', error.message)
      }
    }
    getRandomFact()
  }, [])
  return (
    <>
      <h1>App Gatos</h1>
      {fact && <p>{fact}</p>}
      {image && <p><img src={`${CAT_PREFIX_IMAGE_URL}${image}`} alt={`Image extracted using the first three words for ${fact}`} /></p>}
    </>
  )
}
