import { it } from '@jest/globals'
import TextGrammar from './text-grammar.js'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'

describe('TextGrammar', () => {
  it('renders the required properties', () => {
    const props = {
      route: {
        params: {
          grammar: 'some grammar',
          arabic: 'some arabic text',
          english: 'some english text'
        }
      }
    }

    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <TextGrammar {...props} />
        </NavigationContainer>
      </Provider>
    )

    expect(getByText('some grammar')).toBeDefined()
    expect(getByText('some arabic text')).toBeDefined()
  })
})
