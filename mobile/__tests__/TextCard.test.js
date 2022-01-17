import { expect, describe, it, jest } from '@jest/globals'
import { render } from '@testing-library/react-native'
import React from 'react'
import TextCard from '../screens/Texts/TextList/TextCard'

jest.useFakeTimers()

describe('<TextCard />', () => {
  it('should find the button via contactButton', () => {
    const testIdName = 'textCard'
    const textMock = {
      title: 'someTitle'
    }

    const { getByTestId } = render(<TextCard text={textMock} />)
    const foundButton = getByTestId(testIdName)

    expect(foundButton).toBeTruthy()
  })
})
