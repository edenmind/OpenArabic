import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import SelectableChip from '../components/selectable-chip.js'
import LANGUAGES from '../constants/languages.js'
import { Text, Button } from 'react-native-paper'

function TextQuizVocabularies(props) {
  const styles = StyleSheet.create({
    chipContainer: {
      paddingTop: 0,
      width: '50%'
    },
    container: {
      flexDirection: 'row'
    },
    title: {
      marginBottom: 10,
      marginTop: 20,
      textAlign: 'center'
    },
    button: {
      margin: 30
    },
    bodyText: {
      marginLeft: 30,
      marginRight: 30
    }
  })

  //calculate percentage of props.currentBatch to length of props.vocabularyCollection.arabic.length
  const currentBatch = props.currentBatch + 1
  const totalNumberOfBatches = props.vocabularyCollection.arabic.length - 1
  const progress = currentBatch + ' of ' + totalNumberOfBatches
  const isFinalBatch = currentBatch < totalNumberOfBatches + 1

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
      text={english.word.charAt(0).toUpperCase() + english.word.slice(1)}
      func={() => props.pressEnglishWordHandler(index, english.wordId)}
      selected={props.englishSelectedCollection[index] ?? false}
    />
  ))

  return (
    <>
      {isFinalBatch ? (
        <Text variant="labelLarge" style={styles.title}>
          Choose the Matching Pairs · {progress}
        </Text>
      ) : (
        <>
          <Text variant="titleLarge" style={styles.title}>
            ✨ All Done ✨
          </Text>
          <Text variant="bodyMedium" style={styles.bodyText}>
            Continue to practice until you feel comfortable reading the text in Arabic, in sha'Allah.
          </Text>
          <Button onPress={() => props.gotoFirstBatch()} mode="elevated" style={styles.button}>
            PRACTICE AGAIN
          </Button>
        </>
      )}

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
  gotoFirstBatch: PropTypes.func.isRequired,
  pressEnglishWordHandler: PropTypes.func.isRequired,
  pressArabicWordHandler: PropTypes.func.isRequired,
  arabicSelectedCollection: PropTypes.array.isRequired,
  englishSelectedCollection: PropTypes.array.isRequired
}

export default TextQuizVocabularies
