'use strict'

const { ObjectId } = require('mongodb')
const COLLECTIONS = require('../constants/collections.js')

async function listCategories(request, reply) {
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const result = await categories.find({}).toArray()

  if (result.length > 0) {
    reply.code(200).send(result)
  } else {
    reply.code(404).send('No categories found!')
  }
}

async function addCategory(request, reply) {
  const { body, headers } = request
  const { auth } = headers

  if (auth !== process.env.API_KEY) {
    reply.code(403).send('Not authorized!')
  }

  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const id = new ObjectId()
  const { name } = body
  const data = {
    name,
    id
  }
  const result = await categories.insertOne(data)

  reply.code(201).send(result.insertedId)
}

async function getCategory(request, reply) {
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const result = await categories.findOne({ id: new ObjectId(request.params.id) })

  if (result) {
    return reply.send(result)
  }

  reply.notFound('The Category was not found')
}

async function updateCategory(request, reply) {
  const { body, headers, params } = request
  const { auth } = headers
  const { name } = body
  const { id } = params

  if (auth !== process.env.API_KEY) {
    reply.code(403).send('Not authorized!')
  }

  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const updateDocument = {
    $set: {
      name
    }
  }
  const result = await categories.updateOne({ id: new ObjectId(id) }, updateDocument, { upsert: true })

  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  })
}

async function deleteCategory(request, reply) {
  const { auth } = request.headers

  if (auth !== process.env.API_KEY) {
    reply.code(403).send('Not authorized!')
  }

  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const result = await categories.deleteOne({ id: new ObjectId(request.params.id) })

  if (result.deletedCount) {
    return reply.send('Deleted')
  }

  reply.internalServerError('Could not delete Category.')
}

module.exports = {
  listCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory
}
