import { describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { store } from '../redux/store.js'
import TextBilingual from './text-bilingual.js'

jest.useFakeTimers()

describe('<TextBilingual />', () => {
  it('has 1 child', () => {
    const renderer = new ShallowRenderer()
    renderer.render(
      <Provider store={store}>
        <TextBilingual />
      </Provider>
    )
  })
})
