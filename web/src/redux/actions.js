import { createAction } from '@reduxjs/toolkit'

export const REMOVE_WORD_FROM_SENTENCE = createAction('REMOVE_WORD_FROM_SENTENCE')
export const RESET_TEXT = createAction('RESET_TEXT')
export const SET_ARABIC_SENTENCE = createAction('SET_ARABIC_SENTENCE')
export const SET_ARABIC_TEXT = createAction('SET_ARABIC_TEXT')
export const SET_ARABIC_WORDS = createAction('SET_ARABIC_WORDS')
export const SET_AUTHOR = createAction('SET_AUTHOR')
export const SET_CATEGORY = createAction('SET_CATEGORY')
export const SET_INTRODUCTION = createAction('SET_INTRODUCTION')
export const SET_ENGLISH_SENTENCE = createAction('SET_ENGLISH_SENTENCE')
export const SET_ENGLISH_TEXT = createAction('SET_ENGLISH_TEXT')
export const SET_ENGLISH_WORDS = createAction('SET_ENGLISH_WORDS')
export const SET_GENERATE_AUDIO = createAction('SET_GENERATE_AUDIO')
export const SET_IMAGE = createAction('SET_IMAGE')
export const SET_PUBLISH_AT = createAction('SET_PUBLISH_AT')
export const SET_SENTENCES = createAction('SET_SENTENCES')
export const SET_SOURCE = createAction('SET_SOURCE')
export const SET_STATUS = createAction('SET_STATUS')
export const SET_TEXT = createAction('SET_TEXT')
export const SET_TITLE = createAction('SET_TITLE')
export const SET_WORD_BY_WORD = createAction('SET_WORD_BY_WORD')
export const UPDATE_EXPLANATION = createAction('UPDATE_EXPLANATION')
export const UPDATE_SENTENCE = createAction('UPDATE_SENTENCE')
export const UPDATE_FULL_SENTENCE = createAction('UPDATE_FULL_SENTENCE')
export const UPDATE_SENTENCE_QUIZ = createAction('UPDATE_SENTENCE_QUIZ')
export const UPDATE_ENGLISH_SENTENCE = createAction('UPDATE_ENGLISH_SENTENCE')
export const UPDATE_EXPLANATION_SENTENCE = createAction('UPDATE_EXPLANATION_SENTENCE')
