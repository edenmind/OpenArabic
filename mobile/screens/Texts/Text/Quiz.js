/* eslint-disable import/namespace */
import React, { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

import ChipText from '../../../components/ChipText'
import Spinner from '../../../components/Spinner'
import { useSelector } from 'react-redux'

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

  const [arabicCurrentSelectedWordId, setArabicSelectedWordId] =
    React.useState('')
  const [englishCurrentSelectedWordId, setEngSelectedWordId] =
    React.useState('')
  const [isSecondWord, setIsSecondWord] = React.useState(false)
  const [arabicCurrentSelectedIndex, setArabicSelectedIndex] = React.useState()
  const [englishCurrentSelectedIndex, setEnglishSelectedIndex] =
    React.useState()
  const [correctAnswers, setCorrectAnswers] = React.useState([])
  const [arabicSelectedCollection, setArabicSelected] = React.useState([])
  const [englishSelectedCollection, setEnglishSelected] = React.useState([])

  const addWordIdToCorrectAnswers = (wordId) => {
    setCorrectAnswers([...correctAnswers, wordId])
  }

  const pressArabicWordHandler = (index, arabicWordId) => {
    if (correctAnswers.includes(arabicWordId)) return

    if (englishCurrentSelectedWordId == arabicWordId) {
      addWordIdToCorrectAnswers(arabicWordId)
      setIsSecondWord(false)
    } else if (isSecondWord) {
      englishSelectedCollection[englishCurrentSelectedIndex] = false
      setEnglishSelected([...englishSelectedCollection])
      setIsSecondWord(false)
      return
    } else {
      setIsSecondWord(true)
    }

    arabicSelectedCollection[index] = true
    setArabicSelected([...arabicSelectedCollection])
    setArabicSelectedWordId(arabicWordId)
    setArabicSelectedIndex(index)
  }

  const pressEnglishWordHandler = (index, englishWordId) => {
    console.log('index: ', index, 'word id: ', englishWordId)

    if (correctAnswers.includes(englishWordId)) return

    if (arabicCurrentSelectedWordId == englishWordId) {
      addWordIdToCorrectAnswers(englishWordId)
      setIsSecondWord(false)
    } else if (isSecondWord) {
      arabicSelectedCollection[arabicCurrentSelectedIndex] = false
      setArabicSelected([...arabicSelectedCollection])
      setIsSecondWord(false)
      return
    } else {
      setIsSecondWord(true)
    }

    englishSelectedCollection[index] = true
    setEnglishSelected([...englishSelectedCollection])
    setEngSelectedWordId(englishWordId)
    setEnglishSelectedIndex(index)
  }

  const arabicVocabularies = text.vocabularyCollection.arabic.map(
    (arabic, index) => (
      <ChipText
        language="arabic"
        key={index}
        text={arabic.word}
        func={() => pressArabicWordHandler(index, arabic.wordId)}
        selected={
          arabicSelectedCollection[index]
            ? arabicSelectedCollection[index]
            : false
        }
      />
    )
  )

  const englishVocabularies = text.vocabularyCollection.english.map(
    (english, index) => (
      <ChipText
        language="english"
        key={index}
        text={english.word}
        func={() => pressEnglishWordHandler(index, english.wordId)}
        selected={
          englishSelectedCollection[index]
            ? englishSelectedCollection[index]
            : false
        }
      />
    )
  )

  return text ? (
    <Fragment>
      <View style={styles.chip}>{arabicVocabularies}</View>
      <View style={styles.chip}>{englishVocabularies}</View>
    </Fragment>
  ) : (
    <Spinner />
  )
}

export default Quiz
