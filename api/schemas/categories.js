'use strict'

const {
  listCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories')

const getCategoriesOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' }
          }
        }
      }
    }
  },
  handler: listCategories
}

const getCategoryOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },

          name: { type: 'string' }
        }
      }
    }
  },
  handler: getCategory
}

const updateCategoryOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  },
  handler: updateCategory
}

const postCategoryOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        id: { type: 'string' }
      }
    },
    response: {
      201: {
        type: 'string'
      }
    }
  },
  handler: addCategory
}

const deleteCategoryOptions = {
  schema: {
    response: {
      200: {
        type: 'string'
      }
    }
  },
  handler: deleteCategory
}

module.exports = {
  getCategoriesOpts: getCategoriesOptions,
  getCategoryOpts: getCategoryOptions,
  updateCategoryOpts: updateCategoryOptions,
  postCategoryOpts: postCategoryOptions,
  deleteCategoryOpts: deleteCategoryOptions
}
