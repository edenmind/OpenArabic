/* eslint-disable operator-linebreak */

'use strict'

//require axios
const axios = require('axios')

function getReadiness(request, reply) {
  let success = true

  Promise.all([
    axios.get('http://127.0.0.1:3030/categories'),
    axios.get('http://127.0.0.1:3030/texts'),
    axios.get('http://127.0.0.1:3030/authors'),
    axios.get('http://127.0.0.1:3030/images'),
    axios.get('http://127.0.0.1:3030/words'),
    axios.get('http://127.0.0.1:3030/health'),
    axios.get('http://127.0.0.1:3030/')
    // deepcode ignore PromiseNotCaughtNode: <please specify a reason of ignoring this>
  ]).then((responses) => {
    for (const response of responses) {
      if (response.status !== 200) {
        success = false
      }
    }
  })

  //if all of the routes return 200, then return 200 else return 500
  return success ? reply.code(200).send('OK') : reply.code(500).send('Not OK')
}

module.exports = {
  getReadiness
}
