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

  //current selected
  const [arabicCurrentSelected, setArabicCurrentSelected] = React.useState()
  const [englishCurrentSelected, setEnglishCurrentSelected] = React.useState()

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

  const [arabicSelectedState, setSelectedArabic] =
    React.useState(arabicSelected)

  const [englishSelectedState, setSelectedEnglish] =
    React.useState(englishSelected)

  const setFuncArabic = (index, wordId) => {
    const currentValue = arabicSelectedState[index]
    arabicSelectedState[index] = !currentValue
    setSelectedArabic([...arabicSelectedState])
    setArabicCurrentSelected(wordId)
    if (wordId == englishCurrentSelected) {
      console.log('match')
    } else {
      console.log('no match')
    }
  }

  const setFuncEnglish = (index, wordId) => {
    const currentValue = englishSelectedState[index]
    englishSelectedState[index] = !currentValue
    setSelectedEnglish([...englishSelectedState])
    setEnglishCurrentSelected(wordId)
    if (arabicCurrentSelected == wordId) {
      console.log('match')
    } else {
      console.log('no match')
    }
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
