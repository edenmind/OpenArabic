import { expect, it, jest } from '@jest/globals'
import * as actions from './actions.js'

it('SET_CATEGORIES should return the correct action', () => {
  expect(actions.SET_CATEGORIES({})).toEqual({
    type: 'SET_CATEGORIES',
    payload: {}
  })
})

it('SET_TEXT should return the correct action', () => {
  expect(actions.SET_TEXT({})).toEqual({
    type: 'SET_TEXT',
    payload: {}
  })
})

it('SET_TEXTS should return the correct action', () => {
  expect(actions.SET_TEXTS({})).toEqual({
    type: 'SET_TEXTS',
    payload: {}
  })
})

it('RESET_TEXT should return the correct action', () => {
  expect(actions.RESET_TEXT()).toEqual({
    type: 'RESET_TEXT'
  })
})

it('SET_TEXT_LOADED should return the correct action', () => {
  expect(actions.SET_TEXT_LOADED(true)).toEqual({
    type: 'SET_TEXT_LOADED',
    payload: true
  })
})

it('SET_TEXTS_LOADED should return the correct action', () => {
  expect(actions.SET_TEXTS_LOADED(true)).toEqual({
    type: 'SET_TEXTS_LOADED',
    payload: true
  })
})

it('SET_CATEGORIES should return the correct action', () => {
  expect(actions.SET_CATEGORIES({})).toEqual({
    type: 'SET_CATEGORIES',
    payload: {}
  })
})
