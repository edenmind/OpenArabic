import { it } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

import WordsSetup from './words-setup.js'
import { store } from '../redux/store.js'

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(
    <Provider store={store}>
      <NavigationContainer>
        <WordsSetup />
      </NavigationContainer>
    </Provider>
  )
})
