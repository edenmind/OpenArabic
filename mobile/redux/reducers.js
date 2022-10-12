/* eslint-disable putout/objects-braces-inside-array */
/* eslint-disable putout/keyword-spacing */
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
    image: 'abc',
    texts: { arabic: '', english: '' },
    category: 'abc',
    author: '',
    arabicSentence: [''],
    source: '',
    vocabularyCollection: {
      numberOfBatches: 1,
      arabic: [[{ word: 'a', wordId: '1' }]],
      english: [[{ word: 'e', wordId: '1' }]]
    },
    // eslint-disable-next-line putout/objects-braces-inside-array
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

const initialStateLoading = {
  textLoading: true,
  textsLoading: true
}

const categoriesReducer = createReducer(initialStateCategories, (builder) => {
  builder.addCase(actions.SET_CATEGORIES, (state, action) => {
    return { ...state, categories: action.payload }
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

const textLoadingReducer = createReducer(initialStateLoading, (builder) => {
  builder.addCase(actions.SET_TEXT_LOADED, (state, action) => {
    return { ...state, textLoading: action.payload }
  })
})

const textsLoadingReducer = createReducer(initialStateLoading, (builder) => {
  builder.addCase(actions.SET_TEXTS_LOADED, (state, action) => {
    return { ...state, textsLoading: action.payload }
  })
})

// eslint-disable-next-line putout/add-newlines-between-specifiers
export { categoriesReducer, textReducer, textsReducer, textLoadingReducer, textsLoadingReducer }
