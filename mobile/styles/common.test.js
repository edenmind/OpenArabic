import { expect, describe, it } from '@jest/globals'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'
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
})
