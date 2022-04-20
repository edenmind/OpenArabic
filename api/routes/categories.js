'use strict'

const { getCategoriesOpts, getCategoryOpts, updateCategoryOpts, postCategoryOpts, deleteCategoryOpts } = require('../schemas/categories')

async function categories(fastify) {
  fastify.get('/categories', getCategoriesOpts)
  fastify.post('/categories', postCategoryOpts)
  fastify.get('/categories/:id', getCategoryOpts)
  fastify.put('/categories/:id', updateCategoryOpts)
  fastify.delete('/categories/:id', deleteCategoryOpts)
}
module.exports = categories
