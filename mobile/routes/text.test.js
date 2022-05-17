import { expect, describe, it, jest } from '@jest/globals'
import React from 'react'
import renderer from 'react-test-renderer'
import Text from './text.js'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'

jest.useFakeTimers()

describe('<TextNavigator />', () => {
  it('has 1 child', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <NavigationContainer>
            <Text />
          </NavigationContainer>
        </Provider>
      )
      .toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(1)
  })
})
