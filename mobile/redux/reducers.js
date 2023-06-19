import * as actions from './actions.js'
import { createReducer } from '@reduxjs/toolkit'

const initialStateCategories = {
  categories: [{ name: 'No categories', id: '123' }]
}

const initialStateText = {
  text: {
    arabic: ['a1', 'a2', 'a3'],
    english: ['e1', 'e2', 'e3'],
    status: 'Draft',
    title: '',
    publishAt: '2021-01-01T00:00:00.000Z',
    wordByWord: [['']],
    image: 'No Data',
    texts: { arabic: '', english: '' },
    category: 'No Data',
    author: '',
    arabicSentence: [''],
    source: '',
    vocabularyCollection: {
      numberOfBatches: 1,
      arabic: [[{ word: 'a', wordId: '1' }]],
      english: [[{ word: 'e', wordId: '1' }]]
    },
    sentences: [
      {
        english: 'e1',
        arabic: 'a1',
        words: [
          {
            arabic: 'a',
            english: '1'
          }
        ]
      },
      {
        english: 'e2',
        arabic: 'a2',
        words: [
          {
            arabic: 'a',
            english: '2'
          }
        ]
      },
      {
        english: 'e3',
        arabic: 'a3',
        words: [
          {
            arabic: 'a',
            english: '3'
          }
        ]
      }
    ]
  }
}

const initialStateTexts = {
  texts: []
}

const initialStateWords = {
  words: [
    { arabic: ' ', english: ' ', alternative1: ' ', alternative2: ' ' },
    { arabic: ' ', english: ' ', alternative1: ' ', alternative2: ' ' },
    { arabic: ' ', english: ' ', alternative1: ' ', alternative2: ' ' }
  ]
}

const initialStateUI = {
  arabicFontSize: 19,
  englishFontSize: 17,
  isTransliterationOn: 'on',
  arabicFontName: 'uthman',
  textLoading: true,
  textsLoading: true,
  practicingWords: false,
  isDarkMode: true
}

const UIStateReducer = createReducer(initialStateUI, (builder) => {
  builder.addCase(actions.SET_ARABIC_FONT_NAME, (state, action) => {
    return { ...state, arabicFontName: action.payload }
  })
  builder.addCase(actions.SET_TRANSLITERATION, (state, action) => {
    return { ...state, isTransliterationOn: action.payload }
  })
  builder.addCase(actions.SET_ARABIC_FONT_SIZE, (state, action) => {
    return { ...state, arabicFontSize: action.payload }
  })
  builder.addCase(actions.SET_ENGLISH_FONT_SIZE, (state, action) => {
    return { ...state, englishFontSize: action.payload }
  })
  builder.addCase(actions.SET_TEXT_LOADED, (state, action) => {
    return { ...state, textLoading: action.payload }
  })
  builder.addCase(actions.SET_TEXTS_LOADED, (state, action) => {
    return { ...state, textsLoading: action.payload }
  })
  builder.addCase(actions.SET_PRACTICING_WORDS, (state, action) => {
    return { ...state, practicingWords: action.payload }
  })
  builder.addCase(actions.SET_DARK_MODE, (state, action) => {
    return { ...state, isDarkMode: action.payload }
  })
})

const categoriesReducer = createReducer(initialStateCategories, (builder) => {
  builder.addCase(actions.SET_CATEGORIES, (state, action) => {
    return { ...state, categories: action.payload }
  })
})

const wordsReducer = createReducer(initialStateWords, (builder) => {
  builder
    .addCase(actions.SET_WORDS, (state, action) => {
      return { ...state, words: action.payload }
    })
    .addCase(actions.RESET_WORDS, () => {
      return { ...initialStateWords }
    })
})

const textReducer = createReducer(initialStateText, (builder) => {
  builder
    .addCase(actions.SET_TEXT, (state, action) => {
      return { ...state, text: action.payload }
    })
    .addCase(actions.RESET_TEXT, () => {
      return { ...initialStateText }
    })
})

const textsReducer = createReducer(initialStateTexts, (builder) => {
  builder.addCase(actions.SET_TEXTS, (state, action) => {
    return { ...state, texts: action.payload }
  })
})

export { categoriesReducer, textReducer, textsReducer, UIStateReducer, wordsReducer }
