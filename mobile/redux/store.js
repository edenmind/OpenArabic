import { configureStore } from '@reduxjs/toolkit'
import { categoriesReducer, textReducer, textsReducer, textLoadingReducer } from './reducers.js'

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    text: textReducer,
    texts: textsReducer,
    textLoading: textLoadingReducer
  }
})

export { store }
