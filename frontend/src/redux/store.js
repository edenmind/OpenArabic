import { arabicSentenceReducer, arabicTextReducer, arabicWordsReducer, authorReducer, categoryReducer, englishSentenceReducer, englishTextReducer, englishWordsReducer, textReducer } from './reducers'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    title: textReducer,
    category: categoryReducer,
    author: authorReducer,
    englishText: englishTextReducer,
    arabicText: arabicTextReducer,
    arabicWords: arabicWordsReducer,
    englishWords: englishWordsReducer,
    arabicSentence: arabicSentenceReducer,
    englishSentence: englishSentenceReducer,
  },
})
