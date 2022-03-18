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

  const [arabicCurrentSelected, setArabicCurrentSelected] =
    React.useState(false)
  const [englishCurrentSelected, setEnglishCurrentSelected] =
    React.useState(false)

  const [arabicCurrentSelectedIndex, setArabicCurrentSelectedIndex] =
    React.useState()
  const [englishCurrentSelectedIndex, setEnglishCurrentSelectedIndex] =
    React.useState()

  const [correctAnswers, setCorrectAnswers] = React.useState([])

  //selected, unselected, disabled
  const arabicSelected = Array(
    text.vocabularyCollection.arabic
      ? text.vocabularyCollection.arabic.length
      : 0
  )
    .fill()
    .map(() => false)

  const englishSelected = Array(
    text.vocabularyCollection.english
      ? text.vocabularyCollection.english.length
      : 0
  )
    .fill()
    .map(() => false)

  const addItem = (wordId) => {
    setCorrectAnswers([...correctAnswers, wordId])
  }

  const [arabicSelectedState, setSelectedArabic] =
    React.useState(arabicSelected)

  const [englishSelectedState, setSelectedEnglish] =
    React.useState(englishSelected)

  const [secondWordState, setSecondWordState] = React.useState(false)

  const setFuncArabic = (index, arabicWordId) => {
    if (correctAnswers.includes(arabicWordId)) return

    if (englishCurrentSelected == arabicWordId) {
      addItem(arabicWordId)
      setArabicCurrentSelected(false)
      setEnglishCurrentSelected(false)
      setSecondWordState(false)
      console.log('add')
    } else if (secondWordState) {
      console.log('clear')
      setSecondWordState(false)
      englishSelectedState[englishCurrentSelectedIndex] = false
      setSelectedEnglish([...englishSelectedState])
      return
    } else {
      setSecondWordState(true)
    }

    arabicSelectedState[index] = true
    setSelectedArabic([...arabicSelectedState])
    setArabicCurrentSelected(arabicWordId)
    setArabicCurrentSelectedIndex(index)
    setSecondWordState(true)
  }

  const setFuncEnglish = (index, englishWordId) => {
    if (correctAnswers.includes(englishWordId)) return

    if (arabicCurrentSelected == englishWordId) {
      addItem(englishWordId)
      setArabicCurrentSelected(false)
      setEnglishCurrentSelected(false)
      setSecondWordState(false)
      console.log('add')
    } else if (secondWordState) {
      console.log('clear')
      setSecondWordState(false)
      arabicSelectedState[arabicCurrentSelectedIndex] = false
      setSelectedArabic([...arabicSelectedState])
      return
    } else {
      setSecondWordState(true)
    }

    englishSelectedState[index] = true
    setSelectedEnglish([...englishSelectedState])
    setEnglishCurrentSelected(englishWordId)
    setEnglishCurrentSelectedIndex(index)
  }

  const arabicVocabularies = text.vocabularyCollection.arabic.map(
    (arabic, index) => (
      <ChipText
        key={arabic.wordId}
        text={arabic.word}
        func={() => setFuncArabic(index, arabic.wordId)}
        selected={arabicSelectedState[index]}
      />
    )
  )

  const englishVocabularies = text.vocabularyCollection.english.map(
    (english, index) => (
      <ChipText
        key={english.wordId}
        text={english.word}
        func={() => setFuncEnglish(index, english.wordId)}
        selected={englishSelectedState[index]}
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
