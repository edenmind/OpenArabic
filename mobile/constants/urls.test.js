import { expect, it } from '@jest/globals'

import { HOST, ENDPOINT } from './urls.js'

describe('urls', () => {
  it('texts should be correct', () => {
    expect(ENDPOINT.texts).toBe('texts')
  })

  it('categories should be correct', () => {
    expect(ENDPOINT.categories).toBe('categories')
  })
})
