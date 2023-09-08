import { describe, it, jest } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

import Words from './words.js'
import SCREENS from '../constants/screens.js'
import { store } from '../redux/store.js'
describe('<TextNavigator />', () => {
  it('renders without crashing', () => {
    const renderer = new ShallowRenderer()
    renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <Words />
        </NavigationContainer>
      </Provider>
    )
  })

  it('renders a NavigationContainer with the CombinedDarkTheme', () => {
    const renderer = new ShallowRenderer()
    renderer.render(
      <Provider store={store}>
        <Words />
      </Provider>
    )

    const result = renderer.getRenderOutput()
    expect(result.props.children.type).toBeTruthy()
  })
})
