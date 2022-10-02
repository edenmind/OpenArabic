'use strict'

/* eslint-disable putout/objects-braces-inside-array */
const { produceVocabularyCollection } = require('../../services/utils')
const { test } = require('tap')
test('produce vocabulary', (t) => {
  //arrange
  const text = {
    arabic: ['a1', 'a2', 'a3'],
    english: ['e1', 'e2', 'e3'],
    status: 'Draft',
    publishAt: new Date().toUTCString(),
    wordByWord: [['']],
    image: 'abc',
    texts: { arabic: '', english: '' },
    category: 'abc',
    author: '',
    arabicSentence: [''],
    source: '',
    vocabularyCollection: { arabic: ['a1', 'a2', 'a3'], english: ['e1', 'e2', 'e3'] },
    // eslint-disable-next-line putout/objects-braces-inside-array
    sentences: [
      {
        english: 'e1',
        arabic: 'a1',
        words: [
          {
            arabic: 'a',
            english: '1',
            quiz: true
          },
          {
            arabic: 'a',
            english: '1',
            quiz: true
          },
          {
            arabic: 'a',
            english: '1',
            quiz: true
          },
          {
            arabic: 'a',
            english: '1',
            quiz: true
          },
          {
            arabic: 'a',
            english: '1',
            quiz: true
          },
          {
            arabic: 'a',
            english: '1',
            quiz: true
          },
          {
            arabic: 'a',
            english: '1',
            quiz: true
          },
          {
            arabic: 'a',
            english: '1',
            quiz: true
          }
        ]
      },
      {
        english: 'e2',
        arabic: 'a2',
        words: [
          {
            arabic: 'a',
            english: '2'
          }
        ]
      },
      {
        english: 'e3',
        arabic: 'a3',
        words: [
          {
            arabic: 'a',
            english: '3'
          }
        ]
      }
    ]
  }

  // act
  const vocabularyCollection = produceVocabularyCollection(text)

  //assert
  t.match(vocabularyCollection, { numberOfBatches: 1, arabic: [], english: [] }, 'OK')
  t.end()
})
