/* eslint-disable import/namespace */
import React from 'react'
import ChipText from '../../../components/ChipText'
import { useSelector } from 'react-redux'
import Spinner from '../../../components/Spinner'
import { StyleSheet, View } from 'react-native'

const Quiz = () => {
  const styles = StyleSheet.create({
    chip: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10
    }
  })

  const selector = (state) => state.text
  const { text } = useSelector(selector)

  const arabicArray = Array(
    text.vocabularyCollection.arabic
      ? text.vocabularyCollection.arabic.length
      : 0
  )
    .fill()
    .map(() => false)

  const englishArray = Array(
    text.vocabularyCollection.english
      ? text.vocabularyCollection.english.length
      : 0
  )
    .fill()
    .map(() => false)

  const addWordIdToCorrectAnswers = (wordId) => {
    setCorrectAnswers([...correctAnswers, wordId])
  }

  const [arabicSelectedWordId, setArabicSelectedWordId] = React.useState(false)
  const [engSelectedWordId, setEngSelectedWordId] = React.useState(false)
  const [arabicSelectedIndex, setArabicSelectedIndex] = React.useState()
  const [englishSelectedIndex, setEnglishSelectedIndex] = React.useState()
  const [correctAnswers, setCorrectAnswers] = React.useState([])
  const [arabicSelected, setArabicSelected] = React.useState(arabicArray)
  const [englishSelected, setEnglishSelected] = React.useState(englishArray)
  const [isSecondWordState, setIsSecondWord] = React.useState(false)

  const arabicWordPress = (index, arabicWordId) => {
    if (correctAnswers.includes(arabicWordId)) return

    if (engSelectedWordId == arabicWordId) {
      addWordIdToCorrectAnswers(arabicWordId)
      setArabicSelectedWordId(false)
      setEngSelectedWordId(false)
      setIsSecondWord(false)
    } else if (isSecondWordState) {
      setIsSecondWord(false)
      englishSelected[englishSelectedIndex] = false
      setEnglishSelected([...englishSelected])
      return
    } else {
      setIsSecondWord(true)
    }

    arabicSelected[index] = true
    setArabicSelected([...arabicSelected])
    setArabicSelectedWordId(arabicWordId)
    setArabicSelectedIndex(index)
    setIsSecondWord(true)
  }

  const englishWordPress = (index, englishWordId) => {
    if (correctAnswers.includes(englishWordId)) return

    if (arabicSelectedWordId == englishWordId) {
      addWordIdToCorrectAnswers(englishWordId)
      setArabicSelectedWordId(false)
      setEngSelectedWordId(false)
      setIsSecondWord(false)
    } else if (isSecondWordState) {
      setIsSecondWord(false)
      arabicSelected[arabicSelectedIndex] = false
      setArabicSelected([...arabicSelected])
      return
    } else {
      setIsSecondWord(true)
    }

    englishSelected[index] = true
    setEnglishSelected([...englishSelected])
    setEngSelectedWordId(englishWordId)
    setEnglishSelectedIndex(index)
  }

  const arabicVocabularies = text.vocabularyCollection.arabic.map(
    (arabic, index) => (
      <ChipText
        key={arabic.wordId}
        text={arabic.word}
        func={() => arabicWordPress(index, arabic.wordId)}
        selected={arabicSelected[index]}
      />
    )
  )

  const englishVocabularies = text.vocabularyCollection.english.map(
    (english, index) => (
      <ChipText
        key={english.wordId}
        text={english.word}
        func={() => englishWordPress(index, english.wordId)}
        selected={englishSelected[index]}
      />
    )
  )

  return text.title ? (
    <>
      <View style={styles.chip}>{arabicVocabularies}</View>
      <View style={styles.chip}>{englishVocabularies}</View>
    </>
  ) : (
    <Spinner />
  )
}

export default Quiz
