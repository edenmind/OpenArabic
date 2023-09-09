import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

import { AnswerButton } from '../components/answer-button.js'

export const AnimatedButton = ({ word, handlePress }) => {
  const fadeInValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    fadeInValue.setValue(0)
    Animated.timing(fadeInValue, {
      duration: 150,
      toValue: 1,
      useNativeDriver: true
    }).start()
  }, [fadeInValue, word])

  return (
    <Animated.View style={{ opacity: fadeInValue }}>
      <AnswerButton
        text={word.english}
        onPress={() => handlePress(word.id, word.arabic)}
        {...(word.correct ? { correct: true } : { incorrect: true })}
      />
    </Animated.View>
  )
}

AnimatedButton.propTypes = {
  handlePress: PropTypes.func.isRequired,
  word: PropTypes.shape({
    arabic: PropTypes.string,
    correct: PropTypes.bool.isRequired,
    english: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired
}
