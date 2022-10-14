/* eslint-disable operator-linebreak */
/* eslint-disable putout/long-properties-destructuring */
/* eslint-disable putout/objects-braces-inside-array */

'use strict'

const { produceVocabularyCollection, timeAgo, readingTime } = require('../../services/utils')
const { test } = require('tap')

test('should return time ago from date', (t) => {
  //arrange
  const date = new Date()
  const expected = 'a few seconds ago'
  //act
  const actual = timeAgo(date)
  //assert
  t.equal(actual, expected)
  t.end()
})

test('should return reading time based on length of text', (t) => {
  //arrange
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum felis at rutrum congue. Cras eget aliquet nulla. Integer vitae placerat dui. Nullam luctus dolor in quam volutpat, sit amet mollis nunc bibendum. Donec bibendum metus ut posuere imperdiet. Nam condimentum leo et lectus vulputate viverra. Donec a dolor in metus vehicula tempor eu et justo. Maecenas vitae neque quis massa faucibus mattis non vel odio. Curabitur eget turpis non enim commodo volutpat. Etiam finibus neque erat, a gravida erat consectetur nec. Sed mollis lacinia est, eget aliquam diam. Nunc ac tincidunt lectus, et bibendum enim. Aenean rhoncus molestie neque, non vestibulum quam dignissim quis. Integer laoreet a enim a mollis.'
  const expected = '3 mins read'
  //act
  const actual = readingTime(text)
  //assert
  t.equal(actual, expected)
  t.end()
})

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
