import { generateTextError } from './ui-services.js'

//jest fake timers
jest.useFakeTimers()

describe('generateTextError', () => {
  it('returns a function', () => {
    const result = generateTextError({})
    expect(typeof result).toBe('function')
  })
})
