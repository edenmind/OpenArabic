import React from 'react'
import { render } from '@testing-library/react-native'
import HighlightedWordInText from './highlighted-word-in-text.js'

jest.mock('../styles/common.js', () => {
  return {
    useSharedStyles: () => {
      return {
        arabicBody: {
          fontFamily: 'Arial',
          fontSize: 16,
          lineHeight: 20
        }
      }
    }
  }
})

describe('HighlightedWordInText', () => {
  it('should render the correct text with highlighted word', () => {
    const word = 'highlighted'
    const text = 'This is a highlighted word.'

    const { getByText } = render(<HighlightedWordInText word={word} text={text} />)

    const highlightedWord = getByText(word)
    expect(highlightedWord).toBeTruthy()
  })

  //it should find the words that are not highlighted
})

test.each([
  ['This', true],
  ['is', true],
  ['a', true],
  ['word.', true]
])('should find the word "%s" in the text (highlighted=%s)', (text) => {
  const { getByText } = render(<HighlightedWordInText word={'highlighted'} text={'This is a highlighted word.'} />)
  const element = getByText(text)

  expect(element).toBeTruthy()
})
