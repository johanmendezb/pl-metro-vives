import apisauce from 'apisauce'

// apisauce <3 works awesome on big projects

const create = (baseURL = 'https://raw.githubusercontent.com/johanetox/pl-metro-vives/master/src/base/data') => {
  const api = apisauce.create({
    baseURL
  })

  const languages = () =>
    api.get('/languages.json')

  return {
    languages
  }

}
export default {
  create
}
