/* eslint-disable nonblock-statement-body-position */
import React, { useRef, useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { useSharedStyles } from '../styles/common.js'
import { capitalizeFirstLetter } from '../services/utility-service.js'
import * as Haptics from 'expo-haptics'
import { Audio } from 'expo-av'

export const AnswerButton = ({ text, onPress, haptic, correct, incorrect }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [color, setColor] = useState(theme.colors.elevation.level5)
  const [textColor, setTextColor] = useState(theme.colors.primary)
  const sound = useRef(new Audio.Sound()).current
  const shakeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    async function loadSound() {
      await sound.loadAsync(require('../assets/incorrect.mp3'))
    }
    loadSound()

    return () => sound.unloadAsync()
  }, [sound])

  const shakeButton = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start()
  }

  const resetColors = () => {
    setColor(theme.colors.elevation.level5)
    setTextColor(theme.colors.primary)
  }

  const handleIncorrectFeedback = async () => {
    await sound.replayAsync()
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
    shakeButton()
    setColor(theme.colors.error)
    setTextColor(theme.colors.error)

    // Reset colors back to original after a short delay
    setTimeout(resetColors, 1000)
  }

  const handleCorrectFeedback = () => {
    setColor(theme.colors.primary)
    setTextColor(theme.colors.primary)
  }

  const handlePressIn = () => {
    if (correct) handleCorrectFeedback()

    if (incorrect) handleIncorrectFeedback()

    if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  return (
    <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
      <Button onPress={onPress} style={{ ...sharedStyle.buttonAnswer, borderColor: color }} onPressIn={handlePressIn}>
        <Text style={{ ...sharedStyle.answerText, color: textColor, fontSize: text.length > 25 ? 20 : 23 }}>
          {capitalizeFirstLetter(text)}
        </Text>
      </Button>
    </Animated.View>
  )
}

AnswerButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  haptic: PropTypes.bool,
  correct: PropTypes.bool,
  incorrect: PropTypes.bool
}
