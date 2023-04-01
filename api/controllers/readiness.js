/* eslint-disable operator-linebreak */

'use strict'

//require axios
const axios = require('axios')

function getReadiness(request, reply) {
  Promise.allSettled([
    axios.get('http://127.0.0.1:3030/categories'),
    axios.get('http://127.0.0.1:3030/texts'),
    axios.get('http://127.0.0.1:3030/authors'),
    axios.get('http://127.0.0.1:3030/images'),
    axios.get('http://127.0.0.1:3030/words'),
    axios.get('http://127.0.0.1:3030/health'),
    axios.get('http://127.0.0.1:3030/')
  ])
    .then((results) => {
      const allSuccessful = results.every((result) => result.status === 'fulfilled')

      if (allSuccessful) {
        reply.code(200).send('OK')
      } else {
        reply.code(500).send('Not OK')
      }
    })
    .catch(() => {
      reply.code(500).send('Not OK')
    })
}

module.exports = {
  getReadiness
}
