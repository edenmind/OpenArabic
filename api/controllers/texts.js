'use strict'

const axios = require('axios').default
const COLLECTIONS = require('../constants/collections.js')
const { produceVocabularyCollection, timeAgo, readingTime, slugifyWithAuthor } = require('../services/utils')
const { ObjectId } = require('mongodb')

async function listTexts(request, reply) {
  //get the texts from the database
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const textList = await texts.find({}).toArray()

  //sort texts by publishAt
  const textListSortedByPublishAt = textList.sort((a, b) => a.publishAt - b.publishAt)

  //add properties for timeAgo and readingTime for each text
  const textListWithProperties = textListSortedByPublishAt.map((text) => ({
    ...text,
    timeAgo: timeAgo(text.publishAt),
    readingTime: readingTime(text.texts.arabic)
  }))

  //send the texts
  if (textListWithProperties.length > 0) {
    reply.code(200).send(textListWithProperties)
  } else {
    reply.code(404).send('No texts found!')
  }
}

async function listTextsWithId(request, reply) {
  //get the texts from the database
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const textList = await texts.find({ category: request.params.id }).toArray()

  //sort texts by publishAt
  const textListSortedByPublishAt = textList.sort((a, b) => a.publishAt - b.publishAt)

  //add properties for timeAgo and readingTime for each text
  const textListWithProperties = textListSortedByPublishAt.map((text) => ({
    ...text,
    timeAgo: timeAgo(text.publishAt),
    readingTime: readingTime(text.texts.arabic)
  }))

  //send the texts
  if (textListWithProperties.length > 0) {
    reply.code(200).send(textListWithProperties)
  } else {
    reply.code(404).send('No texts found!')
  }
}

async function addText(request, reply) {
  //get the data from the request
  const { headers, body } = request
  const { title, author, category, source, sentences, texts, publishAt, status, image } = body
  const { auth } = headers

  //check if the user is authorized
  if (auth !== process.env.API_KEY) {
    reply.code(403).send('Not authorized!')
  }

  //prepare the data to be inserted into the database
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const id = new ObjectId() //generate a new id
  const views = 0 //initially, the text has no views
  const slug = slugifyWithAuthor(title, author) //generate a slug
  const createdAt = new Date()
  const data = {
    title,
    slug,
    author,
    image,
    createdAt,
    publishAt,
    category,
    source,
    id,
    sentences,
    texts,
    views,
    status
  }

  //check that no values are empty
  const dataContainsEmptyValues = Object.values(data).some((value) => value.length === 0)

  if (dataContainsEmptyValues) {
    reply.internalServerError('One or more values are empty!')
  }

  // check that at lest 15 words in sentences words has property quiz set to true
  const sentencesWords = sentences.map((sentence) => sentence.words)
  const sentencesWordsFlat = sentencesWords.flat()
  const sentencesWordsFlatQuizTrue = sentencesWordsFlat.filter((word) => word.quiz)
  const sentencesWordsFlatQuizTrueLength = sentencesWordsFlatQuizTrue.length

  if (sentencesWordsFlatQuizTrueLength < 15) {
    reply.internalServerError('At least 15 words in then sentences words must must have property quiz set to true!')
  }

  //try to insert the data
  try {
    await textsCollection.insertOne(data)
    reply.code(201).send(id)
  } catch (error) {
    reply.internalServerError(error)
  }
}

async function getText(request, reply) {
  //get the text from the database
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)

  let text = ''

  //get the text by slug
  text = await texts.findOne({ slug: request.params.id })

  // if the text is null or undefined, try to get the text by id
  if (!text) {
    text = await texts.findOne({ id: new ObjectId(request.params.id) })
  }

  //if the text is null or undefined, send a 404
  if (!text) {
    reply.code(404).send('Text not found!')
  }

  //update property "views" in the text
  const views = text.views + 1
  await texts.updateOne({ slug: request.params.id }, { $set: { views } })

  //decorate the text with some extra properties
  text.timeAgo = timeAgo(text.publishAt)
  text.readingTime = readingTime(text.texts.arabic)
  text.vocabularyCollection = produceVocabularyCollection(text)

  //send the text
  reply.code(200).send(text)
}

async function getTashkeel(request, reply) {
  const { encodedText } = request.body
  const url = `${process.env.API_TASHKEEL_URL}/tashkeel?unvoweled=${encodedText}`
  const response = await axios.get(url)

  reply.send(response.data)
}

async function updateText(request, reply) {
  //get the data from the request
  const { body, headers, params } = request
  const { auth } = headers
  const { id } = params

  //check if the user is authorized
  if (auth !== process.env.API_KEY) {
    reply.code(403).send('Not authorized!')
  }

  //prepare the data to be inserted into the database
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const updatedAt = new Date()
  const { title, author, category, sentences, source, texts, publishAt, status, image } = body
  const { arabic, english } = texts
  const data = {
    $set: {
      title,
      category,
      status,
      image,
      publishAt,
      updatedAt,
      texts: {
        arabic,
        english
      },
      author,
      source,
      sentences
    }
  }

  //check that no values are empty
  const dataContainsEmptyValues = Object.values(data).some((value) => value.length === 0)

  if (dataContainsEmptyValues) {
    reply.internalServerError('One or more values are empty!')
  }

  //try to update the data
  const result = await textsCollection.updateOne({ id: new ObjectId(id) }, data, {
    upsert: true
  })

  //send the result
  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  })
}

async function deleteText(request, reply) {
  //get the data from the request
  const { auth } = request.headers

  //check if the user is authorized
  if (auth !== process.env.API_KEY) {
    reply.code(403).send('Not authorized!')
  }

  //delete the text from the database
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const result = await texts.deleteOne({ id: new ObjectId(request.params.id) })

  //send the result
  result.deletedCount ? reply.code(204).send('Deleted') : reply.internalServerError('Could not delete text!')
}

module.exports = {
  listTexts,
  listTextsWithId,
  addText,
  getText,
  getTashkeel,
  updateText,
  deleteText
}
