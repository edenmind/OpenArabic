/* eslint-disable operator-linebreak */
/* eslint-disable putout/long-properties-destructuring */
/* eslint-disable putout/objects-braces-inside-array */

'use strict'

const { timeAgo } = require('../../services/utils')
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
