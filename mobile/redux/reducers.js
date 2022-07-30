/* eslint-disable putout/keyword-spacing */
import * as actions from './actions.js'
import { createReducer } from '@reduxjs/toolkit'

const initialStateCategories = {
  categories: []
}

const initialStateText = {
  text: {}
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

// function categoriesReducer(state = initialStateCategories, action) {
//   switch (action.type) {
//     case SET_CATEGORIES:
//       return { ...state, categories: action.payload }
//     default:
//       return state
//   }
// }

// function textReducer(state = initialStateText, action) {
//   switch (action.type) {
//     case SET_TEXT:
//       return { ...state, text: action.payload }
//     case RESET_TEXTS:
//       return {
//         ...initialStateText
//       }
//     default:
//       return state
//   }
// }

// function textsReducer(state = initialStateTexts, action) {
//   switch (action.type) {
//     case SET_TEXTS:
//       return { ...state, texts: action.payload }
//     default:
//       return state
//   }
// }

export { categoriesReducer, textReducer, textsReducer }
