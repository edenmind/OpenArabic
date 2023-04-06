'use strict'

const IMAGES_URL_PREFIX = process.env.IMAGES_URL
const NUMBER_OF_IMAGES = 441

function getImages(request, reply) {
  const images = Array.from({ length: NUMBER_OF_IMAGES }, (_, index) => ({
    img: `${IMAGES_URL_PREFIX}${index + 1}.jpg`
  }))

  // Randomize the order of the images
  images.sort(() => Math.random() - 0.5)

  reply.send(images)
}

module.exports = {
  getImages
}
