'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('default root route', async (t) => {
  const app = await build(t)

  const result = await app.inject({
    url: '/'
  })
  t.same(JSON.parse(result.payload), { status: 'alHamdulillah' })
})
