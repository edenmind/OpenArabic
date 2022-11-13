import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import SelectableChip from '../components/selectable-chip.js'
import LANGUAGES from '../constants/languages.js'
import { ProgressBar, Text } from 'react-native-paper'
import { paperDarkTheme } from '../constants/paper-theme.js'

function TextQuizVocabularies(props) {
  const styles = StyleSheet.create({
    chipContainer: {
      paddingTop: 0,
      width: '50%'
    },
    container: {
      flexDirection: 'row'
    },
    // progressBar: {
    //   marginBottom: 10,
    //   marginLeft: 90,
    //   marginRight: 90,
    //   marginTop: 10
    // },
    title: {
      marginBottom: 10,
      marginTop: 20,
      textAlign: 'center'
    }
  })

  //calculate percentage of props.currentBatch to length of props.vocabularyCollection.arabic.length
  const percentage = props.currentBatch / (props.vocabularyCollection.arabic.length - 1)

  const arabicVocabularies = props.vocabularyCollection.arabic[props.currentBatch].map((arabic, index) => (
    <SelectableChip
      language={LANGUAGES.arabic}
      key={index}
      text={arabic.word}
      func={() => props.pressArabicWordHandler(index, arabic.wordId)}
      selected={props.arabicSelectedCollection[index] ?? false}
    />
  ))

  const englishVocabularies = props.vocabularyCollection.english[props.currentBatch].map((english, index) => (
    <SelectableChip
      language={LANGUAGES.english}
      key={index}
      text={english.word}
      func={() => props.pressEnglishWordHandler(index, english.wordId)}
      selected={props.englishSelectedCollection[index] ?? false}
    />
  ))

  return (
    <>
      <Text variant="labelLarge" style={styles.title}>
        Choose the Matching Pairs
      </Text>
      {/*
      <ProgressBar progress={percentage} color={paperDarkTheme.colors.primary} style={styles.progressBar} /> */}
      <View style={styles.container}>
        <View style={styles.chipContainer}>{arabicVocabularies}</View>
        <View style={styles.chipContainer}>{englishVocabularies}</View>
      </View>
    </>
  )
}

TextQuizVocabularies.propTypes = {
  vocabularyCollection: PropTypes.shape({
    arabic: PropTypes.array.isRequired,
    english: PropTypes.array.isRequired
  }),
  currentBatch: PropTypes.number.isRequired,
  pressEnglishWordHandler: PropTypes.func.isRequired,
  pressArabicWordHandler: PropTypes.func.isRequired,
  arabicSelectedCollection: PropTypes.array.isRequired,
  englishSelectedCollection: PropTypes.array.isRequired
}

export default TextQuizVocabularies
