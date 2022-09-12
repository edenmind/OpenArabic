import { describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import renderer from 'react-test-renderer'
import TextBilingual from './text-bilingual.js'
jest.useFakeTimers()

describe('<TextArabic />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <TextBilingual />
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
