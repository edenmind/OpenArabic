import { describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { store } from '../redux/store.js'
import TextArabic from './text-arabic.js'

jest.useFakeTimers()

describe('<TextArabic />', () => {
  it('renders without crashing', () => {
    const renderer = new ShallowRenderer()
    renderer.render(
      <Provider store={store}>
        <TextArabic />
      </Provider>
    )
  })
})
