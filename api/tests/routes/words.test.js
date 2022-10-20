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
    url: '/words/translation/the_word',
    method: 'GET'
  })

  //assert
  t.equal(getWord.statusCode, 200)
  t.equal(getWord.payload, 'the_translation')
})
