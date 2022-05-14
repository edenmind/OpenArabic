/* eslint-disable prettier/prettier */
/* eslint-disable newline-per-chained-call */

'use strict'

function getImages(request, reply) {
  // eslint-disable-next-line putout/objects-braces-inside-array
  const headerImages = [
    {
      img: 'http://localhost:8080/images/feature.png'
    },
    {
      img: 'http://localhost:8080/images/feature.png'
    },
    {
      img: 'http://localhost:8080/images/feature.png'
    },
    {
      img: 'http://localhost:8080/images/feature.png'
    },
    {
      img: 'http://localhost:8080/images/feature.png'
    },
    {
      img: 'http://localhost:8080/images/feature.png'
    },
    {
      img: 'http://localhost:8080/images/feature.png'
    },
    {
      img: 'http://localhost:8080/images/feature.png'
    },
    {
      img: 'http://localhost:8080/images/feature.png'
    }
  ]

  reply.send(headerImages)
}

module.exports = {
  getImages
}
