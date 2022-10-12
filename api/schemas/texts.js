'use strict'

const {
  listTexts,
  listTextsWithId,
  addText,
  getTashkeel,
  getText,
  updateText,
  deleteText
} = require('../controllers/texts')

const getTextsOptions = {
  schema: {
    response: {
      200: {
        type: 'array'
      }
    }
  },
  handler: listTexts
}

const getTextsWithIdOptions = {
  schema: {
    response: {
      200: {
        type: 'array'
      }
    }
  },
  handler: listTextsWithId
}

const getTextOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          status: { type: 'string' },
          image: { image: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
          publishAt: { type: 'string' },
          author: { type: 'string' },
          category: { type: 'string' },
          source: { type: 'string' },
          sentences: { type: 'array' },
          texts: { arabic: { type: 'object' }, english: { type: 'object' } },
          vocabularyCollection: { arabic: { type: 'array' }, english: { type: 'array' } }
        }
      }
    }
  },
  handler: getText
}

const getTashkeelOptions = {
  schema: {
    response: {
      200: {
        type: 'string'
      }
    }
  },
  handler: getTashkeel
}

const updateTextOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'author', 'category', 'source', 'sentences', 'texts', 'status', 'image', 'publishAt'],
      properties: {
        title: { type: 'string' },
        status: { type: 'string' },
        image: { type: 'string' },
        author: { type: 'string' },
        updatedAt: { type: 'string' },
        publishAt: { type: 'string' },
        category: { type: 'string' },
        source: { type: 'string' },
        sentences: { type: 'array', minItems: 10 },
        texts: { type: 'object' }
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
  handler: updateText
}

const postTextOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'author', 'category', 'source', 'sentences', 'texts', 'status', 'image', 'publishAt'],
      properties: {
        title: { type: 'string', minLength: 10 },
        status: { type: 'string', minLength: 5 },
        image: { type: 'string', minLength: 10 },
        createdAt: { type: 'string', minLength: 10 },
        publishAt: { type: 'string', minLength: 10 },
        author: { type: 'string', minLength: 10 },
        category: { type: 'string', minLength: 10 },
        source: { type: 'string', minLength: 10 },
        sentences: {
          type: 'array',
          minItems: 3,
          items: {
            type: 'object',
            properties: {
              arabic: { type: 'string', minLength: 10 },
              english: { type: 'string', minLength: 10 },
              word: {
                type: 'array',
                minItems: 2,
                items: {
                  type: 'object',
                  properties: {
                    arabic: { type: 'string', minLength: 2 },
                    english: { type: 'string', minLength: 2 }
                  }
                }
              }
            }
          }
        },
        texts: {
          type: 'object',
          properties: {
            arabic: { type: 'string', minLength: 50 },
            english: { type: 'string', minLength: 50 }
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
  handler: addText
}

const deleteTextOptions = {
  schema: {
    response: {
      200: {
        type: 'string'
      }
    }
  },
  handler: deleteText
}

module.exports = {
  getTextsOptions,
  getTextsWithIdOptions,
  getTextOptions,
  updateTextOptions,
  postTextOptions,
  deleteTextOptions,
  getTashkeelOptions
}
