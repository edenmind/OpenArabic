import { describe, it, jest } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

import Root from './root.js'
import { store } from '../redux/store.js'

jest.useFakeTimers()
describe('<Root />', () => {
  it('screen with name "Texts" should match snapshot', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
