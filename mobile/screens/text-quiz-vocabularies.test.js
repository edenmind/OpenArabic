import { expect, describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { store } from '../redux/store.js'
import TextQuizVocabularies from './text-quiz-vocabularies.js'

jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
const pressArabicWordHandler = () => {}
const pressEnglishWordHandler = () => {}

describe('<TextQuizVocabularies />', () => {
  it('has 1 child', () => {
    const vocabularyCollection = {
      numberOfBatches: 1,
      arabic: [[{ word: 'a', wordId: '1' }]],
      english: [[{ word: 'e', wordId: '1' }]]
    }

    const currentBatch = 0

    const arabicSelectedCollection = [true, true, true]
    const englishSelectedCollection = [true, true, true]

    const tree = renderer
      .create(
        <Provider store={store}>
          <TextQuizVocabularies
            currentBatch={currentBatch}
            vocabularyCollection={vocabularyCollection}
            pressArabicWordHandler={pressArabicWordHandler}
            pressEnglishWordHandler={pressEnglishWordHandler}
            arabicSelectedCollection={arabicSelectedCollection}
            englishSelectedCollection={englishSelectedCollection}
          />
        </Provider>
      )
      .toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(2)
  })

  it('when arabicSelectedCollection is empty, it has 1 child', () => {
    const vocabularyCollection = {
      numberOfBatches: 1,
      arabic: [[{ word: 'a', wordId: '1' }]],
      english: [[{ word: 'e', wordId: '1' }]]
    }

    const currentBatch = 0

    const arabicSelectedCollection = []
    const englishSelectedCollection = []

    const tree = renderer
      .create(
        <Provider store={store}>
          <TextQuizVocabularies
            currentBatch={currentBatch}
            vocabularyCollection={vocabularyCollection}
            pressArabicWordHandler={pressArabicWordHandler}
            pressEnglishWordHandler={pressEnglishWordHandler}
            arabicSelectedCollection={arabicSelectedCollection}
            englishSelectedCollection={englishSelectedCollection}
          />
        </Provider>
      )
      .toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(2)
  })
})
