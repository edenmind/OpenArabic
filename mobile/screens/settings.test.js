import { expect, describe, jest, afterEach } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import { cleanup } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

import TextSettingsScreen from './settings.js'
import { store } from '../redux/store.js'

jest.useFakeTimers()
describe('<TextSettingsScreen />', () => {
  afterEach(cleanup)

  test('renders correctly', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <TextSettingsScreen />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
