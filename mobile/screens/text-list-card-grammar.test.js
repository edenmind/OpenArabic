import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'

import TextListCardGrammar from './text-list-card-grammar.js'
import { store } from '../redux/store.js'

describe('TextListCardGrammar', () => {
  it('renders the required properties', () => {
    const props = {
      navigation: {},
      setShouldReload: jest.fn(),
      text: {
        english: 'some english text',
        arabic: 'some arabic text'
      }
    }

    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <TextListCardGrammar {...props} />
        </NavigationContainer>
      </Provider>
    )

    expect(getByText('Some english text')).toBeDefined()
    expect(getByText('some arabic text')).toBeDefined()
  })
})
