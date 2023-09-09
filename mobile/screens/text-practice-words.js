import PropTypes from 'prop-types'
import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AnimatedButton } from '../components/animated-button'

const styles = StyleSheet.create({
  rowWrapper: {
    paddingBottom: 25
  }
})

const TextPracticeWords = React.memo(({ currentWordsInSentence, handlePress }) => (
  <View style={styles.rowWrapper}>
    {currentWordsInSentence.map((word, index) => (
      <AnimatedButton key={`${word.english}-${index}`} word={word} handlePress={handlePress} />
    ))}
  </View>
))

TextPracticeWords.displayName = 'TextPracticeWords'

TextPracticeWords.propTypes = {
  currentWordsInSentence: PropTypes.arrayOf(
    PropTypes.shape({
      arabic: PropTypes.string,
      correct: PropTypes.bool.isRequired,
      english: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  handlePress: PropTypes.func.isRequired
}

export default TextPracticeWords
