import {
  arabicSentenceReducer,
  arabicTextReducer,
  arabicWordsReducer,
  authorReducer,
  categoryPersistedReducer,
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
    categoryPersisted: categoryPersistedReducer,
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
