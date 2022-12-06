/* eslint-disable operator-linebreak */
/* eslint-disable putout/long-properties-destructuring */
/* eslint-disable putout/objects-braces-inside-array */

'use strict'

const {
  produceVocabularyCollection,
  timeAgo,
  readingTime,
  slugifyWithAuthor,
  mp3Filename
} = require('../../services/utils')
const { test } = require('tap')

//test that mp3Filename returns the expected string
test('mp3Filename returns the expected string', (t) => {
  //arrange
  const text = 'text'
  const sentence = 'sentence'
  const language = 'language'
  const word = 'word'

  const expected = 'text-sentence-language-word.mp3'
  //act
  const actual = mp3Filename(text, sentence, language, word)
  //assert
  t.equal(actual, expected)
  t.end()
})

test('should return correct slug from title and author', (t) => {
  const title = 'The Adventures of Tom Sawyer'
  const author = 'Mark Twain'
  const slug = 'the-adventures-of-tom-sawyer-mark-twain'
  const result = slugifyWithAuthor(title, author)

  t.equal(result, slug)
  t.end()
})

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
            arabic: 'a1',
            english: '12',
            quiz: true
          },
          {
            arabic: 'a2',
            english: '13',
            quiz: true
          },
          {
            arabic: 'a3',
            english: '14',
            quiz: true
          },
          {
            arabic: 'a4',
            english: '15',
            quiz: true
          },
          {
            arabic: 'a5',
            english: '16',
            quiz: true
          },
          {
            arabic: 'a6',
            english: '17',
            quiz: true
          },
          {
            arabic: 'a7',
            english: '18',
            quiz: true
          },
          {
            arabic: 'a8',
            english: '19',
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
