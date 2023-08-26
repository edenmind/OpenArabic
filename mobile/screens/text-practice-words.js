import { View, StyleSheet } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { AnswerButton } from '../components/answer-button.js'

const styles = StyleSheet.create({
  rowWrapper: {
    paddingBottom: 25
  }
})

// create a component for each word in the arabicWords array in the sentencesInText array for the currentSentence and wrap them with a button
const TextPracticeWords = (props) => {
  return (
    <View style={styles.rowWrapper}>
      {props.currentWordsInSentence.map((word, index) => (
        <AnswerButton key={index} text={word.english} onPress={() => props.handlePress(word.id, word.arabic)} />
      ))}
    </View>
  )
}

export default TextPracticeWords

TextPracticeWords.propTypes = {
  currentWordsInSentence: PropTypes.array.isRequired,
  handlePress: PropTypes.func.isRequired
}
