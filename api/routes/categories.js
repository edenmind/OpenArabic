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
  fastify.delete('/categories/:id', deleteCategoryOptions)
  fastify.get('/categories', getCategoriesOptions)
  fastify.get('/categories/:id', getCategoryOptions)
  fastify.post('/categories', postCategoryOptions)
  fastify.put('/categories/:id', updateCategoryOptions)
}
module.exports = categories
