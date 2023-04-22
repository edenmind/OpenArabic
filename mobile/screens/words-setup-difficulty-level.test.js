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

  it('renders beginner difficulty level correctly', () => {
    const { getByText } = render(<WordsSetupDifficultyLevel {...props} />)

    expect(
      getByText(
        'Learn the words in the Shahada (testimony of faith) and short Surahs (Al-Fatiha, Al-Ikhlas, Al-Falaq, and An-Nas).'
      )
    ).toBeDefined()
  })

  it('renders mid-level difficulty level correctly', () => {
    const { getByText } = render(<WordsSetupDifficultyLevel difficultyLevel={20} />)
    expect(
      getByText('Learn the words in the five daily prayers and additional short Surahs from Juz Amma in the Quran.')
    ).toBeDefined()
  })
})
