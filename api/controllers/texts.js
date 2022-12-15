/* eslint-disable unicorn/consistent-destructuring */

'use strict'

const axios = require('axios').default
const COLLECTIONS = require('../constants/collections.js')
const {
  produceVocabularyCollection,
  timeAgo,
  readingTime,
  slugifyWithAuthor,
  mp3Filename,
  removeHost
} = require('../services/utils')
const { ObjectId } = require('mongodb')
const { synthesize } = require('../services/tts')
//require uuid4 to generate unique ids
const { v4: uuidv4 } = require('uuid')

async function listTexts(request, reply) {
  //get the texts from the database
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const textList = await texts.find({}).toArray()

  //sort texts by publishAt
  const textListSWithNewestFirst = textList.reverse()

  //add properties for timeAgo and readingTime for each text
  const textListWithProperties = textListSWithNewestFirst.map((text) => ({
    ...text,
    timeAgo: timeAgo(text.publishAt),
    readingTime: readingTime(text.texts.arabic),
    image: process.env.IMAGES_URL + text.image
  }))

  //print the image property of every entry in the array
  // eslint-disable-next-line putout/putout
  for (const text of textListWithProperties) {
    console.log('The image: ' + text.image)
  }

  //send the texts
  if (textListWithProperties.length > 0) {
    return reply.code(200).send(textListWithProperties)
  }

  return reply.code(404).send('No texts found!')
}

async function listTextsWithId(request, reply) {
  //get the texts from the database
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const textList = await texts.find({ category: request.params.id }).toArray()

  //sort texts by publishAt
  const textListSWithNewestFirst = textList.reverse()

  //add properties for timeAgo and readingTime for each text
  const textListWithProperties = textListSWithNewestFirst.map((text) => ({
    ...text,
    timeAgo: timeAgo(text.publishAt),
    readingTime: readingTime(text.texts.arabic),
    image: process.env.IMAGES_URL + text.image
  }))

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
  if (auth !== process.env.API_KEY) {
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

  //check that no values are empty
  const dataContainsEmptyValues = Object.values(data).some((value) => value.length === 0)

  if (dataContainsEmptyValues) {
    return reply.internalServerError('One or more values are empty!')
  }

  // check that at lest 15 words in sentences words has property quiz set to true
  const sentencesWords = sentences.map((sentence) => sentence.words)
  const sentencesWordsFlat = sentencesWords.flat()
  const sentencesWordsFlatQuizTrue = sentencesWordsFlat.filter((word) => word.quiz)
  const sentencesWordsFlatQuizTrueLength = sentencesWordsFlatQuizTrue.length

  if (sentencesWordsFlatQuizTrueLength < 15) {
    return reply.internalServerError(
      'At least 15 words in then sentences words must must have property quiz set to true!'
    )
  }

  //remove url from text.image with removeHost
  data.image = removeHost(data.image)

  // loop through all sentences, generate a guid for each sentence and add it to the sentence.
  const sentencesWithGuid = sentences.map((sentence) => {
    const id = uuidv4().slice(0, 8)
    return { ...sentence, id }
  })

  // loop through all sentences, loop through all words in each sentence, generate a guid for each word and add it to the word.
  const sentencesWithGuidAndWordsWithGuid = sentencesWithGuid.map((sentence) => {
    const wordsWithGuid = sentence.words.map((word) => {
      const id = uuidv4().slice(0, 8)
      return { ...word, id }
    })
    return { ...sentence, words: wordsWithGuid }
  })

  data.sentences = sentencesWithGuidAndWordsWithGuid
  data.textGuid = uuidv4().slice(0, 8)

  // This code loops over a collection of sentences and calls a
  // function to synthesize each sentence.
  // it also take the guid of the sentence and pass it as a parameter to the function
  for (const { arabic, id } of sentencesWithGuidAndWordsWithGuid) {
    // Build the MP3 filename
    const fileName = mp3Filename(data.textGuid, id, 'ar', 'sentence')

    //add the filename as a property to the sentence
    const sentence = sentencesWithGuidAndWordsWithGuid.find((sentence) => sentence.id === id)

    sentence.filename = fileName

    // Synthesize the sentence
    await synthesize(arabic, 'ar-XA', fileName)
  }

  // This function loops through the sentences and words in the text
  // and calls the `synthetize` function on each word.
  for (const { words, id: sentenceGuid } of sentencesWithGuidAndWordsWithGuid) {
    // For each sentence, iterate over the words
    for (const { arabic, id: wordGuid } of words) {
      // For each word, create a filename
      const fileName = mp3Filename(data.textGuid, sentenceGuid, 'ar', wordGuid)

      //add the filename as a property to the word
      const word = words.find((word) => word.id === wordGuid)

      word.filename = fileName

      // Synthetize the word and save it to the file
      await synthesize(arabic, 'ar-XA', fileName)
    }
  }

  //try to insert the data
  try {
    await textsCollection.insertOne(data)
    return reply.code(201).send(id)
  } catch (error) {
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

  //set the correct url for the image
  text.image = process.env.IMAGES_URL + text.image

  //loop through the sentences and words and add the url to the audio file
  text.sentences = text.sentences.map((sentence) => {
    sentence.words = sentence.words.map((word) => {
      word.filename = process.env.AUDIO_URL + sentence.filename

      return word
    })
    sentence.filename = process.env.AUDIO_URL + sentence.filename

    return sentence
  })

  //loop through all sentences and console log the sentence
  text.sentences.forEach((sentence) => {
    console.log(sentence.filename)
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
  if (auth !== process.env.API_KEY) {
    return reply.code(403).send('Not authorized!')
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
    return reply.internalServerError('One or more values are empty!')
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
  listTextsWithId,
  addText,
  getText,
  getTashkeel,
  updateText,
  deleteText
}
