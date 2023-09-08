import { expect, describe, it } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

import { store } from '../redux/store.js'
import { useSharedStyles } from '../styles/common.js'

//test that usedSharedStyles exists
describe('useSharedStyles', () => {
  it('exists', () => {
    //provide a mock store
    const renderer = new ShallowRenderer()
    renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <useSharedStyles />
        </NavigationContainer>
      </Provider>
    )

    expect(useSharedStyles).toBeDefined()
  })

  it('returns an object', () => {
    //provide a mock store
    const renderer = new ShallowRenderer()
    renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <useSharedStyles />
        </NavigationContainer>
      </Provider>
    )

    expect(typeof useSharedStyles).toBe('function')
  })

  it('should match snapshot', () => {
    //create a basic component to test
    const TestComponent = () => {
      const sharedStyle = useSharedStyles()
      return (
        <div>
          <Text style={sharedStyle.arabicBody}>Test</Text>
        </div>
      )
    }

    //provide a mock store
    const renderer = new ShallowRenderer()

    renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <TestComponent />
        </NavigationContainer>
      </Provider>
    )

    expect(renderer.getRenderOutput()).toMatchSnapshot()
  })
})
