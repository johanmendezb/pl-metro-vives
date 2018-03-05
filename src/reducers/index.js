import { reducer as languages } from './languages_redux'
import { reducer as post } from './post_redux'
import { reducer as forms } from './forms_redux'

// I separate them all because I like to see clean small reducers

const reducers = {
  languages,
  post,
  forms
}

export default reducers
