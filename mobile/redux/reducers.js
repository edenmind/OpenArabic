import { createReducer } from '@reduxjs/toolkit'

import * as actions from './actions.js'

const initialStateCategories = { categories: [] }
const initialStateText = { text: {} }
const initialStateTexts = { texts: [] }
const initialStateWords = { words: [] }
const initialStateUI = {
  arabicFontName: 'uthman',
  arabicFontSize: 19,
  englishFontSize: 17,
  isDarkMode: true,
  isTransliterationOn: 'on',
  practicingWords: false,
  textLoading: false,
  textsLoading: false
}

const UIStateReducer = createReducer(initialStateUI, (builder) => {
  builder
    .addCase(actions.SET_ARABIC_FONT_NAME, (state, action) => {
      state.arabicFontName = action.payload
    })
    .addCase(actions.SET_TRANSLITERATION, (state, action) => {
      state.isTransliterationOn = action.payload
    })
    .addCase(actions.SET_ARABIC_FONT_SIZE, (state, action) => {
      state.arabicFontSize = action.payload
    })
    .addCase(actions.SET_ENGLISH_FONT_SIZE, (state, action) => {
      state.englishFontSize = action.payload
    })
    .addCase(actions.SET_TEXT_LOADED, (state, action) => {
      state.textLoading = action.payload
    })
    .addCase(actions.SET_TEXTS_LOADED, (state, action) => {
      state.textsLoading = action.payload
    })
    .addCase(actions.SET_PRACTICING_WORDS, (state, action) => {
      state.practicingWords = action.payload
    })
    .addCase(actions.SET_DARK_MODE, (state, action) => {
      state.isDarkMode = action.payload
    })
})

const categoriesReducer = createReducer(initialStateCategories, (builder) => {
  builder.addCase(actions.SET_CATEGORIES, (state, action) => {
    state.categories = action.payload
  })
})

const wordsReducer = createReducer(initialStateWords, (builder) => {
  builder
    .addCase(actions.SET_WORDS, (state, action) => {
      state.words = action.payload
    })
    .addCase(actions.ADD_WORD, (state, action) => {
      state.words.push(action.payload)
    })
    .addCase(actions.RESET_WORDS, () => {
      return { ...initialStateWords }
    })
})

const textReducer = createReducer(initialStateText, (builder) => {
  builder
    .addCase(actions.SET_TEXT, (state, action) => {
      state.text = action.payload
    })
    .addCase(actions.RESET_TEXT, () => {
      return { ...initialStateText }
    })
})

const textsReducer = createReducer(initialStateTexts, (builder) => {
  builder.addCase(actions.SET_TEXTS, (state, action) => {
    state.texts = action.payload
  })
})

export { categoriesReducer, textReducer, textsReducer, UIStateReducer, wordsReducer }
