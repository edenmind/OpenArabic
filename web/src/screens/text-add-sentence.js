import * as React from 'react'
import * as wordProcessing from '../services/word-processing.js'

import { Button, Chip, TextField, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { Fragment } from 'react'
import MatchingIndicator from '../components/matching-indicator.js'
import Paper from '@mui/material/Paper'
import SnackBar from '../components/snack-bar.js'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import { useParams } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  width: 1100
}))

const selector = (state) => state.text

const TextAddSentences = () => {
  const dispatch = useDispatch()

  const { text } = useSelector(selector)
  const [englishSentenceCount, setEnglishSentenceCount] = React.useState(0)
  const [arabicSentenceCount, setArabicSentenceCount] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [statusMessage, setStatusMessage] = React.useState('')
  const { id } = useParams()

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  function handleChangeEnglish(event) {
    const englishSentence = wordProcessing.splitTextToSentences(event.target.value)
    setEnglishSentenceCount(englishSentence.length)

    const englishWords = []

    for (const sentence of englishSentence) {
      const theEnglishWordsSentence = wordProcessing.splitSentencesToWords(sentence)
      englishWords.push(theEnglishWordsSentence)
    }

    dispatch({ type: 'SET_ENGLISH_TEXT', english: event.target.value })
    dispatch({ type: 'SET_ENGLISH_SENTENCE', englishSentence })
    dispatch({ type: 'SET_ENGLISH_WORDS', englishWords })
  }

  function handleChangeArabic(event) {
    const arabicSentence = wordProcessing.splitTextToSentences(event.target.value)
    const cleanWords = wordProcessing.cleanWordFromInvalidCharacters(event.target.value)
    const arabicSentencesProcessed = wordProcessing.splitTextToSentences(cleanWords)

    setArabicSentenceCount(arabicSentencesProcessed.length)

    const arabicWords = []

    for (const sentence of arabicSentencesProcessed) {
      const theArabicWordsSentence = wordProcessing.splitSentencesToWords(sentence)
      const cleanFromNullAndEmpty = wordProcessing.removeEmptyAndNull(theArabicWordsSentence)

      arabicWords.push(cleanFromNullAndEmpty)
    }

    dispatch({ type: 'SET_ARABIC_TEXT', arabic: event.target.value })
    dispatch({ type: 'SET_ARABIC_SENTENCE', arabicSentence })
    dispatch({ type: 'SET_ARABIC_WORDS', arabicWords })
  }

  const generateSentences = () => {
    const sentences = []

    for (let index = 0; index < text.arabicSentence.length; index++) {
      const theArabicWordsSentence = wordProcessing.splitSentencesToWords(text.arabicSentence[index])
      const cleanFromNullAndEmpty = wordProcessing.removeEmptyAndNull(theArabicWordsSentence)

      const words = []

      for (const element of cleanFromNullAndEmpty) {
        const word = {
          arabic: element,
          english: ''
        }
        words.push(word)
      }

      const sentence = {
        english: text.englishSentence[index],
        arabic: text.arabicSentence[index],
        words
      }
      sentences.push(sentence)
    }

    setStatusMessage(`${sentences.length} sentences generated`)
    setOpen(true)
    dispatch({ type: 'SET_SENTENCES', sentences })
  }

  const handleAdd = () => {
    const { title, author, category, sentences, source, texts, status } = text
    const { arabic, english } = texts

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/texts`,
      data: {
        title,
        category,
        status,
        texts: {
          arabic,
          english
        },
        author,
        source,
        sentences
      }
    })
      .then((response) => {
        if (response.status === 201) {
          setOpen(true)
          setStatusMessage(`Added draft: ${title}!`)
        } else {
          setStatusMessage(`Error: ${response.data.message}`)
          setOpen(true)
        }
      })
      .catch((error) => console.log(error))
  }

  const handleUpdate = () => {
    const { title, author, category, sentences, source, texts, status } = text
    const { arabic, english } = texts

    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/texts/${id}`,
      data: {
        title,
        category,
        status,
        texts: {
          arabic,
          english
        },
        author,
        source,
        sentences
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setOpen(true)
          setStatusMessage(`Updated draft: ${response.data.message}`)
        } else {
          setStatusMessage(`Error: ${response.data.message}`)
          setOpen(true)
        }
      })
      .catch((error) => console.log(error))
  }

  const englishSentencesCountMessage = `English: ${englishSentenceCount}`
  const arabicSentencesCountMessage = `Arabic: ${arabicSentenceCount}`

  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <MatchingIndicator
          entity="Sentences"
          firstCondition={englishSentenceCount}
          secondCondition={arabicSentenceCount}
        />
        <Chip label={englishSentencesCountMessage} />
        <Chip label={arabicSentencesCountMessage} />

        <Tooltip title="Save an unfinished draft of the text.">
          {id ? (
            <Button disabled={englishSentenceCount !== arabicSentenceCount} onClick={() => handleUpdate()}>
              Save Draft
            </Button>
          ) : (
            <Button disabled={englishSentenceCount !== arabicSentenceCount} onClick={() => handleAdd()}>
              Save Draft
            </Button>
          )}
        </Tooltip>

        <Tooltip title="Generate english and arabic word pairs for matching.">
          <Button disabled={englishSentenceCount !== arabicSentenceCount} onClick={() => generateSentences()}>
            Generate Words
          </Button>
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Item>
          <div dir="rtl">
            <TextField
              InputProps={{ style: { fontSize: 30, lineHeight: 1.65 } }}
              value={text.texts.arabic}
              label="Arabic"
              multiline
              rows={21}
              fullWidth
              variant="filled"
              onChange={handleChangeArabic}
            />
          </div>
        </Item>
        <Item>
          <TextField
            InputProps={{ style: { fontSize: 20, lineHeight: 2.47 } }}
            value={text.texts.english}
            label="English"
            multiline
            rows={21}
            fullWidth
            variant="filled"
            onChange={handleChangeEnglish}
          />
        </Item>
      </Stack>
      <SnackBar openSnackBar={open} handleCloseSnackbar={handleClose} severity="success" message={statusMessage} />
    </Fragment>
  )
}

export default TextAddSentences
