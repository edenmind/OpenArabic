import React from 'react'
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'
import TextListCardGrammar from './text-list-card-grammar.js'

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
