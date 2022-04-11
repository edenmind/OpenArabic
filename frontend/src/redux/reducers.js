import {
  GET_ARABIC_SENTENCE,
  GET_ARABIC_TEXT,
  GET_ARABIC_WORDS,
  GET_AUTHOR,
  GET_CATEGORY,
  GET_ENGLISH_SENTENCE,
  GET_ENGLISH_TEXT,
  GET_ENGLISH_WORDS,
  GET_TITLE,
  SET_ARABIC_SENTENCE,
  SET_ARABIC_TEXT,
  SET_ARABIC_WORDS,
  SET_AUTHOR,
  SET_CATEGORY,
  SET_ENGLISH_SENTENCE,
  SET_ENGLISH_TEXT,
  SET_ENGLISH_WORDS,
  SET_TITLE,
} from './actions'

const initialState = {
  title: '',
  category: '',
  author: '',
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

export function englishSentenceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ENGLISH_SENTENCE:
      return state.englishSentence
    case SET_ENGLISH_SENTENCE:
      return { ...state, englishSentence: action.englishSentence }
    default:
      return state
  }
}

export function arabicSentenceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARABIC_SENTENCE:
      return state.arabicSentence
    case SET_ARABIC_SENTENCE:
      return { ...state, arabicSentence: action.arabicSentence }
    default:
      return state
  }
}

export function englishWordsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ENGLISH_WORDS:
      return state.englishSentence
    case SET_ENGLISH_WORDS:
      return { ...state, englishWords: action.englishWords }
    default:
      return state
  }
}

export function arabicWordsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARABIC_WORDS:
      return state.arabicSentence
    case SET_ARABIC_WORDS:
      return { ...state, arabicWords: action.arabicWords }
    default:
      return state
  }
}
