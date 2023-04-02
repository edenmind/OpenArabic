/* eslint-disable operator-linebreak */
import React, { Fragment } from 'react'
import * as api from '../services/api-service.js'
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

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const checkIfWordExistsInDatabase = async () => {
    //count the number of words found in the database
    let wordsFound = 0

    setLoading(true)

    for (const [indexSentence, sentence] of text.sentences.entries()) {
      for (const [indexArabicWord, word] of sentence.words.entries()) {
        // check if the word is found un the database
        const englishWords = await api.getWord(word.arabic)

        // if the word is not in the database, then translate it
        if (englishWords.english === undefined) {
          const englishWord = await api.getTranslation(word.arabic)

          //check both lowercase and first letter uppercase
          const sentenceContainsLowercase = sentence.english.includes(englishWord.toLowerCase())
          const sentenceContainsCapitalized = sentence.english.includes(
            englishWord.charAt(0).toUpperCase() + englishWord.slice(1)
          )

          if (sentenceContainsLowercase || sentenceContainsCapitalized) {
            dispatch({
              type: 'UPDATE_SENTENCE',
              value: { indexSentence, indexArabicWord, englishWord }
            })
            await api.postWord(word.arabic, englishWord)
            wordsFound++
          }
          // eslint-disable-next-line prettier/prettier

          continue
        }

        // if the word is in the database, then check if the sentence contains the word
        for (const englishWord of englishWords.english) {
          //check both lowercase and first letter uppercase
          const sentenceContainsLowercase = sentence.english.includes(englishWord.toLowerCase())
          const sentenceContainsCapitalized = sentence.english.includes(
            englishWord.charAt(0).toUpperCase() + englishWord.slice(1)
          )

          if (sentenceContainsLowercase || sentenceContainsCapitalized) {
            wordsFound++
            dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord, englishWord } })
          }
        }
      }
    }

    setLoading(false)

    // if no words were found in the database, then show a message
    if (wordsFound === 0) {
      setStatusMessage('No words were found in the database')
    } else {
      setStatusMessage(`${wordsFound} were found in the database`)
    }

    setOpen(true)
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

export default React.memo(TextAddWordsGetTranslations)
