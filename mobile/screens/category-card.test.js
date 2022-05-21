import { expect, describe, it, jest } from '@jest/globals'
import { render } from '@testing-library/react-native'
import React from 'react'
import CategoryCard from './category-card.js'

jest.useFakeTimers()

describe('<CategoryCard />', () => {
  it('should find the button via contactButton', () => {
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

    const { getByTestId } = render(<CategoryCard text={textMock} setShouldReload={false} />)
    const foundButton = getByTestId(testIdName)

    expect(foundButton).toBeTruthy()
  })
})
