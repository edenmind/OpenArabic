import * as reducers from './reducers'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    // title: reducers.titleReducer,
    // category: reducers.categoryReducer,
    // author: reducers.authorReducer,
    // source: reducers.sourceReducer,
    text: reducers.textReducer,
    // englishText: reducers.englishTextReducer,
    // arabicText: reducers.arabicTextReducer,
    // arabicWords: reducers.arabicWordsReducer,
    // englishWords: reducers.englishWordsReducer,
    // arabicSentence: reducers.arabicSentenceReducer,
    // englishSentence: reducers.englishSentenceReducer,
    // wordByWord: reducers.wordByWordReducer,
  },
})
