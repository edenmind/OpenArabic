import { expect, describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import TextQuiz from './text-quiz.js'
import renderer from 'react-test-renderer'

jest.useFakeTimers()

describe('<TextQuiz />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <TextQuiz />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
