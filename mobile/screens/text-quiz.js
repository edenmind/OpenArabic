import React, { Fragment } from 'react'
import SnackButton from '../components/snack-button.js'
import Spinner from '../components/spinner.js'
import TextQuizVocabularies from './text-quiz-vocabularies.js'
import { useSelector } from 'react-redux'
import * as Haptics from 'expo-haptics'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

const TextQuiz = () => {
  const numberOfWordInQuiz = 4
  const celebrationText = 'MashaAllah - All Words Correct 🎉🎉🎉 '

  const { text } = useSelector(selector)
  const { textLoading } = useSelector(textLoadSelector)

  const [celebrationSnackBarVisibility, setCelebrationSnackBarVisibility] = React.useState(false)
  const [currentBatch, setCurrentBatch] = React.useState(0)
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

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    if (englishCurrentSelectedWordId == arabicWordId) {
      // correct answer
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      addWordIdToCorrectAnswers(arabicWordId)
      setIsSecondWord(false)
      handleSetArabic(index, arabicWordId)

      if (correctAnswers.length === numberOfWordInQuiz) {
        setCelebrationSnackBarVisibility(true)
        setTimeout(() => {
          resetState()

          if (currentBatch === text.vocabularyCollection.numberOfBatches - 1) {
            setCurrentBatch(0)
            return
          }

          setCurrentBatch(currentBatch + 1)
        }, 1500)
      } // show celebration

      return
    }

    if (isSecondWord) {
      // wrong answer
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      englishSelectedCollection[englishCurrentSelectedIndex] = false
      setEnglishSelected([...englishSelectedCollection])
      setIsSecondWord(false)

      return
    }

    setIsSecondWord(true) // first word
    handleSetArabic(index, arabicWordId)
  }

  const pressEnglishWordHandler = (index, englishWordId) => {
    if (correctAnswers.includes(englishWordId)) {
      return
    } // do nothing

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    if (arabicCurrentSelectedWordId == englishWordId) {
      // correct answer
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      addWordIdToCorrectAnswers(englishWordId)
      setIsSecondWord(false)
      handleSetEnglish(index, englishWordId)

      if (correctAnswers.length === numberOfWordInQuiz) {
        setTimeout(() => {
          resetState()

          if (currentBatch === text.vocabularyCollection.numberOfBatches - 1) {
            setCelebrationSnackBarVisibility(true)

            return
          }

          setCurrentBatch(currentBatch + 1)
        }, 1500)
      } // show celebration

      return
    }

    if (isSecondWord) {
      // wrong answer
      arabicSelectedCollection[arabicCurrentSelectedIndex] = false
      setArabicSelected([...arabicSelectedCollection])
      setIsSecondWord(false)

      return
    }

    setIsSecondWord(true) // first word
    handleSetEnglish(index, englishWordId)
  }

  const resetState = () => {
    setArabicSelectedWordId('')
    setEngSelectedWordId('')
    setIsSecondWord(false)
    setArabicSelectedIndex('')
    setEnglishSelectedIndex('')
    setCorrectAnswers([])
    setArabicSelected([])
    setEnglishSelected([])
  }

  return textLoading ? (
    <Fragment>
      <TextQuizVocabularies
        currentBatch={currentBatch}
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
