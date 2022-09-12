import { expect, describe, it, jest } from '@jest/globals'
import { render } from '@testing-library/react-native'
import React from 'react'
import CategoryCard from './category-card.js'
import renderer from 'react-test-renderer'

jest.useFakeTimers()

describe('<CategoryCard />', () => {
  const testIdName = 'textCard'
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
    const tree = renderer.create(<CategoryCard text={textMock} setShouldReload={() => {}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should find the button via contactButton', () => {
    const { getByTestId } = render(<CategoryCard text={textMock} setShouldReload={() => {}} />)
    const foundButton = getByTestId(testIdName)

    expect(foundButton).toBeTruthy()
  })
})
