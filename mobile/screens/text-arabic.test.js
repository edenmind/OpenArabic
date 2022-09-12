import { describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { store } from '../redux/store.js'
import TextArabic from './text-arabic.js'
import renderer from 'react-test-renderer'

jest.useFakeTimers()

describe('<TextArabic />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <TextArabic />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
