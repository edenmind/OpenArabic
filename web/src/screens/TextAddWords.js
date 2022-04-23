import * as ACTIONS from '../redux/actions'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SaveText from './TextAddSave'
import SnackBar from '../components/SnackBar'
import TextAddListOfWords from './TextAddListOfWords'
import axios from 'axios'

const TextAddWords = () => {
  const { arabicWords } = useSelector((state) => state.arabicWords)
  const { englishSentence } = useSelector((state) => state.englishSentence)
  const { arabicSentence } = useSelector((state) => state.arabicSentence)
  const { englishText } = useSelector((state) => state.englishText)
  const { arabicText } = useSelector((state) => state.arabicText)
  const { title } = useSelector((state) => state.title)
  const { category } = useSelector((state) => state.category)
  const { author } = useSelector((state) => state.author)
  const { source } = useSelector((state) => state.source)

  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [wordByWord, setWordByWord] = React.useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    generateListOfWord()
  }, [])

  const handleChangeArabic = (indexSentence, indexArabicWord, value) => {
    const newTheArabicWord = [...wordByWord]

    const translation = {
      arabic: arabicWords[indexSentence][indexArabicWord],
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

    for (let i = 0; i < arabicSentence.length; i++) {
      const sentence = {
        english: englishSentence[i],
        arabic: arabicSentence[i],
        words: wordByWord[i],
      }
      sentences.push(sentence)
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/texts`,
      data: {
        title,
        category,
        texts: {
          arabic: arabicText,
          english: englishText,
        },
        author,
        source,
        sentences,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setOpenSnackbar(true)

          dispatch({ type: ACTIONS.SET_TITLE, title: '' })
          dispatch({ type: ACTIONS.SET_CATEGORY, category: '' })
          dispatch({ type: ACTIONS.SET_AUTHOR, author: '' })
          dispatch({ type: ACTIONS.SET_SOURCE, source: '' })

          dispatch({ type: ACTIONS.SET_ARABIC_TEXT, arabicText: '' })
          dispatch({ type: ACTIONS.SET_ENGLISH_TEXT, englishText: '' })
          dispatch({ type: ACTIONS.SET_ARABIC_WORDS, arabicWords: [] })
          dispatch({ type: ACTIONS.SET_ENGLISH_WORDS, englishWords: [] })
          dispatch({ type: ACTIONS.SET_ARABIC_SENTENCE, arabicSentence: [] })
          dispatch({ type: ACTIONS.SET_ENGLISH_SENTENCE, englishSentence: [] })
          dispatch({ type: ACTIONS.SET_WORD_BY_WORD, wordByWord: [] })
        }
      })
      .catch((err) => console.log(err))
  }

  const generateListOfWord = () => {
    const newTheArabicWord = []

    for (const arabicWord of arabicWords) {
      const numberOfWords = arabicWord.length
      const newArray = []
      for (let j = 0; j < numberOfWords; j++) {
        newArray.push([''])
      }
      newTheArabicWord.push(newArray)
    }
    setWordByWord(newTheArabicWord)
  }

  return (
    <React.Fragment>
      <TextAddListOfWords wordByWord={wordByWord} handleChangeArabic={handleChangeArabic} />
      <SaveText title={title} category={category} source={source} author={author} handleSave={handleSave} />
      <SnackBar openSnackBar={openSnackBar} handleCloseSnackbar={handleCloseSnackbar} severity='success' message='Added new text' />
    </React.Fragment>
  )
}

export default TextAddWords
