import { generateShare, generateTextError } from './ui-services.js'

//jest fake timers
jest.useFakeTimers()

describe('generateShare', () => {
  it('returns a function', () => {
    const result = generateShare({})
    expect(typeof result).toBe('function')
  })
})

describe('generateTextError', () => {
  it('returns a function', () => {
    const result = generateTextError({})
    expect(typeof result).toBe('function')
  })
})
