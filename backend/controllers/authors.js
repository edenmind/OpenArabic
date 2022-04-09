const ObjectId = require('mongodb').ObjectId

const COLLECTION_NAME = 'authors'
async function listAuthors(req, reply) {
  const authors = this.mongo.db.collection(COLLECTION_NAME)
  const result = await authors.find({}).toArray()
  reply.code(200).send(result)
}

async function addAuthor(req, reply) {
  const authors = this.mongo.db.collection(COLLECTION_NAME)
  const id = new ObjectId()
  const { name } = req.body
  const data = { name, id }
  const result = await authors.insertOne(data)
  reply.code(201).send(result.insertedId)
}

async function getAuthor(req, reply) {
  const authors = this.mongo.db.collection(COLLECTION_NAME)
  const result = await authors.findOne({ _id: new ObjectId(req.params.id) })
  if (result) {
    return reply.send(result)
  }
  reply.notFound('The Author was not found')
}

async function updateAuthor(req, reply) {
  const authors = this.mongo.db.collection(COLLECTION_NAME)
  const { name } = req.body
  const updateDoc = {
    $set: {
      name,
    },
  }
  const result = await authors.updateOne({ _id: new ObjectId(req.params.id) }, updateDoc, { upsert: true })
  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
  })
}

async function deleteAuthor(req, reply) {
  const authors = this.mongo.db.collection(COLLECTION_NAME)
  const result = await authors.deleteOne({ _id: new ObjectId(req.params.id) })
  if (result.deletedCount) return reply.send('Deleted')
  reply.internalServerError('Could not delete Author.')
}

module.exports = { listAuthors, addAuthor, getAuthor, updateAuthor, deleteAuthor }
