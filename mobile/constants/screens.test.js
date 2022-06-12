import SCREENS from './screens.js'
import { expect, it } from '@jest/globals'

it('white should be correct', () => {
  expect(SCREENS.about).toBe('About')
})

it('text should be correct', () => {
  expect(SCREENS.text).toBe('Texts')
})

it('shinyOlive should be correct', () => {
  expect(SCREENS.home).toBe('Home')
})

it('bilingual should be correct', () => {
  expect(SCREENS.bilingual).toBe('Bilingual')
})

it('bilingual should be correct', () => {
  expect(SCREENS.arabic).toBe('Arabic')
})

it('bilingual should be correct', () => {
  expect(SCREENS.english).toBe('Eng')
})

it('bilingual should be correct', () => {
  expect(SCREENS.related).toBe('More')
})
