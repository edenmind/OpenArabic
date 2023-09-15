import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { categoriesReducer, textReducer, textsReducer, UIStateReducer, wordsReducer } from './reducers.js'

const rootReducer = combineReducers({
  arabicFontName: UIStateReducer,
  arabicFontSize: UIStateReducer,
  categories: categoriesReducer,
  englishFontSize: UIStateReducer,
  isDarkMode: UIStateReducer,
  isEngOn: UIStateReducer,
  isPlayOn: UIStateReducer,
  isTransliterationOn: UIStateReducer,
  practicingWords: UIStateReducer,
  text: textReducer,
  textLoading: UIStateReducer,
  texts: textsReducer,
  textsLoading: UIStateReducer,
  words: wordsReducer
})

const store = configureStore({
  reducer: rootReducer
})

export { store }
