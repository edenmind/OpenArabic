import {
  categoriesReducer,
  textLoadingReducer,
  textReducer,
  textsLoadingReducer,
  textsReducer,
  arabicFontSizeReducer,
  englishFontSizeReducer
} from './reducers.js'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    text: textReducer,
    texts: textsReducer,
    textLoading: textLoadingReducer,
    textsLoading: textsLoadingReducer,
    arabicFontSize: arabicFontSizeReducer,
    englishFontSize: englishFontSizeReducer
  }
})

export { store }
