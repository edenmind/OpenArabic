import { jest, expect, describe, it } from '@jest/globals'
import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import TextScreen from '../screens/Texts/Text/TextScreen'
import { NavigationContainer } from '@react-navigation/native'
import { store } from '../redux/store'

jest.useFakeTimers()
describe('<TextScreen />', () => {
  it('has 1 child', async () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <NavigationContainer>
            <TextScreen route={{ params: ['textId: 1'] }} />
          </NavigationContainer>
        </Provider>
      )
      .toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(1)
  })
})
