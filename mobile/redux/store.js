//TODO: Move to RTK: https://redux.js.org/introduction/why-rtk-is-redux-today

import { configureStore } from '@reduxjs/toolkit'
import { categoriesReducer, textReducer, textsReducer } from './reducers.js'

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    text: textReducer,
    texts: textsReducer
  }
})

export { store }
