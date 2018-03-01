import apisauce from 'apisauce'

// apisauce <3
const create = (baseURL = 'https://jsonblob.com') => {
  const api = apisauce.create({
    baseURL
  })

  const languages = () =>
    api.get('/3d34167a-1d90-11e8-9810-3d6785638e2d')

  return {
    languages
  }

}
export default {
  create
}
