import { generateShare, generateError } from './ui-services.js'

//jest fake timers
jest.useFakeTimers()

describe('generateShare', () => {
  it('returns a function', () => {
    const result = generateShare({})
    expect(typeof result).toBe('function')
  })
})

describe('generateError', () => {
  it('returns a function', () => {
    const result = generateError({})
    expect(typeof result).toBe('function')
  })
})
