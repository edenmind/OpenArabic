/* eslint-disable unicorn/consistent-function-scoping */

'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('post word and get it back', async (t) => {
  //arrange
  const app = await build(t)

  const result = await app.inject({
    url: '/words',
    method: 'POST',
    headers: {
      auth: 'somesecurekey'
    },
    payload: {
      word: {
        arabic: 'the_word',
        english: 'the_',
        arabicSentence: 'the_arabicSentence',
        englishSentence: 'the_englishSentence',
        categoryLevel: 10,
        author: 'the_author',
        source: 'the_source',
        textId: 'the_textId',
        sentenceId: 'the_sentenceId',
        wordId: 'the_wordId'
      }
    }
  })

  //assert
  t.equal(result.statusCode, 201)

  const getWord = await app.inject({
    url: '/words/the_word',
    method: 'GET'
  })

  //assert
  t.equal(getWord.statusCode, 200)
})

test('read a created word', async (t) => {
  //arrange
  const app = await build(t)

  async function createWordsForLevel(level) {
    for (let index = 1; index <= 40; index++) {
      const result = await app.inject({
        url: '/words',
        method: 'POST',
        headers: {
          auth: 'somesecurekey'
        },
        payload: {
          word: {
            arabic: `the_word_${level}_${index}`,
            english: `the_${level}_${index}`,
            arabicSentence: 'the_arabicSentence',
            englishSentence: 'the_englishSentence',
            categoryLevel: level,
            author: 'the_author',
            source: 'the_source',
            textId: 'the_textId',
            sentenceId: 'the_sentenceId',
            wordId: 'the_wordId'
          }
        }
      })

      t.equal(result.statusCode, 201)
      // check that the created word is returned
      const getWord = await app.inject({
        url: `/words/the_word_${level}_${index}`,
        method: 'GET'
      })

      t.equal(getWord.statusCode, 200)
    }
  }

  // call the function for each level
  await createWordsForLevel(10)
  await createWordsForLevel(20)
  await createWordsForLevel(30)

  async function getWords(app) {
    const levels = [10, 20, 30]
    const counts = [10, 20, 40]

    const results = []

    for (const level of levels) {
      for (const count of counts) {
        const getWord = await app.inject({
          url: `/words?numberOfWordsToPractice=${count}&difficultyLevel=${level}`,
          method: 'GET'
        })

        results.push(getWord)

        // Test that the response status code is 200
        t.equal(getWord.statusCode, 200)

        // Parse the response body and check the length/count
        const words = JSON.parse(getWord.body)
        const expectedLength = Math.min(count, words.length) // In case there aren't enough words
        t.equal(words.length, expectedLength)
      }
    }

    return results
  }
  await getWords(app)
})

test('all words should be returned when no query parameters are provided', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const allWords = await app.inject({
    url: '/words',
    method: 'GET'
  })

  //assert
  t.equal(allWords.statusCode, 200)
})

test('cannot add word if English word is empty', async (t) => {
  // arrange
  const app = await build(t)

  // act
  const response = await app.inject({
    url: '/words',
    method: 'POST',
    payload: {
      word: {
        arabic: ''
      }
    }
  })

  // assert
  t.equal(response.statusCode, 400)
})

test('cannot add duplicate word', async (t) => {
  // arrange
  const app = await build(t)

  // add a word first
  await app.inject({
    url: '/words',
    method: 'POST',
    payload: {
      word: {
        arabic: 'the_word',
        english: 'the_translation'
      }
    }
  })

  // act
  const response = await app.inject({
    url: '/words',
    method: 'POST',
    payload: {
      word: {
        arabic: 'the_word',
        english: 'the_translation'
      }
    }
  })

  // assert
  t.equal(response.statusCode, 400)
})

test('cannot add word if Arabic word is not provided', async (t) => {
  // arrange
  const app = await build(t)

  // act
  const response = await app.inject({
    url: '/words',
    method: 'POST',
    payload: {
      word: {
        english: 'the_translation'
      }
    }
  })

  // assert
  t.equal(response.statusCode, 400)
})

test('cannot add word if sentenceEnglish is not provided', async (t) => {
  // arrange
  const app = await build(t)

  // act
  const response = await app.inject({
    url: '/words',
    method: 'POST',
    payload: {
      word: {
        arabic: 'the_word',
        english: 'the_translation',
        sentenceArabic: 'the_sentence'
      }
    }
  })

  // assert
  t.equal(response.statusCode, 400)
})

test('cannot add word if sentenceArabic is not provided', async (t) => {
  // arrange
  const app = await build(t)

  // act
  const response = await app.inject({
    url: '/words',
    method: 'POST',
    payload: {
      word: {
        arabic: 'the_word',
        english: 'the_translation',
        sentenceEnglish: 'the_sentence'
      }
    }
  })

  // assert
  t.equal(response.statusCode, 400)
})
