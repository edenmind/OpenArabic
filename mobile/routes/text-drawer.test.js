import { describe, it, jest } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

import TextDrawer from './text-drawer.js'
import { store } from '../redux/store.js'

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

  it('matches snapshot', () => {
    // @ts-ignore
    const renderer = new ShallowRenderer()
    renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <TextDrawer />
        </NavigationContainer>
      </Provider>
    )

    const result = renderer.getRenderOutput()

    expect(result).toMatchSnapshot()
  })
})
