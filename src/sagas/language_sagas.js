import { call, put } from 'redux-saga/effects'
import LanguageActions from 'reducers/languages_redux'

// Here is just how I manage to api response

export function* getLanguage(api) {
  const response = yield call(api.languages)
  switch (response.status) {
    case 200:
      yield put(LanguageActions.fetchLanguagesSuccess(response.data))
      break;
    default:
      console.log('500')
      break;
  }
}
