// export const SET_CATEGORIES = 'SET_CATEGORIES'
// export const SET_TEXT = 'SET_TEXT'
// export const SET_TEXTS = 'SET_TEXTS'
// export const RESET_TEXTS = 'RESET_TEXTS'

import { createAction } from '@reduxjs/toolkit'

export const SET_CATEGORIES = createAction('categories/SET_CATEGORIES')
export const SET_TEXT = createAction('text/SET_TEXT')
export const SET_TEXTS = createAction('texts/SET_TEXTS')
export const RESET_TEXTS = createAction('texts/RESET_TEXTS')
