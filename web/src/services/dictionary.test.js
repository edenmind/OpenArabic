import { getDictionary } from './dictionary.js'

test('should return an array of words', () => {
  const result = getDictionary()
  expect(result).toEqual(expect.any(Array))
})
