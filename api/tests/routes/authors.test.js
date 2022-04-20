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
  const id = '62518818661588692cdb0d65' //non existing id

  // act
  const res = await app.inject({
    url: '/authors/' + id,
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

test('update author', async (t) => {
  //arrange
  const app = await build(t)

  const raw = await app.inject({
    url: '/authors',
    method: 'POST',
    payload: {
      name: 'the_name',
    },
  })

  const id = raw.body
  const idTrimmed = id.replaceAll('"', '')

  // act
  const res = await app.inject({
    url: `/authors/${idTrimmed}`,
    method: 'PUT',
    payload: {
      name: 'the_other_name',
    },
  })

  //assert
  t.equal(res.statusCode, 200)
})

test('get author', async (t) => {
  //arrange
  const app = await build(t)

  const raw = await app.inject({
    url: '/authors',
    method: 'POST',
    payload: {
      name: 'the_name',
    },
  })

  const id = raw.body
  const idTrimmed = id.replaceAll('"', '')

  // act
  const res = await app.inject({
    url: `/authors/${idTrimmed}`,
    method: 'GET',
  })

  //assert
  t.equal(res.statusCode, 200)
})

test('delete author', async (t) => {
  //arrange
  const app = await build(t)

  const raw = await app.inject({
    url: '/authors',
    method: 'POST',
    payload: {
      name: 'the_name',
    },
  })

  const id = raw.body
  const idTrimmed = id.replaceAll('"', '')

  // act
  const res = await app.inject({
    url: `/authors/${idTrimmed}`,
    method: 'DELETE',
  })

  //assert
  t.equal(res.statusCode, 200)
})

test('get author that should not be found', async (t) => {
  //arrange
  const app = await build(t)
  const id = '62518818661588692cdb0d65' //non existing id

  // act
  const res = await app.inject({
    url: `/authors/${id}`,
    method: 'GET',
  })

  //assert
  t.equal(res.statusCode, 404)
})
