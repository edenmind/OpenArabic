/* eslint-disable react/display-name */
import React, { Fragment } from 'react'
import { Tooltip, Button } from '@mui/material'
import * as wordProcessing from '../services/word-processing.js'
import { useSelector, useDispatch } from 'react-redux'
import SnackBar from '../components/snack-bar.js'
import * as api from '../services/api-service.js'

const selector = (state) => state.text

const TextAddWordsGenerate = React.memo(() => {
  const { text } = useSelector(selector)
  const [open, setOpen] = React.useState(false)
  const [statusMessage, setStatusMessage] = React.useState('')
  const dispatch = useDispatch()

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const generateSentences = async () => {
    const sentences = []

    for (const [index, arabicSentence] of text.arabicSentence.entries()) {
      const words = []

      //split the arabic sentence into distinct words
      const arabicWordsInSentence = wordProcessing.splitSentencesToWords(arabicSentence)
      //remove all null and empty words
      const cleanFromNullAndEmpty = wordProcessing.removeEmptyAndNull(arabicWordsInSentence)

      //loop through the words in the sentence and add them to the words array
      for (const cleanWord of cleanFromNullAndEmpty) {
        //remove all invalid characters from the word
        const illegalCharactersRemoved = wordProcessing.cleanWordFromInvalidCharacters(cleanWord)

        //if the word is empty or null, then we wont add it
        if (illegalCharactersRemoved === '' || illegalCharactersRemoved === null) {
          continue
        }

        //prepare the words with its translation
        const wordPair = {
          arabic: illegalCharactersRemoved,
          english: '',
          explanation: ''
        }
        //add the word to the words array
        words.push(wordPair)
      }

      //translate arabicSentence with google translate
      const googleTranslation = await api.getTranslation(arabicSentence)

      const sentence = {
        english: text.englishSentence[index],
        googleTranslation,
        arabic: arabicSentence,
        words
      }
      sentences.push(sentence)
    }

    dispatch({ type: 'SET_SENTENCES', sentences })
    setStatusMessage(`${sentences.length} sentences generated`)
    setOpen(true)
  }

  return (
    <Fragment>
      <Tooltip title="Generate english and arabic word pairs for matching.">
        <Button variant="contained" onClick={() => generateSentences()}>
          Generate Words
        </Button>
      </Tooltip>
      <SnackBar openSnackBar={open} handleCloseSnackbar={handleClose} severity="success" message={statusMessage} />
    </Fragment>
  )
})

export default React.memo(TextAddWordsGenerate)
