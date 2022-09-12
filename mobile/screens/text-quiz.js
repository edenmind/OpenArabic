/* eslint-disable import/namespace */
import React, { Fragment } from 'react'

import SnackButton from '../components/snack-button.js'
import Spinner from '../components/spinner.js'
import TextQuizVocabularies from './text-quiz-vocabularies.js'
import { useSelector } from 'react-redux'

const selector = (state) => state.text

const TextQuiz = () => {
  const numberOfWordInQuiz = 4
  const celebrationText = 'MashaAllah! You made it... 🎉🎉🎉'

  const { text } = useSelector(selector)
  const [celebrationSnackBarVisibility, setCelebrationSnackBarVisibility] = React.useState(false)

  const [arabicCurrentSelectedWordId, setArabicSelectedWordId] = React.useState('')
  const [englishCurrentSelectedWordId, setEngSelectedWordId] = React.useState('')
  const [isSecondWord, setIsSecondWord] = React.useState(false)
  const [arabicCurrentSelectedIndex, setArabicSelectedIndex] = React.useState()
  const [englishCurrentSelectedIndex, setEnglishSelectedIndex] = React.useState()
  const [correctAnswers, setCorrectAnswers] = React.useState([])
  const [arabicSelectedCollection, setArabicSelected] = React.useState([])
  const [englishSelectedCollection, setEnglishSelected] = React.useState([])

  const addWordIdToCorrectAnswers = (wordId) => {
    setCorrectAnswers([...correctAnswers, wordId])
  }

  const onDismissSnackBar = () => setCelebrationSnackBarVisibility(false)

  const handleSetArabic = (index, arabicWordId) => {
    arabicSelectedCollection[index] = true
    setArabicSelected([...arabicSelectedCollection])
    setArabicSelectedWordId(arabicWordId)
    setArabicSelectedIndex(index)
  }

  const handleSetEnglish = (index, englishWordId) => {
    englishSelectedCollection[index] = true
    setEnglishSelected([...englishSelectedCollection])
    setEngSelectedWordId(englishWordId)
    setEnglishSelectedIndex(index)
  }

  const pressArabicWordHandler = (index, arabicWordId) => {
    if (correctAnswers.includes(arabicWordId)) {
      return
    } // do nothing

    if (englishCurrentSelectedWordId == arabicWordId) {
      // correct answer
      addWordIdToCorrectAnswers(arabicWordId)
      setIsSecondWord(false)
      handleSetArabic(index, arabicWordId)
      correctAnswers.length === numberOfWordInQuiz && setCelebrationSnackBarVisibility(true) // show celebration
      return
    }

    if (isSecondWord) {
      // wrong answer
      englishSelectedCollection[englishCurrentSelectedIndex] = false
      setEnglishSelected([...englishSelectedCollection])
      setIsSecondWord(false)
      // eslint-disable-next-line putout/add-newline-before-return
      return
    }

    setIsSecondWord(true) // first word
    handleSetArabic(index, arabicWordId)
  }

  const pressEnglishWordHandler = (index, englishWordId) => {
    console.log(englishWordId)

    if (correctAnswers.includes(englishWordId)) {
      return
    } // do nothing

    if (arabicCurrentSelectedWordId == englishWordId) {
      // correct answer
      addWordIdToCorrectAnswers(englishWordId)
      setIsSecondWord(false)
      handleSetEnglish(index, englishWordId)
      correctAnswers.length === numberOfWordInQuiz && setCelebrationSnackBarVisibility(true) // show celebration

      return
    }

    if (isSecondWord) {
      // wrong answer
      arabicSelectedCollection[arabicCurrentSelectedIndex] = false
      setArabicSelected([...arabicSelectedCollection])
      setIsSecondWord(false)
      // eslint-disable-next-line putout/add-newline-before-return
      return
    }

    setIsSecondWord(true) // first word
    handleSetEnglish(index, englishWordId)
  }

  return text.title ? (
    <Fragment>
      <TextQuizVocabularies
        arabicSelectedCollection={arabicSelectedCollection}
        englishSelectedCollection={englishSelectedCollection}
        pressArabicWordHandler={pressArabicWordHandler}
        pressEnglishWordHandler={pressEnglishWordHandler}
        vocabularyCollection={text.vocabularyCollection}
      />
      <SnackButton
        visible={celebrationSnackBarVisibility}
        onDismissSnackBar={onDismissSnackBar}
        text={celebrationText}
      />
    </Fragment>
  ) : (
    <Spinner />
  )
}

export default TextQuiz
