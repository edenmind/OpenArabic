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
  const celebrationText = 'MashaAllah - All Words Correct!'

  const { text } = useSelector(selector)
  const { textLoading } = useSelector(textLoadSelector)

  const [arabicCurrentSelectedIndex, setArabicSelectedIndex] = React.useState()
  const [arabicCurrentSelectedWordId, setArabicSelectedWordId] = React.useState('')
  const [arabicSelectedCollection, setArabicSelected] = React.useState([])
  const [celebrationSnackBarVisibility, setCelebrationSnackBarVisibility] = React.useState(false)
  const [correctAnswers, setCorrectAnswers] = React.useState([])
  const [currentBatch, setCurrentBatch] = React.useState(0)
  const [englishCurrentSelectedIndex, setEnglishSelectedIndex] = React.useState()
  const [englishCurrentSelectedWordId, setEngSelectedWordId] = React.useState('')
  const [englishSelectedCollection, setEnglishSelected] = React.useState([])
  const [isSecondWord, setIsSecondWord] = React.useState(false)

  const addWordIdToCorrectAnswers = (wordId) => {
    setCorrectAnswers([...correctAnswers, wordId])
  }

  const onDismissSnackBar = () => setCelebrationSnackBarVisibility(false)

  // This function sets the Arabic word that the user has selected in the
  // list of words. It also sets the index of the selected word so that
  // the user can see which word they have selected.

  const handleSetArabic = (index, arabicWordId) => {
    arabicSelectedCollection[index] = true
    setArabicSelected([...arabicSelectedCollection])
    setArabicSelectedWordId(arabicWordId)
    setArabicSelectedIndex(index)
  }

  // This function sets the English word that the user has selected in the
  // list of words. It also sets the index of the selected word so that
  // the user can see which word they have selected.

  const handleSetEnglish = (index, englishWordId) => {
    englishSelectedCollection[index] = true
    setEnglishSelected([...englishSelectedCollection])
    setEngSelectedWordId(englishWordId)
    setEnglishSelectedIndex(index)
  }

  const pressArabicWordHandler = (index, arabicWordId) => {
    if (correctAnswers.includes(arabicWordId)) {
      return
    } // if the word has already been answered correctly, do nothing

    if (englishCurrentSelectedWordId == arabicWordId) {
      // correct answer
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      addWordIdToCorrectAnswers(arabicWordId)
      setIsSecondWord(false)
      handleSetArabic(index, arabicWordId)

      if (correctAnswers.length === numberOfWordInQuiz) {
        setCelebrationSnackBarVisibility(true)
        //increase the current batch by 1
        setCurrentBatch(currentBatch + 1)

        //stop quiz if we are at the last batch
        if (currentBatch == text.vocabularyCollection.arabic.length - 2) {
          return
        }

        setTimeout(() => {
          resetState()
        }, 500)
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
    } // if the word has already been answered correctly, do nothing

    if (arabicCurrentSelectedWordId == englishWordId) {
      // correct answer
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      addWordIdToCorrectAnswers(englishWordId)
      setIsSecondWord(false)
      handleSetEnglish(index, englishWordId)

      if (correctAnswers.length === numberOfWordInQuiz) {
        setCelebrationSnackBarVisibility(true)

        setCurrentBatch(currentBatch + 1)

        //stop quiz if we are at the last batch
        if (currentBatch == text.vocabularyCollection.arabic.length - 2) {
          return
        }

        //increase the current batch by 1
        setTimeout(() => {
          resetState()
        }, 550)
      } // show celebration

      return
    }

    if (isSecondWord) {
      // wrong answer
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
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

  const gotoFirstBatch = () => {
    setCurrentBatch(0)
    resetState()
  }

  return textLoading ? (
    <Fragment>
      <TextQuizVocabularies
        currentBatch={currentBatch}
        arabicSelectedCollection={arabicSelectedCollection}
        englishSelectedCollection={englishSelectedCollection}
        pressArabicWordHandler={pressArabicWordHandler}
        gotoFirstBatch={gotoFirstBatch}
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
