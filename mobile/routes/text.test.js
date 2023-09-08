import { describe, it, jest } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

import Text from './text.js'
import { store } from '../redux/store.js'
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
