import { UI } from '../constants/ui'
import { expect, it } from '@jest/globals'

it('share should be correct', () => {
  expect(UI.share).toBe('Share')
})

it('openArabic should be correct', () => {
  expect(UI.openArabic).toBe('OpenArabic')
})

it('texts should be correct', () => {
  expect(UI.texts).toBe('Texts')
})

it('null should be correct', () => {
  expect(UI.null).toBe('')
})
