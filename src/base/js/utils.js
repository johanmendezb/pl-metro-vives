import _ from 'lodash'

export const switchLanguages = currentLanguage =>
  currentLanguage === 'es' ? 'en' : 'es'

export const getLanguage = (language, word) =>
  _.find(language, (value, key) =>
    key === word
  )

export const languagesName = currentLanguage =>
  currentLanguage === 'es' ? 'English' : 'Español'

export const numberFormat = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
