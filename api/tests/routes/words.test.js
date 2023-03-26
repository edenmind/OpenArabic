'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('post word and get it back', async (t) => {
  //arrange
  const app = await build(t)

  // act
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

test('cannot add word if Arabic or English word is empty', async (t) => {
  // arrange
  const app = await build(t)

  // act
  const response = await app.inject({
    url: '/words',
    method: 'POST',
    payload: {
      word: {
        arabic: '',
        english: 'the_translation'
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

test('cannot add word if Arabic or English word is not provided', async (t) => {
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
