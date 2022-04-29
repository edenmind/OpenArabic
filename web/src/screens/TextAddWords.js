import * as ACTIONS from '../redux/actions'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SaveText from './TextAddSave'
import SnackBar from '../components/SnackBar'
import TextAddListOfWords from './TextAddListOfWords'
import axios from 'axios'

const TextAddWords = () => {
  const selector = (state) => state.text
  const { text } = useSelector(selector)

  const [wordByWord, setWordByWord] = React.useState([])

  const handleChangeArabic = (indexSentence, indexArabicWord, value) => {
    const newTheArabicWord = [...wordByWord]

    const translation = {
      arabic: text.arabicWords[indexSentence][indexArabicWord],
      english: value,
    }

    newTheArabicWord[indexSentence][indexArabicWord] = translation
    setWordByWord(newTheArabicWord)
  }

  return (
    <React.Fragment>
      <TextAddListOfWords handleChangeArabic={handleChangeArabic} />
    </React.Fragment>
  )
}

export default TextAddWords
