import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  incrementLikes: null
})

export const postTypes = Types
export default Creators

/* ------------- Initial State ------------ - */

export const INITIAL_STATE = {
  likes: 10
}

/* ------------- Reducers ------------- */

const incrementLikes = state => ({
  ...state,
  likes: state.likes + 1
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INCREMENT_LIKES]: incrementLikes
})
