import apisauce from 'apisauce'

// apisauce <3
const create = (baseURL = 'https://api.myjson.com/bins') => {
  const api = apisauce.create({
    baseURL
  })

  const languages = () =>
    api.get('/aayrp')

  return {
    languages
  }

}
export default {
  create
}
