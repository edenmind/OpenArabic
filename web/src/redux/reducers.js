import * as actions from './actions'

import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  arabicWords: [''],
  englishWords: [''],
  wordByWord: [['']],
  title: '',
  text: '',
  category: '',
  author: '',
  source: '',
  englishSentence: [''],
  arabicSentence: [''],
  englishText: [
    'It is Sunnah for the fasting person to eat suhoor, because it was proven in al-Saheehayn that Anas ibn Maalik (may Allaah be pleased with him) said:\n The Prophet the Messenger of Allaah (peace and blessings of Allaah be upon him) said: “Eat suhoor for in suhoor there is blessing.” (Narrated by al-Bukhaari, 1923; Muslim, 1059). ',
  ],
  arabicText: [
    'يسن للصائم السحور لما ثبت في الصحيحين من حديث أنس بن مالك - رضي الله عنه - قال\n : قال النبي رسول الله - صلى الله عليه وسلم - : ( تسحروا فإن في السحور بركة ) رواه البخاري برقم 1923 ، ومسلم برقم 1095',
  ],
}

export const textReducer = createReducer(initialState, {
  SET_TITLE: (state, action) => {
    state.text.title = action.title
  },
  GET_TITLE: (state) => {
    return state.text.title
  },
  SET_AUTHOR: (state, action) => {
    state.text.author = action.author
  },
  GET_AUTHOR: (state) => {
    return state.text.author
  },
  SET_SOURCE: (state, action) => {
    state.text.source = action.source
  },
  GET_SOURCE: (state) => {
    return state.text.source
  },
  SET_CATEGORY: (state, action) => {
    state.text.category = action.category
  },
  GET_CATEGORY: (state) => {
    return state.text.category
  },
  SET_ENGLISH_TEXT: (state, action) => {
    state.text.texts.english = action.english
  },
  SET_ARABIC_TEXT: (state, action) => {
    state.text.texts.arabic = action.arabic
  },
  GET_TEXT: (state) => {
    return state.text
  },
  SET_TEXT: (state, action) => {
    return { ...state, text: action.text }
  },
  GET_WORD_BY_WORD: (state) => {
    return state.text.wordByWord
  },
  SET_WORD_BY_WORD: (state, action) => {
    state.text.wordByWord = action.wordByWord
  },
  GET_ENGLISH_SENTENCE: (state) => {
    return state.text.englishSentence
  },
  SET_ENGLISH_SENTENCE: (state, action) => {
    state.text.englishSentence = action.englishSentence
  },
  GET_ARABIC_SENTENCE: (state) => {
    return state.text.arabicSentence
  },
  SET_ARABIC_SENTENCE: (state, action) => {
    state.text.arabicSentence = action.arabicSentence
  },
  GET_ENGLISH_WORDS: (state) => {
    return state.text.englishWords
  },
  SET_ENGLISH_WORDS: (state, action) => {
    state.text.englishWords = action.englishWords
  },
  GET_ARABIC_WORDS: (state) => {
    return state.text.arabicWords
  },
  SET_ARABIC_WORDS: (state, action) => {
    state.text.arabicWords = action.arabicWords
    console.log(state.text.arabicWords)
  },
})

// export function titleReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_TITLE:
//       return state.title
//     case actions.SET_TITLE:
//       return { ...state, title: action.title }
//     default:
//       return state
//   }
// }

// export function textReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_TEXT:
//       return state.text
//     case actions.SET_TEXT:
//       return { ...state, text: action.text }
//     default:
//       return state
//   }
// }

// export function wordByWordReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_WORD_BY_WORD:
//       return state.wordByWord
//     case actions.SET_WORD_BY_WORD:
//       return { ...state, wordByWord: action.wordByWord }
//     default:
//       return state
//   }
// }

// export function categoryReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_CATEGORY:
//       return state.category
//     case actions.SET_CATEGORY:
//       return { ...state, category: action.category }
//     default:
//       return state
//   }
// }

// export function authorReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_AUTHOR:
//       return state.category
//     case actions.SET_AUTHOR:
//       return { ...state, author: action.author }
//     default:
//       return state
//   }
// }

// export function englishTextReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_ENGLISH_TEXT:
//       return state.englishText
//     case actions.SET_ENGLISH_TEXT:
//       return { ...state, englishText: action.englishText }
//     default:
//       return state
//   }
// }

// export function arabicTextReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_ARABIC_TEXT:
//       return state.arabicText
//     case actions.SET_ARABIC_TEXT:
//       return { ...state, arabicText: action.arabicText }
//     default:
//       return state
//   }
// }

// export function englishSentenceReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_ENGLISH_SENTENCE:
//       return state.englishSentence
//     case actions.SET_ENGLISH_SENTENCE:
//       return { ...state, englishSentence: action.englishSentence }
//     default:
//       return state
//   }
// }

// export function arabicSentenceReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_ARABIC_SENTENCE:
//       return state.arabicSentence
//     case actions.SET_ARABIC_SENTENCE:
//       return { ...state, arabicSentence: action.arabicSentence }
//     default:
//       return state
//   }
// }

// export function englishWordsReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_ENGLISH_WORDS:
//       return state.englishSentence
//     case actions.SET_ENGLISH_WORDS:
//       return { ...state, englishWords: action.englishWords }
//     default:
//       return state
//   }
// }

// export function arabicWordsReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_ARABIC_WORDS:
//       return state.arabicSentence
//     case actions.SET_ARABIC_WORDS:
//       return { ...state, arabicWords: action.arabicWords }
//     default:
//       return state
//   }
// }

// export function sourceReducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.GET_SOURCE:
//       return state.source
//     case actions.SET_SOURCE:
//       return { ...state, source: action.source }
//     default:
//       return state
//   }
// }
