import {
  arabicSentenceReducer,
  arabicTextReducer,
  arabicWordsReducer,
  authorReducer,
  categoryReducer,
  englishSentenceReducer,
  englishTextReducer,
  englishWordsReducer,
  sourceReducer,
  textReducer,
  wordByWordReducer,
} from './reducers'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    title: textReducer,
    category: categoryReducer,
    author: authorReducer,
    source: sourceReducer,
    englishText: englishTextReducer,
    arabicText: arabicTextReducer,
    arabicWords: arabicWordsReducer,
    englishWords: englishWordsReducer,
    arabicSentence: arabicSentenceReducer,
    englishSentence: englishSentenceReducer,
    wordByWord: wordByWordReducer,
  },
})
