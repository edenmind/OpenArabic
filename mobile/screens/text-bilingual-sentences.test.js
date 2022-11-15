import { describe, it, jest } from '@jest/globals'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import React from 'react'
import TextBilingualSentences from './text-bilingual-sentences.js'
import { NavigationContainer } from '@react-navigation/native'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

jest.useFakeTimers()
describe('<Sentence />', () => {
  it('renders without crashing', () => {
    // eslint-disable-next-line putout/objects-braces-inside-array
    const propsMock = [
      {
        sentenceID: '1',
        arabic: [{ a: 'a' }],
        english: [{ e: 'e' }],
        sentenceId: 1
      }
    ]
    // @ts-ignore
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <TextBilingualSentences sentences={propsMock} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
