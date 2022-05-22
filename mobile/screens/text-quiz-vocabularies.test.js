import { expect, describe, it, jest } from '@jest/globals'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { store } from '../redux/store.js'
import TextQuizVocabularies from './text-quiz-vocabularies.js'

jest.useFakeTimers()
const pressArabicWordHandler = () => {}
const pressEnglishWordHandler = () => {}

describe('<TextQuizVocabularies />', () => {
  it('has 1 child', () => {
    const vocabularyCollection = {
      arabic: [{ a: 'a' }],
      english: [{ e: 'e' }]
    }

    const arabicSelectedCollection = 1
    const englishSelectedCollection = 1

    const tree = renderer
      .create(
        <Provider store={store}>
          <TextQuizVocabularies
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
