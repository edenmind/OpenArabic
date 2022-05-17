import { expect, describe, it, jest } from '@jest/globals'
import { render } from '@testing-library/react-native'
import React from 'react'
import CategoryCard from './category-card.js'

jest.useFakeTimers()

describe('<CategoryCard />', () => {
  it('should find the button via contactButton', () => {
    const testIdName = 'textCard'
    const textMock = {
      title: 'someTitle'
    }

    const { getByTestId } = render(<CategoryCard text={textMock} />)
    const foundButton = getByTestId(testIdName)

    expect(foundButton).toBeTruthy()
  })
})
