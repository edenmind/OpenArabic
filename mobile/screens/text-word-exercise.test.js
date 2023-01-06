import { expect, describe, it, jest, afterEach } from '@jest/globals'
import { cleanup } from '@testing-library/react-native'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'
import OrderingWordsInASentence from './text-word-exercise.js'

// test so that OrderingWordsInASentence renders correctly
describe('<OrderingWordsInASentence />', () => {
  afterEach(cleanup)

  test('renders correctly', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <OrderingWordsInASentence />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
