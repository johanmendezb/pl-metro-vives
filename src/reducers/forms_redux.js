import { createReducer, createActions } from 'reduxsauce'

// I separate most of the reducers because I like to see clean small-one-responsability-only files XD
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changeFormValues: 'formValues'
})

export const formsTypes = Types
export default Creators

/* ------------- Initial State ------------ - */

export const INITIAL_STATE = {
  contact: {
    isEmail: "default",
    singleContact: "",
    contacts: [],
    subject: "",
    message: "",
    saveCopy: false,
    errors: []
  },
}

/* ------------- Reducers ------------- */

const changeFormValues = (state, formValues) => ({
  ...state,
    formValues
})

const initialState = state => INITIAL_STATE

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_FORM_VALUES]: changeFormValues,
})
