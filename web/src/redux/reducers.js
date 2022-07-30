'use strict'

import * as actions from './actions.js'

const { createReducer } = require('@reduxjs/toolkit')

const initialState = {
  arabicWords: [''],
  text: {
    arabic: [''],
    english: [''],
    status: 'Draft',
    publishAt: new Date().toUTCString(),
    wordByWord: [['']],
    title: '',
    texts: { arabic: '', english: '' },
    category: '',
    author: '',
    arabicSentence: [''],
    source: '',
    // eslint-disable-next-line putout/objects-braces-inside-array
    sentences: [
      {
        english: '',
        arabic: '',
        words: []
      }
    ]
  }
}

const textReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.SET_TITLE, (state, action) => {
      state.text.title = action.title
    })
    .addCase(actions.SET_AUTHOR, (state, action) => {
      state.text.author = action.author
    })
    .addCase(actions.SET_SOURCE, (state, action) => {
      state.text.source = action.source
    })
    .addCase(actions.SET_CATEGORY, (state, action) => {
      state.text.category = action.category
    })
    .addCase(actions.SET_STATUS, (state, action) => {
      state.text.status = action.status
    })
    .addCase(actions.SET_ENGLISH_TEXT, (state, action) => {
      state.text.texts.english = action.english
    })
    .addCase(actions.SET_ARABIC_TEXT, (state, action) => {
      state.text.texts.arabic = action.arabic
    })
    .addCase(actions.SET_TEXT, (state, action) => {
      return {
        ...state,
        text: action.text
      }
    })
    .addCase(actions.RESET_TEXT, () => {
      initialState
    })
    .addCase(actions.SET_WORD_BY_WORD, (state, action) => {
      state.text.wordByWord = action.wordByWord
    })
    .addCase(actions.SET_ENGLISH_SENTENCE, (state, action) => {
      state.text.englishSentence = action.englishSentence
    })
    .addCase(actions.SET_ARABIC_SENTENCE, (state, action) => {
      state.text.arabicSentence = action.arabicSentence
    })
    .addCase(actions.UPDATE_SENTENCE, (state, action) => {
      // eslint-disable-next-line putout/long-properties-destructuring
      const { indexSentence, indexArabicWord, englishWords } = action.value
      state.text.sentences[indexSentence].words[indexArabicWord].english = englishWords
    })
    .addCase(actions.SET_ENGLISH_WORDS, (state, action) => {
      state.text.englishWords = action.englishWords
    })
    .addCase(actions.SET_SENTENCES, (state, action) => {
      state.text.sentences = action.sentences
    })
    .addCase(actions.SET_ARABIC_WORDS, (state, action) => {
      state.text.arabicWords = action.arabicWords
    })
    .addCase(actions.SET_IMAGE, (state, action) => {
      state.text.image = action.image
    })
    .addCase(actions.SET_PUBLISH_AT, (state, action) => {
      state.text.publishAt = action.publishAt
    })
})

export { textReducer }

//export default createReducer(initialState, {
// SET_TITLE: (state, action) => {
//   state.text.title = action.title
// },
// GET_TITLE: (state) => state.text.title,
// SET_AUTHOR: (state, action) => {
//   state.text.author = action.author
// },
// GET_AUTHOR: (state) => state.text.author,
// SET_SOURCE: (state, action) => {
//   state.text.source = action.source
// },
// GET_SOURCE: (state) => state.text.source,
// SET_CATEGORY: (state, action) => {
//   state.text.category = action.category
// },

// SET_STATUS: (state, action) => {
//   state.text.status = action.status
// },

// SET_ENGLISH_TEXT: (state, action) => {
//   state.text.texts.english = action.english
// },
// SET_ARABIC_TEXT: (state, action) => {
//   state.text.texts.arabic = action.arabic
// },

// SET_TEXT: (state, action) => ({
//   ...state,
//   text: action.text
// }),
// RESET_TEXT: () => initialState,

// SET_WORD_BY_WORD: (state, action) => {
//   state.text.wordByWord = action.wordByWord
// },

// SET_ENGLISH_SENTENCE: (state, action) => {
//   state.text.englishSentence = action.englishSentence
// },

// SET_ARABIC_SENTENCE: (state, action) => {
//   state.text.arabicSentence = action.arabicSentence
// },

// UPDATE_SENTENCE: (state, action) => {
//   // eslint-disable-next-line putout/long-properties-destructuring
//   const { indexSentence, indexArabicWord, englishWords } = action.value
//   state.text.sentences[indexSentence].words[indexArabicWord].english = englishWords
// },
// SET_ENGLISH_WORDS: (state, action) => {
//   state.text.englishWords = action.englishWords
// },

// SET_SENTENCES: (state, action) => {
//   state.text.sentences = action.sentences
// },

// SET_ARABIC_WORDS: (state, action) => {
//   state.text.arabicWords = action.arabicWords
// },
// SET_IMAGE: (state, action) => {
//   state.text.image = action.image
// },
// SET_PUBLISH_AT: (state, action) => {
//   state.text.publishAt = action.publishAt
// }
//})
