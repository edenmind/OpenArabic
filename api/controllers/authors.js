'use strict'

const { ObjectId } = require('mongodb')
const COLLECTIONS = require('../constants/collections.js')
const { validateAPIKey } = require('../services/utils')

async function listAuthors(request, reply) {
  const authors = this.mongo.db.collection(COLLECTIONS.AUTHORS)
  const result = await authors.find({}).toArray()

  reply.code(200).send(result)
}

async function addAuthor(request, reply) {
  const { headers, body } = request
  const authors = this.mongo.db.collection(COLLECTIONS.AUTHORS)
  const id = new ObjectId()
  const { name } = body
  const data = {
    name,
    id
  }
  const { auth } = headers

  //check if the user is authorized
  if (!validateAPIKey(auth)) {
    return reply.code(403).send('Not authorized!')
  }

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
  const { headers, body, params } = request

  const authors = this.mongo.db.collection(COLLECTIONS.AUTHORS)
  const { name } = body
  const { auth } = headers

  //check if the user is authorized
  if (!validateAPIKey(auth)) {
    return reply.code(403).send('Not authorized!')
  }

  const updateDocument = {
    $set: {
      name
    }
  }
  const result = await authors.updateOne({ id: new ObjectId(params.id) }, updateDocument, { upsert: true })

  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  })
}

async function deleteAuthor(request, reply) {
  const { auth } = request.headers

  //check if the user is authorized
  if (!validateAPIKey(auth)) {
    return reply.code(403).send('Not authorized!')
  }

  const authors = this.mongo.db.collection(COLLECTIONS.AUTHORS)
  const result = await authors.deleteOne({ id: new ObjectId(request.params.id) })

  if (result.deletedCount) {
    return reply.send('Deleted')
  }

  reply.internalServerError('Could not delete Author.')
}

module.exports = {
  listAuthors,
  addAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor
}
