import {
  categoriesReducer,
  textLoadingReducer,
  textReducer,
  textsLoadingReducer,
  textsReducer,
  arabicFontSizeReducer,
  englishFontSizeReducer,
  transliterationReducer,
  arabicFontNameReducer
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
    englishFontSize: englishFontSizeReducer,
    isTransliterationOn: transliterationReducer,
    arabicFontName: arabicFontNameReducer
  }
})

export { store }
