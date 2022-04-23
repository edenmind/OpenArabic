import * as reducers from './reducers'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    title: reducers.textReducer,
    category: reducers.categoryReducer,
    author: reducers.authorReducer,
    source: reducers.sourceReducer,
    englishText: reducers.englishTextReducer,
    arabicText: reducers.arabicTextReducer,
    arabicWords: reducers.arabicWordsReducer,
    englishWords: reducers.englishWordsReducer,
    arabicSentence: reducers.arabicSentenceReducer,
    englishSentence: reducers.englishSentenceReducer,
    wordByWord: reducers.wordByWordReducer,
  },
})
