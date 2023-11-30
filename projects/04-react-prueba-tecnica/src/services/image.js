export const getUrlImage = ({ threeFirstWords }) => {
  return fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
    .then(res => res.json())
    .then(response => {
      const { _id } = response
      const url = `cat/${_id}/says/${threeFirstWords}`
      return url
    })
    .catch(err => { return err })
}
