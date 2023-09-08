/* eslint-disable putout/objects-braces-inside-array */
import { expect, it, jest } from '@jest/globals'

import { store } from './store.js'

jest.useFakeTimers().setSystemTime(new Date('2021-01-01T00:00:00.000Z'))

it('store should be defined', () => {
  expect(store).toBeDefined()
})
