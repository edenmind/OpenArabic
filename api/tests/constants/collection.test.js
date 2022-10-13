'use strict'

const COLLECTIONS = require('../constants/collections.js')

const { test } = require('tap')

test('COLLECTIONS should be an object', (t) => {
  t.equal(typeof COLLECTIONS, 'object')
})

test('COLLECTIONS should have 4 keys', (t) => {
  t.equal(Object.keys(COLLECTIONS).length, 4)
})

test('COLLECTIONS should have a key named "AUTHORS"', (t) => {
  t.equal(typeof COLLECTIONS.AUTHORS, 'string')
})
