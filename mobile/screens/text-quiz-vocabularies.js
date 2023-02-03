import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import SelectableChip from '../components/selectable-chip.js'
import LANGUAGES from '../constants/languages.js'
import { Text, Button } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'

function TextQuizVocabularies(props) {
  const sharedStyle = useSharedStyles()
  const styles = StyleSheet.create({
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flexShrink: 1
    },
    container: {
      marginHorizontal: 15
    },
    title: {
      textAlign: 'center',
      padding: 30
    },
    label: {
      textAlign: 'center'
    },
    bodyText: {
      marginHorizontal: 30
    },
    intro: {
      marginVertical: 5,
      marginHorizontal: 20,
      padding: 10
    }
  })

  //calculate percentage of props.currentBatch to length of props.vocabularyCollection.arabic.length
  const currentBatch = props.currentBatch + 1
  const totalNumberOfBatches = props.vocabularyCollection.arabic.length
  const progress = `${currentBatch} of ${totalNumberOfBatches - 1}`
  const isFinalBatch = currentBatch == totalNumberOfBatches

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
      {isFinalBatch ? getAllDone() : getContinue()}

      <View style={styles.container}>
        <Text style={sharedStyle.englishBody}>
          It is narrated on the authority of Amirul Mu'minin, Abu Hafs 'Umar bin al-Khattab who said:
        </Text>
        <View style={styles.chipContainer}>{arabicVocabularies}</View>
      </View>
    </>
  )

  function getAllDone() {
    return (
      <View style={sharedStyle.container}>
        <Text variant="titleLarge" style={styles.title}>
          ✨ All Done ✨
        </Text>
        <Text variant="bodyMedium" style={sharedStyle.englishBody}>
          Practice until you feel comfortable reading the text in Arabic, in sha'Allah.
        </Text>
        <Button onPress={() => props.gotoFirstBatch()} mode="elevated" style={sharedStyle.button}>
          PRACTICE AGAIN
        </Button>
      </View>
    )
  }

  function getContinue() {
    return <View></View>
  }
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
