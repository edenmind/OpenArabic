/* eslint-disable import/namespace */

import React, { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

import ChipText from './TextChip'
import PropTypes from 'prop-types'

function TextQuizVocabularies(props) {
  const styles = StyleSheet.create({
    chip: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10
    }
  })

  const arabicVocabularies = props.vocabularyCollection.arabic.map(
    (arabic, index) => (
      <ChipText
        language="arabic"
        key={index}
        text={arabic.word}
        func={() => props.pressArabicWordHandler(index, arabic.wordId)}
        selected={
          props.arabicSelectedCollection[index]
            ? props.arabicSelectedCollection[index]
            : false
        }
      />
    )
  )

  const englishVocabularies = props.vocabularyCollection.english.map(
    (english, index) => (
      <ChipText
        language="english"
        key={index}
        text={english.word}
        func={() => props.pressEnglishWordHandler(index, english.wordId)}
        selected={
          props.englishSelectedCollection[index]
            ? props.englishSelectedCollection[index]
            : false
        }
      />
    )
  )

  return (
    <Fragment>
      <View style={styles.chip}>{arabicVocabularies}</View>
      <View style={styles.chip}>{englishVocabularies}</View>
    </Fragment>
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
