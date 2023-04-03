/* eslint-disable putout/function-declaration-paren-newline */
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import WordsContent from './words-content.js'
import { store } from '../redux/store.js'
// eslint-disable-next-line unicorn/no-object-as-default-parameter
jest.mock('../components/snack-button.js', () => {
  const SnackButton = () => {}
  return SnackButton
})

jest.useFakeTimers()

describe('WordsContent', () => {
  it('displays the word to practice', async () => {
    const handleSetCurrentWord = jest.fn()
    const handleSetCurrentWordIndex = jest.fn()

    const { getByText } = render(
      <Provider store={store}>
        <WordsContent
          currentWord={0}
          numberOfWordsToPractice={5}
          handleSetCurrentWord={handleSetCurrentWord} // Pass the actual function here
          currentWordIndex={0}
          handleSetCurrentWordIndex={handleSetCurrentWordIndex} // Pass the actual function here
          celebrationSnackBarVisibility={false}
          handleSetCelebrationSnackBarVisibility={() => {}}
          source="some source"
          author="some author"
          correctAnswer={WordsContent.mockCorrectAnswer}
        />
      </Provider>
    )

    const wordToPractice = getByText('hello') //correct answer
    const wordToPractice2 = getByText('hi') //incorrect answer
    const wordToPractice3 = getByText('hey') //incorrect answer

    expect(wordToPractice).toBeDefined()
    expect(wordToPractice2).toBeDefined()
    expect(wordToPractice3).toBeDefined()
    //Press correct answer
    fireEvent(wordToPractice, 'press', { nativeEvent: {} })
    expect(handleSetCurrentWord).toHaveBeenCalledTimes(1)
    expect(handleSetCurrentWordIndex).toHaveBeenCalledTimes(1)
  })
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <WordsContent
          currentWord={0}
          numberOfWordsToPractice={5}
          handleSetCurrentWord={() => {}}
          currentWordIndex={0}
          handleSetCurrentWordIndex={() => {}}
          celebrationSnackBarVisibility={false}
          handleSetCelebrationSnackBarVisibility={() => {}}
          source="some source"
          author="some author"
        />
      </Provider>
    )
  })

  it('displays three buttons for multiple choice', () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <WordsContent
          currentWord={0}
          numberOfWordsToPractice={5}
          handleSetCurrentWord={() => {}}
          currentWordIndex={0}
          handleSetCurrentWordIndex={() => {}}
          celebrationSnackBarVisibility={false}
          handleSetCelebrationSnackBarVisibility={() => {}}
          source="some source"
          author="some author"
        />
      </Provider>
    )

    const buttons = getAllByRole('button')
    expect(buttons.length).toBe(3)
  })
})
