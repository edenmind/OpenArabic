/* eslint-disable putout/nonblock-statement-body-newline */
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
  produceVocabularyCollection
} = require('../services/texts')
const { ObjectId } = require('mongodb')
const { v4: uuidv4 } = require('uuid')

async function listTexts(request, reply) {
  try {
    // Get the texts collection
    const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)

    // If request.params.id is undefined, then get all texts, else get texts by category
    const textList =
      request.params.id === undefined
        ? await textsCollection.find({}).toArray()
        : await textsCollection.find({ category: request.params.id }).toArray()

    // Sort texts by publishAt
    const textListWithNewestFirst = textList.reverse()

    // Add properties for timeAgo, readingTime, numberOfSentences, numberOfWords, and image for each text
    const textListWithProperties = textListWithNewestFirst.map((text) => {
      if (!text.publishAt || !text.texts.arabic || !text.image) {
        return reply.internalServerError('One or more values are empty!')
      }

      return Object.assign({}, text, {
        timeAgo: timeAgo(text.publishAt),
        readingTime: readingTime(text.texts.arabic),
        numberOfSentences: text.sentences.length,
        numberOfWords: text.sentences.reduce((total, sentence) => total + sentence.words.length, 0),
        image: process.env.IMAGES_URL + text.image
      })
    })

    // Send the texts
    if (textListWithProperties.length > 0) {
      return reply.code(200).send(textListWithProperties)
    }

    return reply.code(404).send('No texts found!')
  } catch (error) {
    console.error(error)
    return reply.internalServerError('Error connecting to database')
  }
}

async function addText(request, reply) {
  //get the data from the request
  const { headers, body } = request
  const { auth } = headers

  //check if the user is authorized
  if (!validateAPIKey(auth)) {
    return reply.code(403).send('Not authorized!')
  }

  //prepare the data to be inserted into the database
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const id = new ObjectId() //generate a new id
  const views = 0 //initially, the text has no views
  const slug = slugifyWithAuthor(body.title, body.author) //generate a slug
  const createdAt = new Date()
  const data = {
    title: body.title,
    slug,
    author: body.author,
    image: body.image,
    createdAt,
    publishAt: body.publishAt,
    category: body.category,
    source: body.source,
    id,
    sentences: body.sentences,
    texts: body.texts,
    views,
    status: body.status
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
    //generate a guid for every sentence and word
    data.sentences = generateGuidForSentencesAndWords(body.sentences)
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
  await texts.updateOne({ _id: text._id }, { $set: { views } }, { upsert: true })

  //decorate the text with some extra properties
  text.timeAgo = timeAgo(text.publishAt)
  text.readingTime = readingTime(text.texts.arabic)
  text.vocabularyCollection = produceVocabularyCollection(text)
  text.image = process.env.IMAGES_URL + text.image

  //loop through the sentences and words and add the url to the audio file
  for (const sentence of text.sentences) {
    sentence.words = sentence.words.map((word) => {
      word.filename = process.env.AUDIO_URL + word.filename
      return word
    })
    sentence.filename = process.env.AUDIO_URL + sentence.filename
  }

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
  const {
    headers: { auth },
    body,
    params: { id }
  } = request

  //check if the user is authorized
  if (!validateAPIKey(auth)) {
    return reply.code(403).send('Not authorized!')
  }

  //prepare the data to be inserted into the database
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const updatedAt = new Date()
  const { texts, ...rest } = body

  //loop through the sentences and words and add the url to the audio file
  const data = {
    $set: {
      ...rest,
      textGuid: texts.textGuid,
      texts: {
        ...texts
      },
      updatedAt
    }
  }

  // Validate that no objects are empty
  if (!validateThatNoObjectsAreEmpty(data)) {
    return reply.internalServerError('One or more values are empty!')
  }

  // remove the host from the image url
  data.$set.image = removeHost(data.$set.image)

  if (data.$set.generateAudio === 'Yes') {
    //generate a guid for every sentence and word
    data.$set.sentences = generateGuidForSentencesAndWords(data.$set.sentences)

    //generate the mp3 files in the background
    batchGenerateAudio(data.$set)
  }

  //loop through the sentences and words and use removeHost from the filename property
  for (const sentence of data.$set.sentences) {
    sentence.words = sentence.words.map((word) => {
      if (word.filename) {
        word.filename = removeHost(word.filename)
      }

      return word
    })

    if (sentence.filename) {
      sentence.filename = removeHost(sentence.filename)
    }
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
