import { CombinedDarkTheme } from './paper-theme.js'
import { expect, it } from '@jest/globals'

it('should have a CombinedDarkTheme', () => {
  expect(CombinedDarkTheme).toBeDefined()
})
it('should have a CombinedDarkTheme.colors', () => {
  expect(CombinedDarkTheme.colors).toBeDefined()
})
