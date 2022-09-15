/* eslint-disable putout/objects-braces-inside-array */
import { categoriesReducer, textReducer, textsReducer } from './reducers.js'
import { expect, it } from '@jest/globals'

it('categoriesReducer should return the initial state', () => {
  expect(categoriesReducer(undefined, {})).toEqual({
    categories: [{ name: 'No categories', id: '123' }]
  })
})

it('textReducer should return the initial state', () => {
  expect(textReducer(undefined, {})).toEqual({
    text: {
      arabic: ['a1', 'a2', 'a3'],
      english: ['e1', 'e2', 'e3'],
      status: 'Draft',
      publishAt: new Date().toUTCString(),
      wordByWord: [['']],
      image: 'abc',
      texts: { arabic: '', english: '' },
      category: 'abc',
      author: '',
      arabicSentence: [''],
      source: '',
      vocabularyCollection: { arabic: ['a1', 'a2', 'a3'], english: ['e1', 'e2', 'e3'] },
      // eslint-disable-next-line putout/objects-braces-inside-array
      sentences: [
        {
          english: 'e1',
          arabic: 'a1',
          words: [
            {
              arabic: 'a',
              english: '1'
            }
          ]
        },
        {
          english: 'e2',
          arabic: 'a2',
          words: [
            {
              arabic: 'a',
              english: '2'
            }
          ]
        },
        {
          english: 'e3',
          arabic: 'a3',
          words: [
            {
              arabic: 'a',
              english: '3'
            }
          ]
        }
      ]
    }
  })
})

it('textsReducer should return the initial state', () => {
  expect(textsReducer(undefined, {})).toEqual({
    texts: []
  })
})
