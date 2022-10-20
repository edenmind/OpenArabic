/* eslint-disable operator-linebreak */
/* eslint-disable security/detect-object-injection */
import React, { Fragment } from 'react'
import { Button, Tooltip } from '@mui/material'
import * as api from '../services/api-service.js'
import * as wp from '../services/word-processing.js'
import { useSelector, useDispatch } from 'react-redux'

const selector = (state) => state.text

const TextAddWordsGetTranslations = () => {
  const dispatch = useDispatch()

  const checkIfWordExistsInDatabase = async () => {
    for (const [indexSentence, sentence] of text.sentences.entries()) {
      for (const [indexArabicWord, word] of sentence.words.entries()) {
        const englishWords = await api.getTranslation(word.arabic)

        // stop if there is no translation for this word
        if (englishWords.length === 0) {
          continue
        }

        // check if sentence.english words contains englishWords
        const sentenceContainsCapitalized = sentence.english.includes(wp.capitalizeFirstLetter(englishWords))
        const sentenceContainsLowercase = sentence.english.includes(wp.makeAllLetterLowercase(englishWords))

        // if the database does not contain the translation, add it
        if (sentenceContainsCapitalized || sentenceContainsLowercase) {
          dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord, englishWords } })
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
