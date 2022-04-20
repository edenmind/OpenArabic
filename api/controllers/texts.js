const { v4: uuidv4 } = require('uuid')
const COLLECTIONS = require('../constants/collections.js')

const ObjectId = require('mongodb').ObjectId

async function listTexts(req, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)
  const authors = this.mongo.db.collection(COLLECTIONS.AUTHORS)

  const categoriesList = await categories.find({}).toArray()
  const authorList = await authors.find({}).toArray()
  const textList = req.params.id ? await texts.find({ category: req.params.id }).toArray() : await texts.find({}).toArray()

  const resultsWithName = []
  textList.forEach((text) => {
    text.category = categoriesList.find((category) => category.id.toString() === text.category).name
    text.author = authorList.find((author) => author.id.toString() === text.author).name
    resultsWithName.push(text)
  })

  reply.code(200).send(resultsWithName)
}

async function addText(req, reply) {
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const id = new ObjectId()
  const { title, author, category, source, sentences, texts } = req.body
  const data = { title, author, category, source, id, sentences, texts }
  const result = await textsCollection.insertOne(data)
  reply.code(201).send(result.insertedId)
}

async function getText(req, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const authors = this.mongo.db.collection(COLLECTIONS.AUTHORS)
  const categories = this.mongo.db.collection(COLLECTIONS.CATEGORIES)

  const authorList = await authors.find({}).toArray()
  const categoriesList = await categories.find({}).toArray()

  const result = await texts.findOne({ id: new ObjectId(req.params.id) })

  result.author = authorList.find((author) => author.id.toString() === result.author).name
  result.category = categoriesList.find((category) => category.id.toString() === result.category).name

  const arabicVocabulary = []
  const englishVocabulary = []
  let vocabularyCollection

  result.sentences.forEach((sentence) => {
    sentence.words.forEach((word) => {
      const wordId = uuidv4()
      const arabicWord = {
        word: word.arabic,
        wordId,
      }

      const englishWord = {
        word: word.english,
        wordId,
      }

      if (arabicVocabulary.length === 5) {
        return
      }

      arabicVocabulary.push(arabicWord)
      englishVocabulary.push(englishWord)
    })

    vocabularyCollection = {
      arabic: shuffleArray(arabicVocabulary),
      english: shuffleArray(englishVocabulary),
    }
  })

  result.vocabularyCollection = vocabularyCollection

  if (result) {
    return reply.send(result)
  }
  reply.notFound('The Text was not found')
}

async function updateText(req, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
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
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const result = await texts.deleteOne({ _id: new ObjectId(req.params.id) })
  if (result.deletedCount) return reply.send('Deleted')
  reply.internalServerError('Could not delete Text.')
}

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

module.exports = { listTexts, addText, getText, updateText, deleteText }
