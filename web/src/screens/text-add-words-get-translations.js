import React, { Fragment } from 'react'
import { Button, Tooltip } from '@mui/material'
import * as api from '../services/api-service.js'
import * as wp from '../services/word-processing.js'
import { useSelector, useDispatch } from 'react-redux'
import SnackBar from '../components/snack-bar.js'
import LoadingButton from '@mui/lab/LoadingButton'

const selector = (state) => state.text

const TextAddWordsGetTranslations = () => {
  const dispatch = useDispatch()
  const [statusMessage, setStatusMessage] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const checkIfWordExistsInDatabase = async () => {
    //count the number of words found in the database
    let wordsFound = 0

    setLoading(true)

    for (const [indexSentence, sentence] of text.sentences.entries()) {
      for (const [indexArabicWord, word] of sentence.words.entries()) {
        const englishWords = await api.getTranslation(word.arabic)

        // stop if there is no translation for this word
        if (englishWords.length === 0) {
          continue
        }

        // increment the number of words found in the database
        wordsFound++

        // check if sentence.english words contains englishWords
        const sentenceContainsCapitalized = sentence.english.includes(wp.capitalizeFirstLetter(englishWords))
        const sentenceContainsLowercase = sentence.english.includes(wp.makeAllLetterLowercase(englishWords))

        // if the database does not contain the translation, add it
        if (sentenceContainsCapitalized || sentenceContainsLowercase) {
          dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord, englishWords } })
        }
      }
    }

    setLoading(false)

    // if no words were found in the database, then show a message
    if (wordsFound === 0) {
      setStatusMessage('No words were found in the database')
      setOpen(true)
    } else {
      setStatusMessage(`${wordsFound} were found in the database`)
      setOpen(true)
    }
  }

  const { text } = useSelector(selector)
  return (
    <Fragment>
      <LoadingButton
        size="medium"
        onClick={async () => await checkIfWordExistsInDatabase()}
        loading={loading}
        variant="contained"
        sx={{ margin: 2 }}
      >
        Get Translations
      </LoadingButton>

      <SnackBar openSnackBar={open} handleCloseSnackbar={handleClose} severity="success" message={statusMessage} />
    </Fragment>
  )
}

export default TextAddWordsGetTranslations
