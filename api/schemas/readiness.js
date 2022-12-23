'use strict'

const { getReadiness } = require('../controllers/readiness')

const getReadinessOptions = {
  schema: {
    response: {
      200: {
        type: 'string'
      }
    }
  },
  handler: getReadiness
}

module.exports = {
  getReadinessOptions
}
