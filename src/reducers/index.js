import { reducer as languages } from './languages_redux'
import { reducer as post } from './post_redux'
import { reducer as forms } from './forms_redux'

const reducers = {
  languages,
  post,
  forms
}

export default reducers
