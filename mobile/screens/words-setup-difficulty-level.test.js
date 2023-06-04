import React from 'react'
import { render } from '@testing-library/react-native'
import WordsSetupDifficultyLevel from './words-setup-difficulty-level.js'

jest.mock('../styles/common.js', () => ({
  useSharedStyles: jest.fn(() => ({
    divider: {
      height: 1,
      backgroundColor: 'gray'
    },
    englishBody: {
      fontSize: 16,
      color: 'black'
    }
  }))
}))

describe('WordsSetupDifficultyLevel', () => {
  const props = {
    difficultyLevel: 10
  }

  it('renders correctly', () => {
    const { getByTestId } = render(<WordsSetupDifficultyLevel {...props} />)
    const surface = getByTestId('surface')

    expect(surface).toBeDefined()
  })
})
