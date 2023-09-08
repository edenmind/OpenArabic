import { describe, it, jest } from '@jest/globals'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6

import TextTabs from './text-tabs.js'
import { store } from '../redux/store.js'

describe('<TextTabs />', () => {
  it('when isLoading is true, should match snapshot', () => {
    //mock id router.params
    const route = {
      params: {
        id: '1'
      }
    }
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <TextTabs route={route} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
