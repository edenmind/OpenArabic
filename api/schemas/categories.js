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
            name: { type: 'string' },
            description: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            level: { type: 'string' }
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
          name: { type: 'string' },
          description: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
          level: { type: 'string' }
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
      properties: {
        data: {
          type: 'object',
          required: ['name', 'description', 'level'],
          properties: {
            name: { type: 'string', minLength: 5, maxLength: 50 },
            description: { type: 'string', minLength: 10, maxLength: 250 },
            level: { type: 'string', minLength: 2, maxLength: 2 }
          }
        }
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
      properties: {
        data: {
          type: 'object',
          required: ['name', 'description', 'level'],
          properties: {
            name: { type: 'string', minLength: 5, maxLength: 50 },
            description: { type: 'string', minLength: 10, maxLength: 250 },
            level: { type: 'string', minLength: 2, maxLength: 2 }
          }
        }
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
  getCategoriesOptions,
  getCategoryOptions,
  updateCategoryOptions,
  postCategoryOptions,
  deleteCategoryOptions
}
