'use strict'

const {
  getCategoriesOptions,
  getCategoryOptions,
  updateCategoryOptions,
  postCategoryOptions,
  deleteCategoryOptions
} = require('../schemas/categories')

// eslint-disable-next-line putout/putout
async function categories(fastify) {
  fastify.get('/categories', getCategoriesOptions)
  fastify.post('/categories', postCategoryOptions)
  fastify.get('/categories/:id', getCategoryOptions)
  fastify.put('/categories/:id', updateCategoryOptions)
  fastify.delete('/categories/:id', deleteCategoryOptions)
}
module.exports = categories
