/* eslint-disable putout/objects-braces-inside-array */
import { describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import TextArabic from './text-arabic.js'
import renderer from 'react-test-renderer'
jest.mock('../components/spinner.js')
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

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
        title: '',
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

//mock textLoading in reducer initialStateLoading imported from ./redux/store.js and ./redux/reducer.js
describe('<TextArabic />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <TextArabic />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
