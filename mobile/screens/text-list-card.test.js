import { describe, expect, jest } from '@jest/globals'
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

  test('renders correctly with no image', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <CategoryCard text={{ ...textMock, image: '' }} setShouldReload={() => {}} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })

  test('renders correctly with no author', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <CategoryCard text={{ ...textMock, author: '' }} setShouldReload={() => {}} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })

  test('renders correctly with no source', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <CategoryCard text={{ ...textMock, source: '' }} setShouldReload={() => {}} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })

  test('renders correctly with no category', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <CategoryCard text={{ ...textMock, category: '' }} setShouldReload={() => {}} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })

  test('renders correctly with no texts', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <CategoryCard text={{ ...textMock, texts: {} }} setShouldReload={() => {}} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })

  test('renders correctly with no english text', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <CategoryCard text={{ ...textMock, texts: { arabic: 'someArabic' } }} setShouldReload={() => {}} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })

  test('renders correctly with no arabic text', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <CategoryCard text={{ ...textMock, texts: { english: 'someEnglish' } }} setShouldReload={() => {}} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })

  test('renders correctly with no texts', () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(
      <Provider store={store}>
        <NavigationContainer>
          <CategoryCard text={{ ...textMock, texts: {} }} setShouldReload={() => {}} />
        </NavigationContainer>
      </Provider>
    )

    expect(tree).toMatchSnapshot()
  })
})
