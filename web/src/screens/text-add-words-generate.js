import React, { Fragment } from 'react'
import { Tooltip, Button } from '@mui/material'
import * as wordProcessing from '../services/word-processing.js'
import { useSelector, useDispatch } from 'react-redux'
import SnackBar from '../components/snack-bar.js'

const selector = (state) => state.text

const TextAddWordsGenerate = (props) => {
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

  const generateSentences = () => {
    const sentences = []

    for (const [index, element] of text.arabicSentence.entries()) {
      const theArabicWordsSentence = wordProcessing.splitSentencesToWords(element)
      const cleanFromNullAndEmpty = wordProcessing.removeEmptyAndNull(theArabicWordsSentence)
      const wordsNotInDictionaryRemoved = wordProcessing.removeWordsFromDictionary(cleanFromNullAndEmpty)

      const words = []

      for (const cleanWord of wordsNotInDictionaryRemoved) {
        const illegalCharactersRemoved = wordProcessing.cleanWordFromInvalidCharacters(cleanWord)
        const nonArabicCharactersRemoved = wordProcessing.removeNonArabicCharacters(illegalCharactersRemoved)

        const word = {
          arabic: nonArabicCharactersRemoved,
          english: ''
        }

        if (word.arabic !== '' && word.arabic !== undefined && word.arabic !== null) {
          words.push(word)
        }
      }

      const sentence = {
        english: text.englishSentence[index],
        arabic: element,
        words
      }
      sentences.push(sentence)
    }

    setStatusMessage(`${sentences.length} sentences generated`)
    setOpen(true)
    dispatch({ type: 'SET_SENTENCES', sentences })
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
}

export default TextAddWordsGenerate
