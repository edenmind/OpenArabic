import * as storage from './storage.js'

// test that the storage service is defined
test('storage service is defined', () => {
  expect(storage).toBeDefined()
})

// test that the storeData function is defined
test('storeData function is defined', () => {
  expect(storage.storeData).toBeDefined()
})

// test that the getData function is defined
test('getData function is defined', () => {
  expect(storage.getData).toBeDefined()
})

// test that the storeData works
test('storeData works', async () => {
  await storage.storeData('language', 'ar')
  const language = await storage.getData('language')

  expect(language).toBe('ar')
})

// test that the getData works
test('getData works', async () => {
  await storage.storeData('language', 'ar')
  const language = await storage.getData('language')

  expect(language).toBe('ar')
})

test('storeData overwrites existing data', async () => {
  await storage.storeData('language', 'en')
  await storage.storeData('language', 'ar')
  const language = await storage.getData('language')

  expect(language).toBe('ar')
})
