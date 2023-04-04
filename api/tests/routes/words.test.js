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

test('create words', { timeout: 60 * 1000 }, async (t) => {
  //arrange
  const app = await build(t)

  async function createWords(numberWords, level, app) {
    function generateRandomWord(minLength, maxLength) {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'
      const length = Math.floor(Math.random() * (maxLength - minLength + 1) + minLength) // generate a random length between minLength and maxLength
      let result = ''

      for (let index = 0; index < length; index++) {
        result += alphabet[Math.floor(Math.random() * alphabet.length)] // add a random letter to the result string
      }

      return result
    }

    for (let index = 1; index <= numberWords; index++) {
      const englishWord = generateRandomWord(5, 21)
      const result = await app.inject({
        url: '/words',
        method: 'POST',
        headers: {
          auth: 'somesecurekey'
        },
        payload: {
          word: {
            arabic: `the_word_${level}_${index}`,
            english: englishWord,
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

  async function getWords(app) {
    const levels = [10, 20, 30]
    const counts = [10, 20, 40]

    const results = []

    for (const level of levels) {
      for (const count of counts) {
        await createWords(count, level, app)
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

        // check so that no properties are empty
        for (const word of words) {
          t.ok(word.arabic)
          t.ok(word.english)
          t.ok(word.arabicSentence)
          t.ok(word.englishSentence)
          t.ok(word.categoryLevel)
          t.ok(word.author)
          t.ok(word.source)
          t.ok(word.textId)
          t.ok(word.sentenceId)
          t.ok(word.wordId)
        }

        // check so that alternative1 and alternative2 are not the same as the correct answer
        for (const word of words) {
          t.notEqual(word.english, word.alternative1)
          t.notEqual(word.english, word.alternative2)
          t.notEqual(word.alternative1, word.alternative2)
        }

        // check so that the difficulty level is correct
        for (const word of words) {
          t.equal(Number(word.categoryLevel), level)
        }

        // check so that the words are unique
        const uniqueWords = new Set(words.map((word) => word.arabic))

        t.equal(uniqueWords.size, words.length)

        // check so that alternative1 and alternative2 are less than 11 characters
        for (const word of words) {
          t.ok(word.alternative1.length <= 11)
          t.ok(word.alternative2.length <= 11)
        }
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
