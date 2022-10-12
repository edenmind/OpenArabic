/* eslint-disable putout/objects-braces-inside-array */
import { expect, describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { store } from '../redux/store.js'
import TextQuiz from './text-quiz.js'

jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

describe('<TextQuiz />', () => {
  it('renders without crashing', () => {
    const rendered = renderer
      .create(
        <Provider store={store}>
          <TextQuiz />
        </Provider>
      )
      .toJSON()
    expect(rendered).toBeTruthy()
  })
})

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
