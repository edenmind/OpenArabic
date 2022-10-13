/* eslint-disable putout/objects-braces-inside-array */

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
      title: 'abcabcabcabc',
      status: 'abcabcabcabc',
      image: 'abcabcabcabc',
      createdAt: 'abcabcabcabc',
      publishAt: 'abcabcabcabc',
      author: 'abcabcabcabc',
      category: 'abcabcabcabc',
      source: 'abcabcabcabc',
      sentences: [
        {
          english: 'Praise be to Allah.',
          arabic: 'الحمد لله.',
          words: [
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: false
            },
            {
              arabic: 'لله',
              english: 'Allah',
              quiz: true
            }
          ]
        },
        {
          english: 'Praise be to Allah.',
          arabic: 'الحمد لله.',
          words: [
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: false
            },
            {
              arabic: 'لله',
              english: 'Allah',
              quiz: true
            }
          ]
        },
        {
          english: 'Praise be to Allah.',
          arabic: 'الحمد لله.',
          words: [
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: false
            },
            {
              arabic: 'لله',
              english: 'Allah',
              quiz: true
            }
          ]
        }
      ],
      texts: {
        arabic:
          'a\nb\nc\nd\nea\nb\nc\nd\nea\nb\nc\nd\nea\nb\nc\nd\nea\nb\nc\nd\nea\nb\nc\nd\nea\nb\nc\nd\nea\nb\nc\nd\nea\nb\nc\nd\nea\nb\nc\nd\nea\nb\nc\nd\ne',
        english:
          '1\n2\n3\n4\n51\n2\n3\n4\n51\n2\n3\n4\n51\n2\n3\n4\n51\n2\n3\n4\n51\n2\n3\n4\n51\n2\n3\n4\n51\n2\n3\n4\n51\n2\n3\n4\n51\n2\n3\n4\n51\n2\n3\n4\n5'
      }
    }
  })

  const id = result.body
  const idTrimmed = id.replaceAll('"', '')

  //assert
  const resultOfGetText = await app.inject({
    url: `/texts/${idTrimmed}`,
    method: 'GET'
  })
  // eslint-disable-next-line putout/putout
  console.log(result)
  t.equal(resultOfGetText.statusCode, 200)
  t.equal(result.statusCode, 201)
})

test('create new text with to few sentences', async (t) => {
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
      sentences: ['abc', 'abc', 'abc', 'abc', 'abc'],
      texts: {}
    }
  })

  //assert
  t.equal(result.statusCode, 400)
})

test('create new text w/o auth header', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts',
    method: 'POST',
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
  t.equal(result.statusCode, 400)
})

test('try to create new text with not enough data', async (t) => {
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
      status: 'abc'
    }
  })

  //assert
  t.equal(result.statusCode, 400)
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

test('delete text that should not be found', async (t) => {
  //arrange
  const app = await build(t)
  const id = '62518818661588692cdb0d66' //non existing id

  // act
  const result = await app.inject({
    url: `/texts/${id}`,
    method: 'DELETE',
    headers: {
      auth: 'somesecurestring'
    }
  })

  //assert
  t.equal(result.statusCode, 403)
})

test('update text that should not be found', async (t) => {
  //arrange
  const app = await build(t)
  const id = '62518818661588692cdb0d66' //non existing id

  // act
  const result = await app.inject({
    url: `/texts/${id}`,
    method: 'PUT',
    headers: {
      auth: 'somesecurestring'
    },
    payload: {
      name: 'the_name'
    }
  })

  //assert
  t.equal(result.statusCode, 400)
})

test('update text without header should fail', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts/abc',
    method: 'PUT',
    payload: {
      name: 'the_name'
    }
  })

  //assert
  t.equal(result.statusCode, 400)
})

test('update text with wrong header should fail', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts/abc',
    method: 'PUT',
    headers: {
      auth: 'wrong'
    },
    payload: {
      name: 'the_name'
    }
  })

  //assert
  t.equal(result.statusCode, 400)
})

test('update text with wrong id should fail', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts/abc',
    method: 'PUT',
    headers: {
      auth: 'somesecurestring'
    },
    payload: {
      name: 'the_name'
    }
  })

  //assert
  t.equal(result.statusCode, 400)
})
test('delete text without header should fail', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts/abc',
    method: 'DELETE'
  })

  //assert
  t.equal(result.statusCode, 403)
})

test('delete text with wrong header should fail', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts/abc',
    method: 'DELETE',
    headers: {
      auth: 'wrong'
    }
  })

  //assert
  t.equal(result.statusCode, 403)
})

test('delete text with wrong id should fail', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts/abc',
    method: 'DELETE',
    headers: {
      auth: 'somesecurestring'
    }
  })

  //assert
  t.equal(result.statusCode, 403)
})

test('create text without name should fail', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts',
    method: 'POST',
    payload: {
      name: ''
    }
  })

  //assert
  t.equal(result.statusCode, 400)
})

test('update test without name should fail', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts/abc',
    method: 'PUT',
    headers: {
      auth: 'somesecurestring'
    },
    payload: {
      name: ''
    }
  })

  //assert
  t.equal(result.statusCode, 400)
})
