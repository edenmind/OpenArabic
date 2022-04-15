const ObjectId = require('mongodb').ObjectId

const COLLECTION_NAME = 'texts'
async function listTexts(req, reply) {
  const texts = this.mongo.db.collection(COLLECTION_NAME)
  const result = await texts.find({}).toArray()
  reply.code(200).send(result)
}

async function addText(req, reply) {
  const texts = this.mongo.db.collection(COLLECTION_NAME)
  const id = new ObjectId()
  const { title, author, category, source, sentences } = req.body
  const data = { title, author, category, source, id, sentences }
  const result = await texts.insertOne(data)
  reply.code(201).send(result.insertedId)
}

async function getText(req, reply) {
  const texts = this.mongo.db.collection(COLLECTION_NAME)
  const result = await texts.findOne({ _id: new ObjectId(req.params.id) })
  if (result) {
    return reply.send(result)
  }
  reply.notFound('The Text was not found')
}

async function updateText(req, reply) {
  const texts = this.mongo.db.collection(COLLECTION_NAME)
  const { name } = req.body
  const updateDoc = {
    $set: {
      name,
    },
  }
  const result = await texts.updateOne({ _id: new ObjectId(req.params.id) }, updateDoc, { upsert: true })
  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
  })
}

async function deleteText(req, reply) {
  const texts = this.mongo.db.collection(COLLECTION_NAME)
  const result = await texts.deleteOne({ _id: new ObjectId(req.params.id) })
  if (result.deletedCount) return reply.send('Deleted')
  reply.internalServerError('Could not delete Text.')
}

module.exports = { listTexts, addText, getText, updateText, deleteText }
