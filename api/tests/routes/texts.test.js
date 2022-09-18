'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('create new text', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts',
    method: 'POST',
    headers: {
      auth: 'somesecurekey'
    },
    payload: {
      title: 'abc',
      status: 'abc',
      image: 'abc',
      createdAt: 'abc',
      publishAt: 'abc',
      author: 'abc',
      category: 'abc',
      source: 'abc',
      sentences: ['abc', 'abc', 'abc'],
      texts: {}
    }
  })

  //assert
  t.equal(result.statusCode, 201)
})

test('list texts', async (t) => {
  //arrange
  const app = await build(t)
  await app.inject({
    url: '/texts',
    method: 'POST',
    payload: {
      name: 'the_name'
    }
  })

  // act
  const result = await app.inject({
    url: '/texts',
    method: 'GET'
  })

  //assert
  t.equal(result.statusCode, 200)
})

test('get text that does not exist', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts/abc',
    method: 'GET'
  })

  //assert
  t.equal(result.statusCode, 500)
})

test('delete text that does not exist', async (t) => {
  //arrange
  const app = await build(t)
  const id = '62518818661588692cdb0d65' //non existing id

  // act
  const result = await app.inject({
    url: '/texts/' + id,
    method: 'DELETE',
    headers: {
      auth: 'somesecurekey'
    }
  })

  //assert
  t.equal(result.statusCode, 500)
})

test('update text that does not exist', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts/does_not_exist',
    headers: {
      auth: 'somesecurestring'
    },
    method: 'PUT',
    payload: {
      name: 'the_name'
    }
  })

  //assert
  t.equal(result.statusCode, 400)
})

test('get text that should not be found', async (t) => {
  //arrange
  const app = await build(t)
  const id = '62518818661588692cdb0d66' //non existing id

  // act
  const result = await app.inject({
    url: `/texts/${id}`,
    method: 'GET'
  })

  //assert
  t.equal(result.statusCode, 500)
})
