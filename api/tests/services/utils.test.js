'use strict'

//test for the google tts service using the tap test framework

const { test } = require('tap')
const tts = require('../../services/tts')

//make sure the synthesize function is defined
test('synthesize function is defined', (t) => {
  t.ok(tts.synthesize)
  t.end()
})

//make sure that the synthesize function accepts two string arguments
test('synthesize function accepts two string arguments', (t) => {
  t.equal(tts.synthesize.length, 3)
  t.end()
})
