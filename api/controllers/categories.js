'use strict'

const { ObjectId } = require('mongodb')
const COLLECTIONS = require('../constants/collections.js')
const { validateAPIKey } = require('../services/utils')

async function listCategories(request, reply) {
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const result = await categories.find({}).toArray()

  const categoriesOrderedByLevel = result.sort((a, b) => a.level - b.level)

  if (result.length > 0) {
    return reply.code(200).send(categoriesOrderedByLevel)
  }

  return reply.code(404).send('No categories found!')
}

async function addCategory(request, reply) {
  const { body, headers } = request
  const { auth } = headers

  //check if the user is authorized
  if (!validateAPIKey(auth)) {
    return reply.code(403).send('Not authorized!')
  }

  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const id = new ObjectId()
  const { data } = body

  data.id = id
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
  const { data } = body
  const { id } = params

  //check if the user is authorized
  if (!validateAPIKey(auth)) {
    return reply.code(403).send('Not authorized!')
  }

  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const updateDocument = {
    $set: {
      name: data.name,
      description: data.description,
      level: data.level
    }
  }
  const result = await categories.updateOne({ id: new ObjectId(id) }, updateDocument, { upsert: true })

  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  })
}

async function deleteCategory(request, reply) {
  const { auth } = request.headers

  //check if the user is authorized
  if (!validateAPIKey(auth)) {
    return reply.code(403).send('Not authorized!')
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
