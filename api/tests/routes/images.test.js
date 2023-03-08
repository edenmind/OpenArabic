'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('list images', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/images',
    method: 'GET'
  })

  //assert
  t.equal(result.statusCode, 200)
})
