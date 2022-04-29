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

  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    generateListOfWord()
  }, [])

  const handleChangeArabic = (indexSentence, indexArabicWord, value) => {
    const newTheArabicWord = [...wordByWord]

    const translation = {
      arabic: text.arabicWords[indexSentence][indexArabicWord],
      english: value,
    }

    newTheArabicWord[indexSentence][indexArabicWord] = translation
    setWordByWord(newTheArabicWord)
  }

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const handleSave = () => {
    const sentences = []

    for (let i = 0; i < text.arabicSentence.length; i++) {
      const sentence = {
        english: text.englishSentence[i],
        arabic: text.arabicSentence[i],
        words: wordByWord[i],
      }
      sentences.push(sentence)
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/texts`,
      data: {
        // title,
        // category,
        // texts: {
        //   arabic: arabicText,
        //   english: englishText,
        // },
        // author,
        // source,
        // sentences,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setOpenSnackbar(true)

          dispatch({ type: ACTIONS.SET_TEXT, text: null })
        }
      })
      .catch((err) => console.log(err))
  }

  const generateListOfWord = () => {
    // const newTheArabicWord = []
    // for (const arabicWord of text.arabicWords) {
    //   const numberOfWords = arabicWord.length
    //   const newArray = []
    //   for (let j = 0; j < numberOfWords; j++) {
    //     newArray.push([''])
    //   }
    //   newTheArabicWord.push(newArray)
    // }
    // setWordByWord(newTheArabicWord)
  }

  return (
    <React.Fragment>
      <TextAddListOfWords handleChangeArabic={handleChangeArabic} />
      <SaveText handleSave={handleSave} />
      <SnackBar openSnackBar={openSnackBar} handleCloseSnackbar={handleCloseSnackbar} severity='success' message='Added new text' />
    </React.Fragment>
  )
}

export default TextAddWords
