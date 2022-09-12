/* eslint-disable putout/objects-braces-inside-array */
/* eslint-disable putout/keyword-spacing */
import * as actions from './actions.js'
import { createReducer } from '@reduxjs/toolkit'

const initialStateCategories = {
  categories: ['placeholder1', 'placeholder2', 'placeholder3']
}

const initialStateText = {
  text: {
    arabic: ['a1', 'a2', 'a3'],
    english: ['e1', 'e2', 'e3'],
    status: 'Draft',
    publishAt: new Date().toUTCString(),
    wordByWord: [['']],
    title: 'abc',
    image: 'abc',
    texts: { arabic: '', english: '' },
    category: '',
    author: '',
    arabicSentence: [''],
    source: '',
    vocabularyCollection: { arabic: ['a1', 'a2', 'a3'], english: ['e1', 'e2', 'e3'] },
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
    .addCase(actions.RESET_TEXTS, () => {
      return { ...initialStateText }
    })
})

const textsReducer = createReducer(initialStateTexts, (builder) => {
  builder.addCase(actions.SET_TEXTS, (state, action) => {
    return { ...state, texts: action.payload }
  })
})

export { categoriesReducer, textReducer, textsReducer }
