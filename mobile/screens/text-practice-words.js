import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { AnswerButton } from '../components/answer-button.js'

const styles = StyleSheet.create({
  rowWrapper: {
    paddingBottom: 25
  }
})

const AnimatedButton = ({ word, handlePress }) => {
  const fadeInValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    fadeInValue.setValue(0)
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }, [fadeInValue, word])

  return (
    <Animated.View style={{ opacity: fadeInValue }}>
      <AnswerButton text={word.english} onPress={() => handlePress(word.id, word.arabic)} />
    </Animated.View>
  )
}

const TextPracticeWords = (props) => {
  return (
    <View style={styles.rowWrapper}>
      {props.currentWordsInSentence.map((word, index) => (
        <AnimatedButton key={`${word.english}-${index}`} word={word} handlePress={props.handlePress} />
      ))}
    </View>
  )
}

export default TextPracticeWords

AnimatedButton.propTypes = {
  word: PropTypes.shape({
    english: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    arabic: PropTypes.string.isRequired
  }).isRequired,
  handlePress: PropTypes.func.isRequired
}

TextPracticeWords.propTypes = {
  handlePress: PropTypes.func.isRequired,
  currentWordsInSentence: PropTypes.arrayOf(
    PropTypes.shape({
      english: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      arabic: PropTypes.string.isRequired
    })
  ).isRequired
}
