import { takeLatest } from 'redux-saga'
import API from '../services/api'
import { GetLanguagesTypes } from 'reducers/languages_redux'
import { getLanguage } from 'sagas/language_sagas'

const api = API.create()

/* I wanted to use sagas for this exersise it reduces a lot of boiler plate
   I am really convinced that redux - saga is better way of handling REST
   calls in react project if your project is about to scale or already at that level */

// Here we have a generator that listens to "CHANGE_LANGUAGE" to make the api call, simple!

function* rootSaga() {
  yield [
    takeLatest(GetLanguagesTypes.CHANGE_LANGUAGE, getLanguage, api),
  ]
}
export default rootSaga
