import { describe, expect, it, jest } from '@jest/globals'
import CategoryCard from './text-list-card.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'

jest.useFakeTimers()

describe('<CategoryCard />', () => {
  const textMock = {
    title: 'someTitle',
    id: 'someId',
    category: 'someCategory',
    author: 'someAuthor',
    texts: {
      english: 'someEnglish',
      arabic: 'someArabic'
    }
  }

  test('renders correctly', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <CategoryCard text={textMock} setShouldReload={() => {}} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
