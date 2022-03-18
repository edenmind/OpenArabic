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

  const [arabicSelectedWordId, setArabicSelectedWordId] = React.useState(false)
  const [engSelectedWordId, setEngSelectedWordId] = React.useState(false)
  const [isSecondWordState, setIsSecondWord] = React.useState(false)
  const [arabicSelectedIndex, setArabicSelectedIndex] = React.useState()
  const [englishSelectedIndex, setEnglishSelectedIndex] = React.useState()
  const [correctAnswers, setCorrectAnswers] = React.useState([])
  const [arabicSelected, setArabicSelected] = React.useState([])
  const [englishSelected, setEnglishSelected] = React.useState([])

  const addWordIdToCorrectAnswers = (wordId) => {
    setCorrectAnswers([...correctAnswers, wordId])
  }

  const arabicWordPress = (index, arabicWordId) => {
    if (correctAnswers.includes(arabicWordId)) return

    if (engSelectedWordId == arabicWordId) {
      addWordIdToCorrectAnswers(arabicWordId)
      setIsSecondWord(false)
    } else if (isSecondWordState) {
      englishSelected[englishSelectedIndex] = false
      setEnglishSelected([...englishSelected])
      setIsSecondWord(false)
      return
    } else {
      setIsSecondWord(true)
    }

    arabicSelected[index] = true
    setArabicSelected([...arabicSelected])
    setArabicSelectedWordId(arabicWordId)
    setArabicSelectedIndex(index)
  }

  const englishWordPress = (index, englishWordId) => {
    if (correctAnswers.includes(englishWordId)) return

    if (arabicSelectedWordId == englishWordId) {
      addWordIdToCorrectAnswers(englishWordId)
      setIsSecondWord(false)
    } else if (isSecondWordState) {
      arabicSelected[arabicSelectedIndex] = false
      setArabicSelected([...arabicSelected])
      setIsSecondWord(false)
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
        selected={arabicSelected[index] ? arabicSelected[index] : false}
      />
    )
  )

  const englishVocabularies = text.vocabularyCollection.english.map(
    (english, index) => (
      <ChipText
        key={english.wordId}
        text={english.word}
        func={() => englishWordPress(index, english.wordId)}
        selected={englishSelected[index] ? englishSelected[index] : false}
      />
    )
  )

  return text ? (
    <>
      <View style={styles.chip}>{arabicVocabularies}</View>
      <View style={styles.chip}>{englishVocabularies}</View>
    </>
  ) : (
    <Spinner />
  )
}

export default Quiz
