import { takeLatest } from 'redux-saga'
import API from '../services/api'
import { GetLanguagesTypes } from 'reducers/languages_redux'
import { getLanguage } from 'sagas/language_sagas'

const api = API.create()

function* rootSaga() {
  yield [
    takeLatest(GetLanguagesTypes.FETCH_LANGUAGES, getLanguage, api),
  ]
}
export default rootSaga
