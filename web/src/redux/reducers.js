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
    generateAudio: 'No',
    texts: { arabic: '', english: '' },
    category: '',
    author: '',
    arabicSentence: [''],
    source: '',
    quiz: false,
    sentences: [
      {
        english: '',
        arabic: '',
        quiz: false,
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
      return { ...initialState }
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
      const { indexSentence, indexArabicWord, englishWord } = action.value
      state.text.sentences[indexSentence].words[indexArabicWord].english = englishWord
    })
    .addCase(actions.UPDATE_EXPLANATION_SENTENCE, (state, action) => {
      const { indexSentence, explanation } = action.value
      state.text.sentences[indexSentence].explanation = explanation
    })
    .addCase(actions.UPDATE_SENTENCE_QUIZ, (state, action) => {
      const { indexSentence, indexArabicWord, quiz } = action.value
      state.text.sentences[indexSentence].words[indexArabicWord].quiz = quiz
    })
    .addCase(actions.UPDATE_ENGLISH_SENTENCE, (state, action) => {
      const { indexSentence, englishSentence } = action.value
      state.text.sentences[indexSentence].english = englishSentence
    })
    .addCase(actions.REMOVE_WORD_FROM_SENTENCE, (state, action) => {
      const { indexSentence, indexArabicWord, englishWords } = action.value
      //remove the word from the sentence
      state.text.sentences[indexSentence].words.splice(indexArabicWord, 1)
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

    .addCase(actions.SET_GENERATE_AUDIO, (state, action) => {
      state.text.generateAudio = action.generateAudio
    })
})

export { textReducer }
