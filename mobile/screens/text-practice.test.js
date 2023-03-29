import { it } from '@jest/globals'
import TextPractice from './text-practice.js'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { render, fireEvent } from '@testing-library/react-native'

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()
  renderer.render(
    <Provider store={store}>
      <NavigationContainer>
        <TextPractice />
      </NavigationContainer>
    </Provider>
  )
})

// test that the component renders without crashing when practicingWords is true in the store
it('renders without crashing when textLoading is true', () => {
  // set practicingWords to true in the store
  store.dispatch({
    type: 'SET_TEXTS_LOADED',
    textLoading: true
  })

  const renderer = new ShallowRenderer()
  renderer.render(
    <Provider store={store}>
      <NavigationContainer>
        <TextPractice />
      </NavigationContainer>
    </Provider>
  )
})