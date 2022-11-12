import { HOST, ENDPOINT } from './urls.js'
import { expect, it } from '@jest/globals'

describe('urls', () => {
  it('backend should be correct', () => {
    expect(HOST.backend).toBe('https://backend.openarabic.io')
  })

  it('texts should be correct', () => {
    expect(ENDPOINT.texts).toBe('texts')
  })

  it('categories should be correct', () => {
    expect(ENDPOINT.categories).toBe('categories')
  })
})
