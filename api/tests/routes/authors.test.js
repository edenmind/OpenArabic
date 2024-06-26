'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('create new author', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/authors',
    method: 'POST',
    payload: {
      name: 'the_name'
    },
    headers: {
      auth: 'somesecurekey'
    }
  })

  //assert
  t.equal(result.statusCode, 201)
})

test('list authors', async (t) => {
  //arrange
  const app = await build(t)
  await app.inject({
    url: '/authors',
    method: 'POST',
    payload: {
      name: 'the_name'
    }
  })

  // act
  const result = await app.inject({
    url: '/authors',
    method: 'GET'
  })

  //assert
  t.equal(result.statusCode, 200)
})

test('get author that does not exist', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/authors/abc',
    method: 'GET'
  })

  //assert
  t.equal(result.statusCode, 500)
})

test('update author', async (t) => {
  //arrange
  const app = await build(t)

  const raw = await app.inject({
    url: '/authors',
    method: 'POST',
    payload: {
      name: 'the_name'
    },
    headers: {
      auth: 'somesecurekey'
    }
  })

  const id = raw.body
  const idTrimmed = id.replaceAll('"', '')

  // act
  const result = await app.inject({
    url: `/authors/${idTrimmed}`,
    method: 'PUT',
    payload: {
      name: 'the_other_name'
    },
    headers: {
      auth: 'somesecurekey'
    }
  })

  //assert
  t.equal(result.statusCode, 200)
})

test('get author that should not be found', async (t) => {
  //arrange
  const app = await build(t)
  const id = '62518818661588692cdb0d65' //non existing id

  // act
  const result = await app.inject({
    url: `/authors/${id}`,
    method: 'GET'
  })

  //assert
  t.equal(result.statusCode, 404)
})
