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
          slug: { type: 'string' },
          image: { type: 'string' },
          views: { type: 'string' },
          timeAgo: { type: 'string' },
          readingTime: { type: 'string' },
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
        title: { type: 'string', minLength: 5, maxLength: 70 },
        status: { type: 'string', minLength: 5, maxLength: 10 },
        image: { type: 'string', minLength: 5, maxLength: 70 },
        createdAt: { type: 'string', minLength: 5, maxLength: 40 },
        updatedAt: { type: 'string', minLength: 5, maxLength: 40 },
        publishAt: { type: 'string', minLength: 5, maxLength: 40 },
        author: { type: 'string', minLength: 5, maxLength: 30 },
        category: { type: 'string', minLength: 5, maxLength: 20 },
        source: { type: 'string', minLength: 5, maxLength: 50 },
        sentences: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            required: ['arabic', 'english', 'words'],
            properties: {
              arabic: { type: 'string', minLength: 1, maxLength: 500 },
              english: { type: 'string', minLength: 1, maxLength: 500 },
              words: {
                type: 'array',
                minItems: 1,
                items: {
                  type: 'object',
                  required: ['arabic', 'english'],
                  properties: {
                    quiz: { type: 'boolean' },
                    arabic: { type: 'string', minLength: 1, maxLength: 50 },
                    english: { type: 'string', minLength: 1, maxLength: 50 }
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
        title: { type: 'string', minLength: 5, maxLength: 70 },
        status: { type: 'string', minLength: 5, maxLength: 10 },
        image: { type: 'string', minLength: 5, maxLength: 70 },
        createdAt: { type: 'string', minLength: 5, maxLength: 40 },
        publishAt: { type: 'string', minLength: 5, maxLength: 40 },
        author: { type: 'string', minLength: 5, maxLength: 30 },
        category: { type: 'string', minLength: 5, maxLength: 20 },
        source: { type: 'string', minLength: 5, maxLength: 50 },
        sentences: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            required: ['arabic', 'english', 'words'],
            properties: {
              arabic: { type: 'string', minLength: 1, maxLength: 500 },
              english: { type: 'string', minLength: 1, maxLength: 500 },
              words: {
                type: 'array',
                minItems: 1,
                items: {
                  type: 'object',
                  required: ['arabic', 'english'],
                  properties: {
                    quiz: { type: 'boolean' },
                    arabic: { type: 'string', minLength: 1, maxLength: 50 },
                    english: { type: 'string', minLength: 1, maxLength: 50 }
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
