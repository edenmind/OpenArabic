import { arabicTextReducer, authorReducer, categoryReducer, englishTextReducer, textReducer } from './reducers'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    title: textReducer,
    category: categoryReducer,
    author: authorReducer,
    englishText: englishTextReducer,
    arabicText: arabicTextReducer,
  },
})
