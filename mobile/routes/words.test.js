import { describe, it, jest } from '@jest/globals'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import Words from './words.js'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'
import SCREENS from '../constants/screens.js'
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
