'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('create new category', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/categories',
    method: 'POST',
    payload: {
      name: 'the_name'
    }
  })

  //assert
  t.equal(result.statusCode, 201)
})

test('list categories', async (t) => {
  //arrange
  const app = await build(t)
  await app.inject({
    url: '/categories',
    method: 'POST',
    payload: {
      name: 'the_name'
    }
  })

  // act
  const result = await app.inject({
    url: '/categories',
    method: 'GET'
  })

  //assert
  t.equal(result.statusCode, 200)
})

test('get category that does not exist', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/categories/abc',
    method: 'GET'
  })

  //assert
  t.equal(result.statusCode, 500)
})

test('delete category that does not exist', async (t) => {
  //arrange
  const app = await build(t)
  const id = '62518818661588692cdb0d65' //non existing id

  // act
  const result = await app.inject({
    url: '/categories/' + id,
    method: 'DELETE'
  })

  //assert
  t.equal(result.statusCode, 500)
})

test('update category that does not exist', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/categories/abc',
    method: 'PUT',
    payload: {
      name: 'the_name'
    }
  })

  //assert
  t.equal(result.statusCode, 500)
})

test('update category', async (t) => {
  //arrange
  const app = await build(t)

  const raw = await app.inject({
    url: '/categories',
    method: 'POST',
    payload: {
      name: 'the_name'
    }
  })

  const id = raw.body
  const idTrimmed = id.replaceAll('"', '')

  // act
  const result = await app.inject({
    url: `/categories/${idTrimmed}`,
    method: 'PUT',
    payload: {
      name: 'the_other_name'
    }
  })

  //assert
  t.equal(result.statusCode, 200)
})

test('get category that should not be found', async (t) => {
  //arrange
  const app = await build(t)
  const id = '62518818661588692cdb0d65' //non existing id

  // act
  const result = await app.inject({
    url: `/categories/${id}`,
    method: 'GET'
  })

  //assert
  t.equal(result.statusCode, 404)
})
