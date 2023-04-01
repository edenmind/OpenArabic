'use strict'

function getImages(request, reply) {
  const numberOfImages = 342
  const images = []

  for (let index = 1; index <= numberOfImages; index++) {
    images.push({
      img: `${process.env.IMAGES_URL}${index}.jpg`
    })
  }

  reply.send(images)
}

module.exports = {
  getImages
}
