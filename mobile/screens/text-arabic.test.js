import { describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import TextArabic from './text-arabic.js'
import renderer from 'react-test-renderer'

jest.useFakeTimers()
jest.mock('../components/spinner.js')
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
