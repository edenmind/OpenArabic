'use strict'

const { listCategories, addCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/Categories')

const getCategoriesOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
          },
        },
      },
    },
  },
  handler: listCategories,
}

const getCategoryOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },

          name: { type: 'string' },
        },
      },
    },
  },
  handler: getCategory,
}

const updateCategoryOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: updateCategory,
}

const postCategoryOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        id: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'string',
      },
    },
  },
  handler: addCategory,
}

const deleteCategoryOpts = {
  schema: {
    response: {
      200: {
        type: 'string',
      },
    },
  },
  handler: deleteCategory,
}

module.exports = { getCategoriesOpts, getCategoryOpts, updateCategoryOpts, postCategoryOpts, deleteCategoryOpts }
