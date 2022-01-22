import { COLORS } from '../constants/colors'
import { expect, it } from '@jest/globals'

it('white should be correct', () => {
  expect(COLORS.white).toBe('#ffffff')
})

it('lightOlive should be correct', () => {
  expect(COLORS.lightOlive).toBe('#e4f2d6')
})

it('shinyOlive should be correct', () => {
  expect(COLORS.shinyOlive).toBe('#fafddf')
})

it('darkOlive should be correct', () => {
  expect(COLORS.darkOlive).toBe('#3e423a')
})
