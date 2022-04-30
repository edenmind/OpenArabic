const { v4: uuidv4 } = require('uuid')
const COLLECTIONS = require('../constants/collections.js')

const ObjectId = require('mongodb').ObjectId

async function listTexts(req, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const textList = req.params.id ? await texts.find({ category: req.params.id }).toArray() : await texts.find({}).toArray()

  reply.code(200).send(textList)
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

  const text = await texts.findOne({ id: new ObjectId(req.params.id) })

  const vocabularyCollection = produceVocabularyCollection(text)
  text.vocabularyCollection = vocabularyCollection

  text ? reply.send(text) : reply.notFound('The Text was not found')
}

async function updateText(req, reply) {
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const { title, author, category, sentences, source, texts } = req.body
  const { arabic, english } = texts
  const updateDoc = {
    $set: {
      title,
      category,
      texts: {
        arabic,
        english,
      },
      author,
      source,
      sentences,
    },
  }
  const result = await textsCollection.updateOne({ id: new ObjectId(req.params.id) }, updateDoc, { upsert: true })
  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
  })
}

async function deleteText(req, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const result = await texts.deleteOne({ id: new ObjectId(req.params.id) })
  result.deletedCount ? reply.send('Deleted') : reply.internalServerError('Could not delete Text.')
}

// Helper functions

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}
function produceVocabularyCollection(text) {
  const arabicVocabulary = []
  const englishVocabulary = []

  text.sentences.forEach((sentence) => {
    if (arabicVocabulary.length === 5) {
      return
    }
    sentence.words.forEach((word) => {
      if (arabicVocabulary.length === 5) {
        return
      }
      const wordId = uuidv4()

      const arabicWord = {
        word: word.arabic,
        wordId,
      }

      const englishWord = {
        word: word.english,
        wordId,
      }

      arabicVocabulary.push(arabicWord)
      englishVocabulary.push(englishWord)
    })
  })

  return {
    arabic: shuffleArray(arabicVocabulary),
    english: shuffleArray(englishVocabulary),
  }
}

module.exports = { listTexts, addText, getText, updateText, deleteText }
