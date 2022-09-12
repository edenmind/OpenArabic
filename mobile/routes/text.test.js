import { describe, it, jest } from '@jest/globals'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import Text from './text.js'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'
jest.useFakeTimers()

describe('<TextNavigator />', () => {
  it('renders without crashing', () => {
    const renderer = new ShallowRenderer()
    renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <Text />
        </NavigationContainer>
      </Provider>
    )
  })
})
