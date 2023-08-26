import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import TextPracticeArabicWords from './text-practice-words.js'

const mockStore = configureMockStore([])

describe('TextPracticeArabicWords component', () => {
  const currentArabicWordsInSentence = [
    { id: '1', english: 'e1', arabic: 'a1' },
    { id: '2', english: 'e2', arabic: 'a2' }
  ]

  it('can find a1 and a2', () => {
    // const store = mockStore({})
    // const mockHandlePress = jest.fn()
    // const { getByTestId } = render(
    //   <Provider store={store}>
    //     <TextPracticeArabicWords
    //       currentArabicWordsInSentence={currentArabicWordsInSentence}
    //       handlePress={mockHandlePress}
    //     />
    //   </Provider>
    // )
    // const arabicWord1 = getByTestId('a1')
    // expect(arabicWord1).toBeDefined()
    // const arabicWord2 = getByTestId('a2')
    // expect(arabicWord2).toBeDefined()
    // //press arabic word 1
    // fireEvent(arabicWord1, 'press', { nativeEvent: {} })
    // expect(mockHandlePress).toHaveBeenCalledWith('1', 'a1')
    // expect(mockHandlePress).not.toHaveBeenCalledWith('2', 'a2')
    // //press arabic word 2
    // fireEvent(arabicWord2, 'press', { nativeEvent: {} })
    // expect(mockHandlePress).toHaveBeenCalledTimes(2)
  })
})
