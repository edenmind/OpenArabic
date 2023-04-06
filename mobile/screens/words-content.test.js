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

//mock the modal scrollview
jest.mock('../components/modal-scroll-view.js', () => {
  const ModalScrollView = () => {}
  return ModalScrollView
})
jest.useFakeTimers()

describe('WordsContent', () => {
  it('displays the word to practice', async () => {
    const handleSetCurrentWord = jest.fn()
    const handleSetCurrentWordIndex = jest.fn()

    const { getByText, getAllByRole } = render(
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

    function iterateTest(time) {
      for (let i = 0; i < time; i++) {
        const buttons = getAllByRole('button')
        expect(buttons.length).toBe(4)

        const wordToPractice = getByText('peace') //correct answer
        const wordToPractice2 = getByText('upon') //incorrect answer
        const wordToPractice3 = getByText('you') //incorrect answer

        expect(wordToPractice).toBeDefined()
        expect(wordToPractice2).toBeDefined()
        expect(wordToPractice3).toBeDefined()
        //Press correct answer
        fireEvent(wordToPractice, 'press', { nativeEvent: {} })
        expect(handleSetCurrentWord).toHaveBeenCalledTimes(i + 1)
        expect(handleSetCurrentWordIndex).toHaveBeenCalledTimes(i + 1)
        expect(buttons.length).toBe(4)
      }
    }

    iterateTest(100)
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
    expect(buttons.length).toBe(4)
  })
})
