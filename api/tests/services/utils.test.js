/* eslint-disable operator-linebreak */
/* eslint-disable putout/long-properties-destructuring */
/* eslint-disable putout/objects-braces-inside-array */

'use strict'

const { timeAgo, validateThatNoObjectsAreEmpty, removeHost } = require('../../services/utils')
const { test } = require('tap')

test('should return time ago from date', (t) => {
  //arrange
  const date = new Date()
  const expected = 'a few seconds ago'
  //act
  const actual = timeAgo(date)
  //assert
  t.equal(actual, expected)
  t.end()
})
//test validateThatNoObjectsAreEmpty returns true if no objects are empty
test('validateThatNoObjectsAreEmpty returns true if no objects are empty', (t) => {
  //arrange
  const objects = [
    {
      test: 'test'
    },
    {
      test: 'test'
    }
  ]
  const expected = true
  //act
  const actual = validateThatNoObjectsAreEmpty(objects)
  //assert
  t.equal(actual, expected)
  t.end()
})

//test removeHost returns the part of the url after the last /
test('removeHost returns the part of the url after the last /', (t) => {
  //arrange
  const url = 'https://openarabic.com/test'
  const expected = 'test'
  //act
  const actual = removeHost(url)
  //assert
  t.equal(actual, expected)
  t.end()
})
