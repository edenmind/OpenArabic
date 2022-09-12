import { describe, it, jest } from '@jest/globals'
import React from 'react'
import Category from './category.js'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import NAVIGATIONTHEME from '../constants/navigation-theme.js'
import { NavigationContainer } from '@react-navigation/native'

jest.useFakeTimers()

describe('<Category />', () => {
  it('renders without crashing', () => {
    const route = {
      params: {
        category: 'All'
      }
    }

    // @ts-ignore
    const renderer = new ShallowRenderer()

    renderer.render(
      <Provider store={store}>
        <NavigationContainer
          // @ts-ignore
          theme={NAVIGATIONTHEME}
        >
          <Category route={route} />
        </NavigationContainer>
      </Provider>
    )
  })
})
