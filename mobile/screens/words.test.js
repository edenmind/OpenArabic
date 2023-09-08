import { it } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

import Words from './words.js'
import { store } from '../redux/store.js'

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(
    <Provider store={store}>
      <NavigationContainer>
        <Words />
      </NavigationContainer>
    </Provider>
  )
})

// test that the component renders without crashing when practicingWords is true in the store
it('renders without crashing when practicingWords is true', () => {
  // set practicingWords to true in the store
  store.dispatch({
    type: 'SET_PRACTICING_WORDS',
    practicingWords: true
  })

  const renderer = new ShallowRenderer()
  renderer.render(
    <Provider store={store}>
      <NavigationContainer>
        <Words />
      </NavigationContainer>
    </Provider>
  )
})

// test that the component renders without crashing when practicingWords is false in the store
it('renders without crashing when practicingWords is false', () => {
  // set practicingWords to false in the store
  store.dispatch({
    type: 'SET_PRACTICING_WORDS',
    practicingWords: false
  })

  const renderer = new ShallowRenderer()
  renderer.render(
    <Provider store={store}>
      <NavigationContainer>
        <Words />
      </NavigationContainer>
    </Provider>
  )
})
