'use strict'

const { listAuthors, addAuthor, getAuthor, updateAuthor, deleteAuthor } = require('../controllers/authors')

const getAuthorsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
          },
        },
      },
    },
  },
  handler: listAuthors,
}

const getAuthorOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
        },
      },
    },
  },
  handler: getAuthor,
}

const updateAuthorOpts = {
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
  handler: updateAuthor,
}

const postAuthorOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
        },
      },
    },
  },
  handler: addAuthor,
}

const deleteAuthorOpts = {
  schema: {
    response: {
      200: {
        type: 'string',
      },
    },
  },
  handler: deleteAuthor,
}

module.exports = { getAuthorsOpts, getAuthorOpts, updateAuthorOpts, postAuthorOpts, deleteAuthorOpts }
