import { describe, it, jest } from '@jest/globals'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import React from 'react'
import TextDrawer from './text-drawer.js'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'

jest.useFakeTimers()

describe('<TextDrawer />', () => {
  it('renders without crashing', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <TextDrawer />
        </NavigationContainer>
      </Provider>
    )
  })
})
