'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('create new author', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const res = await app.inject({
    url: '/authors',
    method: 'POST',
    payload: {
      name: 'the_name',
    },
  })

  //assert
  t.equal(res.statusCode, 201)
})

test('list authors', async (t) => {
  //arrange
  const app = await build(t)
  await app.inject({
    url: '/authors',
    method: 'POST',
    payload: {
      name: 'the_name',
    },
  })

  // act
  const res = await app.inject({
    url: '/authors',
    method: 'GET',
  })

  //assert
  t.equal(res.statusCode, 200)
})

test('get author that does not exist', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const res = await app.inject({
    url: '/authors/abc',
    method: 'GET',
  })

  //assert
  t.equal(res.statusCode, 500)
})

test('delete author that does not exist', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const res = await app.inject({
    url: '/authors/abc',
    method: 'DELETE',
  })

  //assert
  t.equal(res.statusCode, 500)
})

test('update author that does not exist', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const res = await app.inject({
    url: '/authors/abc',
    method: 'PUT',
    payload: {
      name: 'the_name',
    },
  })

  //assert
  t.equal(res.statusCode, 500)
})
