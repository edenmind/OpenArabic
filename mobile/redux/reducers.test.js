/* eslint-disable putout/objects-braces-inside-array */
import { categoriesReducer, textReducer, textsReducer, UIStateReducer } from './reducers.js'
import { expect, it, jest } from '@jest/globals'
// jest should mock new Date
jest.useFakeTimers().setSystemTime(new Date('2021-01-01T00:00:00.000Z'))

it('categoriesReducer', () => {
  expect(categoriesReducer(undefined, { type: 'SET_CATEGORIES', payload: ['a'] })).toEqual({
    categories: ['a']
  })
})

it('textReducer', () => {
  expect(textReducer(undefined, { type: 'SET_TEXT', payload: ['a'] })).toEqual({
    text: ['a']
  })
})

it('textsReducer', () => {
  expect(textsReducer(undefined, { type: 'SET_TEXTS', payload: ['a'] })).toEqual({
    texts: ['a']
  })
})

it('textsReducer', () => {
  expect(textsReducer(undefined, { type: 'RESET_TEXTS' })).toEqual({
    texts: []
  })
})

it('textReducer', () => {
  expect(textReducer(undefined, { type: 'RESET_TEXT' })).toEqual({
    text: {
      arabic: ['a1', 'a2', 'a3'],
      english: ['e1', 'e2', 'e3'],
      status: 'Draft',
      title: '',
      publishAt: '2021-01-01T00:00:00.000Z',
      wordByWord: [['']],
      image: 'No Data',
      texts: { arabic: '', english: '' },
      category: 'No Data',
      author: '',
      arabicSentence: [''],
      source: '',
      vocabularyCollection: {
        numberOfBatches: 1,
        arabic: [[{ word: 'a', wordId: '1' }]],
        english: [[{ word: 'e', wordId: '1' }]]
      },
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

it('UIStateReducer', () => {
  expect(UIStateReducer(undefined, { type: 'SET_TEXT_LOADING', payload: true })).toEqual({
    arabicFontName: 'amiri',
    arabicFontSize: 27,
    englishFontSize: 16,
    isTransliterationOn: 'on',
    textLoading: true,
    textsLoading: true
  })
})
