/* eslint-disable operator-linebreak */
/* eslint-disable security/detect-object-injection */
import React, { Fragment } from 'react'
import { Button, Tooltip } from '@mui/material'
import * as api from '../services/api-service.js'
import { useSelector, useDispatch } from 'react-redux'

const selector = (state) => state.text

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const makeAllLetterLowercase = (string) => {
  return string.toLowerCase()
}

const TextAddWordsGetTranslations = () => {
  const dispatch = useDispatch()

  const checkIfWordExistsInDatabase = async () => {
    for (const [indexSentence, sentence] of text.sentences.entries()) {
      for (const [indexArabicWord, word] of sentence.words.entries()) {
        const englishWords = await api.getTranslationWord(word.arabic)

        // stop if there is no translation
        if (englishWords === undefined) {
          continue
        }

        // check if sentence.english words contains englishWords
        if (
          sentence.english.includes(capitalizeFirstLetter(englishWords)) ||
          sentence.english.includes(makeAllLetterLowercase(englishWords))
        ) {
          dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord, englishWords } })
          console.log('this is what we got:', englishWords)
        }
      }
    }
  }

  const { text } = useSelector(selector)
  return (
    <Fragment>
      <Tooltip title="Check if words have been translated before.">
        <Button variant="contained" sx={{ margin: 2 }} onClick={async () => await checkIfWordExistsInDatabase()}>
          Get Translations
        </Button>
      </Tooltip>
    </Fragment>
  )
}

export default TextAddWordsGetTranslations
