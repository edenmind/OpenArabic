import { categoriesReducer, textReducer, textsReducer, UIStateReducer } from './reducers.js'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  categories: categoriesReducer,
  text: textReducer,
  texts: textsReducer,
  textLoading: UIStateReducer,
  textsLoading: UIStateReducer,
  arabicFontSize: UIStateReducer,
  englishFontSize: UIStateReducer,
  isTransliterationOn: UIStateReducer,
  arabicFontName: UIStateReducer
})

const store = configureStore({
  reducer: rootReducer
})

export { store }
