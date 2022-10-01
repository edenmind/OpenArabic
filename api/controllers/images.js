'use strict'

function getImages(request, reply) {
  // eslint-disable-next-line putout/objects-braces-inside-array
  const headerImages = [
    {
      img: `${process.env.API_IMAGES_URL}1.png`
    },
    {
      img: `${process.env.API_IMAGES_URL}2.png`
    },
    {
      img: `${process.env.API_IMAGES_URL}3.png`
    },
    {
      img: `${process.env.API_IMAGES_URL}4.png`
    },
    {
      img: `${process.env.API_IMAGES_URL}5.png`
    },
    {
      img: `${process.env.API_IMAGES_URL}6.png`
    },
    {
      img: `${process.env.API_IMAGES_URL}7.png`
    },
    {
      img: `${process.env.API_IMAGES_URL}8.png`
    },
    {
      img: `${process.env.API_IMAGES_URL}9.png`
    },
    {
      img: `${process.env.API_IMAGES_URL}10.png`
    },
    {
      img: `${process.env.API_IMAGES_URL}11.png`
    },
    {
      img: `${process.env.API_IMAGES_URL}12.png`
    }
  ]

  reply.send(headerImages)
}

module.exports = {
  getImages
}
