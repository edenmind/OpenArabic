import { it } from '@jest/globals'
import WordsSetup from './words-setup.js'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
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
