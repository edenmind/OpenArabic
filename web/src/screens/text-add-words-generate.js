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

    for (const [index, arabicSentence] of text.arabicSentence.entries()) {
      const words = []

      //split the arabic sentence into distinct words
      const arabicWordsInSentence = wordProcessing.splitSentencesToWords(arabicSentence)
      //remove all null and empty words
      const cleanFromNullAndEmpty = wordProcessing.removeEmptyAndNull(arabicWordsInSentence)
      //remove all words from our dictionary that contains words that should not be translated
      const wordsInDictionaryRemoved = wordProcessing.removeWordsFromDictionary(cleanFromNullAndEmpty)

      //loop through the words in the sentence and add them to the words array
      for (const cleanWord of wordsInDictionaryRemoved) {
        //remove all invalid characters from the word
        const illegalCharactersRemoved = wordProcessing.cleanWordFromInvalidCharacters(cleanWord)
        //remove all words that are not arabic
        const nonArabicCharactersRemoved = wordProcessing.removeNonArabicCharacters(illegalCharactersRemoved)

        //if the word is  empty or null, then we wont add it
        if (nonArabicCharactersRemoved === '' || nonArabicCharactersRemoved === null) {
          continue
        }

        //prepare the words with its translation
        const wordPair = {
          arabic: nonArabicCharactersRemoved,
          english: ''
        }
        //add the word to the words array
        words.push(wordPair)
      }

      const sentence = {
        english: text.englishSentence[index],
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
}

export default TextAddWordsGenerate
