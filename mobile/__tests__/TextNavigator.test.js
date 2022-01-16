import { expect, describe, it, jest } from '@jest/globals'
import React from 'react'
import renderer from 'react-test-renderer'
import TextNavigator from '../screens/Texts/TextNavigator'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { NavigationContainer } from '@react-navigation/native'

jest.useFakeTimers()

describe('<TextNavigator />', () => {
  it('has 1 child', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <NavigationContainer>
            <TextNavigator />
          </NavigationContainer>
        </Provider>
      )
      .toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(1)
  })
})
