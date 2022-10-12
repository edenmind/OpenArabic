import { describe, expect, it, jest } from '@jest/globals'

import CategoryCard from './text-list-card.js'
import React from 'react'
import { render } from '@testing-library/react-native'
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

  it('should find the button via contactButton', () => {
    const { getByTestId } = render(<CategoryCard text={textMock} setShouldReload={() => {}} />)
    const foundButton = getByTestId('pressableOpacity')

    expect(foundButton).toBeTruthy()
  })
})
