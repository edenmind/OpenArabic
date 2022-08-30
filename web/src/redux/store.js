/* eslint-disable putout/remove-empty-newline-after-import */
import { textReducer } from './reducers.js'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    text: textReducer
  }
})

export default store
