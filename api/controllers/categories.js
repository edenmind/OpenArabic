const ObjectId = require('mongodb').ObjectId
const COLLECTIONS = require('../constants/collections.js')

async function listCategories(req, reply) {
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const result = await categories.find({}).toArray()
  reply.code(200).send(result)
}

async function addCategory(req, reply) {
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const id = new ObjectId()
  const { name } = req.body
  const data = { name, id }
  const result = await categories.insertOne(data)
  reply.code(201).send(result.insertedId)
}

async function getCategory(req, reply) {
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const result = await categories.findOne({ _id: new ObjectId(req.params.id) })
  if (result) {
    return reply.send(result)
  }
  reply.notFound('The Category was not found')
}

async function updateCategory(req, reply) {
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const { name } = req.body
  const updateDoc = {
    $set: {
      name,
    },
  }
  const result = await categories.updateOne({ _id: new ObjectId(req.params.id) }, updateDoc, { upsert: true })
  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
  })
}

async function deleteCategory(req, reply) {
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const result = await categories.deleteOne({ _id: new ObjectId(req.params.id) })
  if (result.deletedCount) return reply.send('Deleted')
  reply.internalServerError('Could not delete Category.')
}

module.exports = { listCategories, addCategory, getCategory, updateCategory, deleteCategory }
