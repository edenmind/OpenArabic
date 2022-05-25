/* eslint-disable putout/remove-empty-newline-after-import */
import createReducer from './reducers.js'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    text: createReducer
  }
})
