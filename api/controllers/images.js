'use strict'

function getImages(request, reply) {
  // eslint-disable-next-line putout/objects-braces-inside-array
  const headerImages = [
    {
      img: `${process.env.API_IMAGE_URL}1.png`
    },
    {
      img: `${process.env.API_IMAGE_URL}2.png`
    },
    {
      img: `${process.env.API_IMAGE_URL}3.png`
    },
    {
      img: `${process.env.API_IMAGE_URL}4.png`
    },
    {
      img: `${process.env.API_IMAGE_URL}5.png`
    },
    {
      img: `${process.env.API_IMAGE_URL}6.png`
    },
    {
      img: `${process.env.API_IMAGE_URL}7.png`
    },
    {
      img: `${process.env.API_IMAGE_URL}8.png`
    },
    {
      img: `${process.env.API_IMAGE_URL}9.png`
    }
  ]

  reply.send(headerImages)
}

module.exports = {
  getImages
}
