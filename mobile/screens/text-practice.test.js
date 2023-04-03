import { it } from '@jest/globals'
import TextPractice from './text-practice.js'
import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { render, fireEvent, waitFor, debug } from '@testing-library/react-native'

jest.mock('../components/snack-button.js', () => {
  const SnackButton = () => {}
  return SnackButton
})

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}))

jest.useFakeTimers()

it('renders without crashing shallow', () => {
  const renderer = new ShallowRenderer()
  renderer.render(
    <Provider store={store}>
      <NavigationContainer>
        <TextPractice />
      </NavigationContainer>
    </Provider>
  )
})

describe('TextPractice component', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      text: {
        sentences: [
          {
            words: [
              {
                arabic: 'مرحبا',
                english: 'hello'
              },
              {
                arabic: 'مرحبا',
                english: 'hi'
              },
              {
                arabic: 'مرحبا',
                english: 'hey'
              }
            ]
          }
        ]
      },
      textLoading: false
    })
  })
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <NavigationContainer>
          <TextPractice />
        </NavigationContainer>
      </Provider>
    )
  })
})
