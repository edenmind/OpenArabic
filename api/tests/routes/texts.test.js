'use strict'

/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable putout/objects-braces-inside-array */

const { test } = require('tap')
const { build } = require('../helper')
const moment = require('moment')

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
    url: `/texts/${id}`,
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
  t.equal(result.statusCode, 404)
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

test('create text without header should fail', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts',
    method: 'POST',
    payload: {
      name: 'the_name'
    }
  })

  //assert
  t.equal(result.statusCode, 400)
})

test('create text with wrong header should fail', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts',
    method: 'POST',
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

test('create text with wrong id should fail', async (t) => {
  //arrange
  const app = await build(t)

  // act
  const result = await app.inject({
    url: '/texts/abc',
    method: 'POST',
    headers: {
      auth: 'somesecurestring'
    },
    payload: {
      name: 'the_name'
    }
  })

  //assert
  t.equal(result.statusCode, 404)
})

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
      status: 'Draft',
      image: 'abcabcabcabc',
      createdAt: moment.utc().format(),
      publishAt: moment.utc().format(),
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
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
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

  t.equal(result.statusCode, 201)

  // check if it is possible to get a list of texts
  const resultGet = await app.inject({
    url: '/texts',
    method: 'GET'
  })

  t.equal(resultGet.statusCode, 200)
  t.ok(resultGet.json().length > 0)

  // check if it is possible to get a single text
  const [firstText] = resultGet.json()
  const { id } = firstText

  // check if the text is created
  const resultGetSingle = await app.inject({
    url: `/texts/${id}`,
    method: 'GET'
  })

  t.equal(resultGetSingle.statusCode, 200)

  //check the length of sentences
  t.equal(resultGetSingle.json().sentences.length, 3)

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[0].english, 'Praise be to Allah.')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[1].english, 'Praise be to Allah.')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[2].english, 'Praise be to Allah.')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[0].words.length, 3)

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[1].words.length, 3)

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[2].words.length, 12)

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[0].words[0].english, 'Praise')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[0].words[1].english, 'Allah')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[0].words[2].english, 'Allah')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[1].words[0].english, 'Praise')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[1].words[1].english, 'Allah')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[1].words[2].english, 'Allah')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[2].words[0].english, 'Praise')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[2].words[1].english, 'Praise')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[2].words[2].english, 'Praise')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[2].words[3].english, 'Praise')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[2].words[4].english, 'Praise')

  //check that the sentences are correct
  t.equal(resultGetSingle.json().sentences[2].words[5].english, 'Praise')

  //check that author is correct
  t.equal(resultGetSingle.json().author, 'abcabcabcabc')

  //check that title is correct
  t.equal(resultGetSingle.json().title, 'abcabcabcabc')

  //check that source is correct
  t.equal(resultGetSingle.json().source, 'abcabcabcabc')

  //check that category is correct
  t.equal(resultGetSingle.json().category, 'abcabcabcabc')

  // check that english text contains the correct number of words
  t.equal(resultGetSingle.json().texts.english.split(' ').length, 1)

  // check that arabic text contains the correct number of words
  t.equal(resultGetSingle.json().texts.arabic.split(' ').length, 1)

  //check status to be Draft
  t.equal(resultGetSingle.json().status, 'Draft')
  //validate that the text can be updated
  const resultUpdate = await app.inject({
    url: `/texts/${id}`,
    method: 'PUT',
    headers: {
      auth: 'somesecurekey'
    },
    payload: {
      title: 'defdefdefdef',
      status: 'Draft',
      image: 'defdefdefdef',
      createdAt: moment.utc().format(),
      publishAt: moment.utc().format(),
      author: 'defdefdefdef',
      category: 'defdefdefdef',
      source: 'defdefdefdef',
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
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
            },
            {
              arabic: 'الحمد',
              english: 'Praise',
              quiz: true
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

  t.equal(resultUpdate.statusCode, 200)

  // check if the text is created
  const resultGetSingleAfterUpdate = await app.inject({
    url: `/texts/${id}`,
    method: 'GET'
  })

  t.equal(resultGetSingleAfterUpdate.statusCode, 200)

  //check that the title is updated
  t.equal(resultGetSingleAfterUpdate.json().title, 'defdefdefdef')

  //check that the author is updated
  t.equal(resultGetSingleAfterUpdate.json().author, 'defdefdefdef')

  //check that the category is updated
  t.equal(resultGetSingleAfterUpdate.json().category, 'defdefdefdef')

  //check that the source is updated
  t.equal(resultGetSingleAfterUpdate.json().source, 'defdefdefdef')

  //check that the status is not updated
  t.equal(resultGetSingleAfterUpdate.json().status, 'Draft')

  //check that sentences are the same
  t.equal(resultGetSingleAfterUpdate.json().sentences.length, 3)

  //check that the first sentence is the same
  t.equal(resultGetSingleAfterUpdate.json().sentences[0].english, 'Praise be to Allah.')

  //check that the second sentence is the same
  t.equal(resultGetSingleAfterUpdate.json().sentences[1].english, 'Praise be to Allah.')

  //check that the third sentence is the same
  t.equal(resultGetSingleAfterUpdate.json().sentences[2].english, 'Praise be to Allah.')

  //test that the text can be deleted
  const resultDelete = await app.inject({
    url: `/texts/${id}`,
    method: 'DELETE',
    headers: {
      auth: 'somesecurekey'
    }
  })

  t.equal(resultDelete.statusCode, 204)

  //check that the text is deleted
  const resultGetSingleAfterDelete = await app.inject({
    url: `/texts/${id}`,
    method: 'GET'
  })

  t.equal(resultGetSingleAfterDelete.statusCode, 404)
})
