const ObjectId = require('mongodb').ObjectId
const COLLECTIONS = require('../constants/collections.js')

async function listAuthors(request, reply) {
  const authors = this.mongo.db.collection(COLLECTIONS.AUTHORS)
  const result = await authors.find({}).toArray()
  reply.code(200).send(result)
}

async function addAuthor(request, reply) {
  const authors = this.mongo.db.collection(COLLECTIONS.AUTHORS)
  const id = new ObjectId()
  const { name } = request.body
  const data = { name, id }
  const result = await authors.insertOne(data)
  reply.code(201).send(result.insertedId)
}

async function getAuthor(request, reply) {
  const authors = this.mongo.db.collection(COLLECTIONS.AUTHORS)
  const result = await authors.findOne({ id: new ObjectId(request.params.id) })
  if (result) {
    return reply.send(result)
  }
  reply.notFound('The Author was not found')
}

async function updateAuthor(request, reply) {
  const authors = this.mongo.db.collection(COLLECTIONS.AUTHORS)
  const { name } = request.body
  const updateDocument = {
    $set: {
      name
    }
  }
  const result = await authors.updateOne({ id: new ObjectId(request.params.id) }, updateDocument, { upsert: true })
  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  })
}

async function deleteAuthor(request, reply) {
  const authors = this.mongo.db.collection(COLLECTIONS.AUTHORS)
  const result = await authors.deleteOne({ id: new ObjectId(request.params.id) })
  if (result.deletedCount) return reply.send('Deleted')
  reply.internalServerError('Could not delete Author.')
}

module.exports = { listAuthors, addAuthor, getAuthor, updateAuthor, deleteAuthor }
