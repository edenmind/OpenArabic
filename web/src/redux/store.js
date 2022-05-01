/* eslint-disable putout/remove-empty-newline-after-import */
import * as reducers from './reducers.js'

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    text: reducers.textReducer
  }
})
