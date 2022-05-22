//TODO: Move to RTK: https://redux.js.org/introduction/why-rtk-is-redux-today

import { applyMiddleware, combineReducers, createStore } from 'redux'
import { categoriesReducer, textReducer, textsReducer } from './reducers.js'

import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  categories: categoriesReducer,
  text: textReducer,
  texts: textsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
