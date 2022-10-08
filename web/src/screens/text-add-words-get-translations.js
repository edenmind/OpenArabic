/* eslint-disable security/detect-object-injection */
import React, { Fragment } from 'react'
import { Button, Tooltip } from '@mui/material'
import * as api from '../services/api-service.js'
import { useSelector, useDispatch } from 'react-redux'

const selector = (state) => state.text

const TextAddWordsGetTranslations = () => {
  const dispatch = useDispatch()

  const checkIfWordExistsInDatabase = async () => {
    for (const [indexSentence, sentence] of text.sentences.entries()) {
      for (const [indexArabicWord, word] of sentence.words.entries()) {
        const englishWords = await api.getTranslationWord(word.arabic)

        if (englishWords !== undefined) {
          console.log('this is what we got:', indexSentence, indexArabicWord, englishWords)
          dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord, englishWords } })
        }

        //console.log('this is what we got:', englishWord)
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
