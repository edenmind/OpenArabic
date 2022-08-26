import { expect, describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { store } from '../redux/store.js'
import TextQuiz from './text-quiz.js'

jest.useFakeTimers()

describe('<TextQuiz />', () => {
  it('has 1 child', () => {
    const renderer = new ShallowRenderer()
    renderer.render(
      <Provider store={store}>
        <TextQuiz />
      </Provider>
    )
  })
})
