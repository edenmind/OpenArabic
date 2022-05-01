'use strict'

const { ObjectId } = require('mongodb')
const COLLECTIONS = require('../constants/collections.js')

async function listCategories(request, reply) {
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const result = await categories.find({}).toArray()

  reply.code(200).send(result)
}

async function addCategory(request, reply) {
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const id = new ObjectId()
  const { name } = request.body
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
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const { name } = request.body
  const updateDocument = {
    $set: {
      name
    }
  }
  const result = await categories.updateOne({ id: new ObjectId(request.params.id) }, updateDocument, { upsert: true })

  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  })
}

async function deleteCategory(request, reply) {
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
