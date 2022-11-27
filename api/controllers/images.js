'use strict'

function getImages(request, reply) {
  const numberOfImages = 25
  const images = []

  for (let index = 1; index < numberOfImages; index++) {
    images.push({
      id: index,
      url: `${process.env.API_IMAGES_URL}${index}.jpg`
    })
  }

  reply.send(images)
}

module.exports = {
  getImages
}
