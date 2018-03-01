import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerForBrowser } from 'redux-little-router'
import { Iterable } from 'immutable'
import { createLogger } from 'redux-logger'
import reducers from 'reducers'
import rootSaga from 'sagas'

export default function () {
  // no routes needed for this exercice
  const routes = {}

  const {
    reducer: routerReducer,
    middleware: routerMiddleware,
    enhancer
  } = routerForBrowser({ routes })
  const sagaMiddleware = createSagaMiddleware()
  let middlewares = [routerMiddleware, sagaMiddleware]

  if (process.env.NODE_ENV === `development`) {
    const createLogger = require('redux-logger')
    const stateTransformer = state => Iterable.isIterable(state) ? state.toJS() : state
    const logger = createLogger({ stateTransformer, collapsed: _ => true })
    middlewares.push(logger)
  }

  const allReducers = {
    ...reducers,
    router: routerReducer
  }

  const store = createStore(
    combineReducers(allReducers),
    compose(enhancer, applyMiddleware(...middlewares))
  )

  sagaMiddleware.run(rootSaga)

  return store
}
