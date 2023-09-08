import { expect, it } from '@jest/globals'

import SCREENS from './screens.js'

it('white should be correct', () => {
  expect(SCREENS.about).toBe('About')
})

it('text should be correct', () => {
  expect(SCREENS.text).toBe('Text')
})

it('shinyOlive should be correct', () => {
  expect(SCREENS.home).toBe('Texts')
})

it('bilingual should be correct', () => {
  expect(SCREENS.bilingual).toBe('Read')
})

it('bilingual should be correct', () => {
  expect(SCREENS.arabic).toBe('Read')
})

it('bilingual should be correct', () => {
  expect(SCREENS.english).toBe('Eng')
})

it('bilingual should be correct', () => {
  expect(SCREENS.related).toBe('More')
})
