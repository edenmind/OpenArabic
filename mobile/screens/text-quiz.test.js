/* eslint-disable putout/objects-braces-inside-array */
import { expect, describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { store } from '../redux/store.js'
import TextQuiz from './text-quiz.js'

jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('../components/spinner.js')

//mock useSelector by returning a store with a text
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({
    text: {
      textLoading: true,
      text: {
        arabic: ['a1', 'a2', 'a3'],
        english: ['e1', 'e2', 'e3'],
        status: 'Draft',
        title: 'abc',
        publishAt: '2021-01-01T00:00:00.000Z',
        wordByWord: [['']],
        image: 'abc',
        texts: { arabic: '', english: '' },
        category: 'abc',
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
    }
  })
}))

it('renders correctly', () => {
  const rendered = renderer
    .create(
      <Provider store={store}>
        <TextQuiz />
      </Provider>
    )
    .toJSON()
  expect(rendered).toMatchSnapshot()
})
