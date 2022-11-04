/* eslint-disable putout/objects-braces-inside-array */
import { describe, it, jest } from '@jest/globals'
import TextList from './text-list.js'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { store } from '../redux/store.js'

jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

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

describe('<Category />', () => {
  it('renders correctly', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <TextList route={'All'} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
