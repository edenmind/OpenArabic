/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable operator-linebreak */
/* eslint-disable putout/putout */

'use strict'

const axios = require('axios').default
const COLLECTIONS = require('../constants/collections.js')
const { timeAgo, removeHost, validateThatNoObjectsAreEmpty, validateAPIKey } = require('../services/utils')
const {
  generateGuidForSentencesAndWords,
  batchGenerateAudio,
  readingTime,
  slugifyWithAuthor,
  validateThatCorrectNumberOfWordsHasQuizSet,
  produceVocabularyCollection
} = require('../services/texts')
const { ObjectId } = require('mongodb')
const { v4: uuidv4 } = require('uuid')

async function listTexts(request, reply) {
  //get the texts collection
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  let textList = []

  // if request.params.id is undefined, then get all texts
  if (request.params.id === undefined) {
    textList = await textsCollection.find({}).toArray()
  } else {
    textList = await textsCollection.find({ category: request.params.id }).toArray()
  }

  //sort texts by publishAt
  const textListWithNewestFirst = textList.reverse()

  //add properties for timeAgo and readingTime for each text
  const textListWithProperties = textListWithNewestFirst.map((text) => {
    if (!Array.isArray(textListWithNewestFirst) || !text.publishAt || !text.texts.arabic || !text.image) {
      return reply.internalServerError('One or more values are empty!')
    }

    return {
      ...text,
      timeAgo: timeAgo(text.publishAt),
      readingTime: readingTime(text.texts.arabic),
      image: process.env.IMAGES_URL + text.image
    }
  })

  //send the texts
  if (textListWithProperties.length > 0) {
    return reply.code(200).send(textListWithProperties)
  }

  return reply.code(404).send('No texts found!')
}

async function addText(request, reply) {
  //get the data from the request
  const { headers, body } = request
  const { title, author, category, source, sentences, texts, publishAt, status, image } = body
  const { auth } = headers

  //check if the user is authorized
  if (!validateAPIKey(auth)) {
    return reply.code(403).send('Not authorized!')
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

  // Validate that no objects are empty
  // data: the data being validated
  // Returns: true if no objects are empty, false otherwise

  if (!validateThatNoObjectsAreEmpty(data)) {
    return reply.internalServerError('One or more values are empty!')
  }

  //remove url from text.image with removeHost
  data.image = removeHost(data.image)

  //generate a guid for the text
  data.textGuid = uuidv4().slice(0, 8)

  if (data.status !== 'Draft') {
    // Validate that at least 15 words has quiz property set to true
    if (!validateThatCorrectNumberOfWordsHasQuizSet(sentences, 15)) {
      return reply.internalServerError(
        'At least 15 words in then sentences words must must have property quiz set to true!'
      )
    }

    //generate a guid for every sentence and word
    data.sentences = generateGuidForSentencesAndWords(sentences)
    //generate the mp3 files in the background
    batchGenerateAudio(data)
  }

  //try to insert the data into the database
  try {
    const result = await textsCollection.insertOne(data)
    // we send a reply before generating the mp3 files to avoid waiting for the mp3 files to be generated before sending the reply
    return reply.code(201).send({ message: `Created text with id: ${result.insertedId}.` })
  } catch (error) {
    //if there is an error, send the error message and return from the function to avoid generating the mp3 files
    return reply.internalServerError(error)
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
    return reply.code(404).send('Text not found!')
  }

  //update property "views" in the text
  const views = text.views + 1

  // try update views with one by searching by id and if not found by slug
  try {
    await texts.updateOne({ id: new ObjectId(request.params.id) }, { $set: { views } })
  } catch {
    await texts.updateOne({ slug: request.params.id }, { $set: { views } })
  }

  //decorate the text with some extra properties
  text.timeAgo = timeAgo(text.publishAt)
  text.readingTime = readingTime(text.texts.arabic)
  text.vocabularyCollection = produceVocabularyCollection(text)
  text.image = process.env.IMAGES_URL + text.image

  //loop through the sentences and words and add the url to the audio file
  text.sentences = text.sentences.map((sentence) => {
    sentence.words = sentence.words.map((word) => {
      word.filename = process.env.AUDIO_URL + word.filename

      return word
    })
    sentence.filename = process.env.AUDIO_URL + sentence.filename

    return sentence
  })

  //send the text
  reply.code(200).send(text)
}

async function getTashkeel(request, reply) {
  const { encodedText } = request.body
  const url = `${process.env.TASHKEEL_URL}/tashkeel?unvoweled=${encodedText}`
  const response = await axios.get(url)

  reply.send(response.data)
}

async function updateText(request, reply) {
  //get the data from the request
  const { body, headers, params } = request
  const { auth } = headers
  const { id } = params

  //check if the user is authorized
  if (!validateAPIKey(auth)) {
    return reply.code(403).send('Not authorized!')
  }

  //prepare the data to be inserted into the database
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const updatedAt = new Date()
  const { title, author, category, sentences, source, texts, publishAt, status, image, generateAudio } = body
  const { arabic, english } = texts
  const data = {
    $set: {
      title,
      category,
      status,
      image,
      publishAt,
      updatedAt,
      generateAudio,
      texts: {
        arabic,
        english
      },
      author,
      source,
      sentences
    }
  }

  // Validate that no objects are empty
  // data: the data being validated
  // Returns: true if no objects are empty, false otherwise

  if (!validateThatNoObjectsAreEmpty(data)) {
    return reply.internalServerError('One or more values are empty!')
  }

  // Validate that at least 15 words has quiz property set to true
  if (!validateThatCorrectNumberOfWordsHasQuizSet(sentences, 15)) {
    return reply.internalServerError(
      'At least 15 words in then sentences words must must have property quiz set to true!'
    )
  }

  if (data.$set.generateAudio === 'Yes') {
    //generate a guid for every sentence and word
    data.$set.sentences = generateGuidForSentencesAndWords(data.$set.sentences)
    const audioData = data.$set

    audioData.textGuid = uuidv4().slice(0, 8)
    //generate the mp3 files in the background
    batchGenerateAudio(audioData)
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
  if (!validateAPIKey(auth)) {
    return reply.code(403).send('Not authorized!')
  }

  //delete the text from the database
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const result = await texts.deleteOne({ id: new ObjectId(request.params.id) })

  //send the result
  result.deletedCount ? reply.code(204).send('Deleted') : reply.internalServerError('Could not delete text!')
}

module.exports = {
  listTexts,
  addText,
  getText,
  getTashkeel,
  updateText,
  deleteText
}
