/* eslint-disable import/namespace */
import React from 'react'
import ChipText from '../../../components/ChipText'
import { useSelector } from 'react-redux'
import Spinner from '../../../components/Spinner'
import { StyleSheet, View } from 'react-native'

const Quiz = () => {
  const selector = (state) => state.text
  const { text } = useSelector(selector)

  const arabicSelected = Array(5)
    .fill()
    .map(() => true)

  const englishSelected = Array(5)
    .fill()
    .map(() => true)

  const [arabicSelectedState, setSelectedArabic] =
    React.useState(arabicSelected)
  const [englishSelectedState, setSelectedEnglish] =
    React.useState(englishSelected)

  const setFuncArabic = (index) => {
    console.log('index: ', index)
    const currentValue = arabicSelectedState[index]
    arabicSelectedState[index] = !currentValue
    setSelectedArabic([...arabicSelectedState])
  }

  const setFuncEnglish = (index) => {
    console.log('index: ', index)
    const currentValue = englishSelectedState[index]
    englishSelectedState[index] = !currentValue
    setSelectedEnglish([...englishSelectedState])
  }

  const styles = StyleSheet.create({
    chip: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10
    }
  })

  if (text.title) {
    const arabicVocabularies = text.vocabularyCollection.arabic.map(
      (arabic, index) => (
        <ChipText
          key={arabic.wordId}
          text={arabic.word}
          func={() => setFuncArabic(index)}
          selected={arabicSelectedState[index]}
        />
      )
    )

    const englishVocabularies = text.vocabularyCollection.english.map(
      (english, index) => (
        <ChipText
          key={english.wordId}
          text={english.word}
          func={() => setFuncEnglish(index)}
          selected={englishSelectedState[index]}
        />
      )
    )

    return (
      <>
        <View style={styles.chip}>{arabicVocabularies}</View>
        <View style={styles.chip}>{englishVocabularies}</View>
      </>
    )
  }
  return <Spinner />
}

export default Quiz
