'use strict'

const { listAuthors, addAuthor, getAuthor, updateAuthor, deleteAuthor } = require('../controllers/authors')

const getAuthorsOptions = {
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
  handler: listAuthors
}

const getAuthorOptions = {
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
  handler: getAuthor
}

const updateAuthorOptions = {
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
  handler: updateAuthor
}

const postAuthorOptions = {
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
  handler: addAuthor
}

const deleteAuthorOptions = {
  schema: {
    response: {
      200: {
        type: 'string'
      }
    }
  },
  handler: deleteAuthor
}

module.exports = {
  getAuthorsOptions,
  getAuthorOptions,
  updateAuthorOptions,
  postAuthorOptions,
  deleteAuthorOptions
}
