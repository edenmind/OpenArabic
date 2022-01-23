import { describe, it, jest } from '@jest/globals'
import React from 'react'
import TextList from '../screens/Texts/TextList/TextList'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'

jest.useFakeTimers()

describe('<TextList />', () => {
  it('renders without crashing', () => {
    const route = { params: { category: 'All' } }

    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(
      <Provider store={store}>
        <TextList route={route} />
      </Provider>
    )
  })
})
