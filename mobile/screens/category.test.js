import { describe, it, jest } from '@jest/globals'
import React from 'react'
import Category from './category.js'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'

jest.useFakeTimers()

describe('<Category />', () => {
  it('renders without crashing', () => {
    const route = {
      params: {
        category: 'All'
      }
    }

    // @ts-ignore
    const renderer = new ShallowRenderer()

    renderer.render(
      <Provider store={store}>
        <Category route={route} />
      </Provider>
    )
  })
})
