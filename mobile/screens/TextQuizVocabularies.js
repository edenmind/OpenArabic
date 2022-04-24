/* eslint-disable import/namespace */

import { StyleSheet, View } from 'react-native'

import PropTypes from 'prop-types'
import React from 'react'
import SelectableChip from '../components/SelectableChip'

function TextQuizVocabularies(props) {
  const styles = StyleSheet.create({
    chipContainer: {
      width: '50%'
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  })

  const arabicVocabularies = props.vocabularyCollection.arabic.map((arabic, index) => (
    <SelectableChip
      language="arabic"
      key={index}
      text={arabic.word}
      func={() => props.pressArabicWordHandler(index, arabic.wordId)}
      selected={
        props.arabicSelectedCollection[index] ? props.arabicSelectedCollection[index] : false
      }
    />
  ))

  const englishVocabularies = props.vocabularyCollection.english.map((english, index) => (
    <SelectableChip
      language="english"
      key={index}
      text={english.word}
      func={() => props.pressEnglishWordHandler(index, english.wordId)}
      selected={
        props.englishSelectedCollection[index] ? props.englishSelectedCollection[index] : false
      }
    />
  ))

  return (
    <View style={styles.container}>
      <View style={styles.chipContainer}>{arabicVocabularies}</View>
      <View style={styles.chipContainer}>{englishVocabularies}</View>
    </View>
  )
}

TextQuizVocabularies.propTypes = {
  vocabularyCollection: PropTypes.shape({
    arabic: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string.isRequired,
        wordId: PropTypes.string.isRequired
      })
    ),
    english: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string.isRequired,
        wordId: PropTypes.string.isRequired
      })
    )
  }),
  pressEnglishWordHandler: PropTypes.func.isRequired,
  pressArabicWordHandler: PropTypes.func.isRequired,
  arabicSelectedCollection: PropTypes.array.isRequired,
  englishSelectedCollection: PropTypes.array.isRequired
}

export default TextQuizVocabularies
