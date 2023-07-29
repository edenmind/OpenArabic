import { getVerb, getNoun, getParticle } from './grammar-service.js'

test('getVerb returns a string', () => {
  const verb = getVerb()
  expect(verb).not.toBe(undefined)
})

test('getNoun returns a string', () => {
  const noun = getNoun()
  expect(noun).not.toBe(undefined)
})

test('getParticle returns a string', () => {
  const particle = getParticle()
  expect(particle).not.toBe(undefined)
})
