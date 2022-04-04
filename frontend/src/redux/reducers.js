import { GET_ARABIC_TEXT, GET_AUTHOR, GET_CATEGORY, GET_ENGLISH_TEXT, GET_TITLE, SET_ARABIC_TEXT, SET_AUTHOR, SET_CATEGORY, SET_ENGLISH_TEXT, SET_TITLE } from './actions'

const initialState = {
  title: 'someTitle',
  category: '0',
  author: '0',
  englishText: [],
  arabicText: [],
}

export function textReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TITLE:
      return state.title
    case SET_TITLE:
      return { ...state, title: action.title }
    default:
      return state
  }
}

export function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return state.category
    case SET_CATEGORY:
      return { ...state, category: action.category }
    default:
      return state
  }
}

export function authorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHOR:
      return state.category
    case SET_AUTHOR:
      return { ...state, author: action.author }
    default:
      return state
  }
}

export function englishTextReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ENGLISH_TEXT:
      return state.englishText
    case SET_ENGLISH_TEXT:
      return { ...state, englishText: action.englishText }
    default:
      return state
  }
}

export function arabicTextReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARABIC_TEXT:
      return state.arabicText
    case SET_ARABIC_TEXT:
      return { ...state, arabicText: action.arabicText }
    default:
      return state
  }
}
