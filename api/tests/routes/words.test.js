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
        categoryLevel: 1,
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

test('words should be returned based on the query parameters for level 1', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const words = await app.inject({
    url: '/words?numberOfWordsToPractice=10&difficultyLevel=1',
    method: 'GET'
  })

  //assert
  t.equal(words.statusCode, 200)
})

test('words should be returned based on the query parameters for level 3', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const words = await app.inject({
    url: '/words?numberOfWordsToPractice=10&difficultyLevel=3',
    method: 'GET'
  })

  //assert
  t.equal(words.statusCode, 200)
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
