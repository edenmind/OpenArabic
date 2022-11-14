import {
  categoriesReducer,
  textLoadingReducer,
  textReducer,
  textsLoadingReducer,
  textsReducer,
  uiReducer
} from './reducers.js'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    text: textReducer,
    texts: textsReducer,
    textLoading: textLoadingReducer,
    textsLoading: textsLoadingReducer,
    ui: uiReducer
  }
})

export { store }
