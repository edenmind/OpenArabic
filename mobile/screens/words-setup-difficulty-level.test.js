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
    const { getByTestId, getByText } = render(<WordsSetupDifficultyLevel {...props} />)
    const surface = getByTestId('surface')

    const goalText = getByText('Goal')
    const examplesText = getByText('Examples')

    expect(surface).toBeDefined()

    expect(goalText).toBeDefined()
    expect(examplesText).toBeDefined()
  })

  it('renders beginner difficulty level correctly', () => {
    const { getByText } = render(<WordsSetupDifficultyLevel {...props} />)

    expect(getByText('Learn vocabulary in The Shahada and short Surahs.')).toBeDefined()
    expect(
      getByText('Say (قل), Path (صِرَٰطَ), And not (وَلَا), He (هُوَ), The Dawn (ٱلْفَلَقِ), He created (خَلَقَ).')
    ).toBeDefined()
  })

  it('renders mid-level difficulty level correctly', () => {
    const { getByText } = render(<WordsSetupDifficultyLevel difficultyLevel={20} />)
    expect(getByText('Learn vocabulary in the prayer and more Surahs.')).toBeDefined()
  })
})
