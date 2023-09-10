/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable nonblock-statement-body-position */
import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Animated } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'

import { UIElements } from '../constants/ui.js'
import { capitalizeFirstLetter } from '../services/utility-service.js'
import { useSharedStyles } from '../styles/common.js'

export const AnswerButton = ({ text = '', onPress, haptic, correct, incorrect }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [color, setColor] = useState(theme.colors.elevation.level5)
  const [textColor, setTextColor] = useState(theme.colors.primary)
  const sound = useRef(new Audio.Sound()).current
  const shakeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current
  const resetColorTimeoutRef = useRef(null)

  useEffect(() => {
    async function loadSound() {
      await sound.loadAsync(require('../assets/incorrect.mp3'))
    }
    loadSound()

    return () => sound.unloadAsync()
  }, [sound])

  const shakeButton = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { duration: 50, toValue: 1, useNativeDriver: true }),
      Animated.timing(shakeAnim, { duration: 50, toValue: -1, useNativeDriver: true }),
      Animated.timing(shakeAnim, { duration: 50, toValue: 1, useNativeDriver: true }),
      Animated.timing(shakeAnim, { duration: 50, toValue: 0, useNativeDriver: true })
    ]).start()
  }

  const pushButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { duration: 100, toValue: UIElements.AnimationScaleTo, useNativeDriver: true }) // Push in
    ]).start()
  }

  const resetColors = () => {
    setColor(theme.colors.elevation.level5)
    setTextColor(theme.colors.primary)
  }

  const handleIncorrectFeedback = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)

    try {
      await sound.stopAsync()
      await sound.replayAsync()
    } catch (error) {
      console.error('Error playing sound', error)
    }

    shakeButton()
    setColor(theme.colors.error)
    setTextColor(theme.colors.error)

    // Reset colors back to original after a short delay
    setTimeout(resetColors, 500)
  }

  const handlePressIn = useCallback(() => {
    // Visual feedback for the press
    if (!correct) {
      return
    }
    setColor(theme.colors.primary)
    setTextColor(theme.colors.primary)
    pushButton()
  }, [correct, theme.colors.primary])

  const handlePress = useCallback(async () => {
    if (resetColorTimeoutRef.current) clearTimeout(resetColorTimeoutRef.current)

    if (correct) {
      resetColorTimeoutRef.current = setTimeout(resetColors, 1500)
    }

    if (incorrect) {
      await handleIncorrectFeedback()
    }

    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    onPress?.()
  }, [correct, handleIncorrectFeedback, haptic, incorrect, onPress, resetColors])

  return (
    <Animated.View style={{ transform: [{ translateX: shakeAnim }, { scale: scaleAnim }] }}>
      <Button
        onPressIn={handlePressIn}
        onPress={handlePress}
        style={{ ...sharedStyle.buttonAnswer, borderColor: color }}
      >
        <Text style={{ ...sharedStyle.answerText, color: textColor, fontSize: text.length > 25 ? 20 : 23 }}>
          {capitalizeFirstLetter(text)}
        </Text>
      </Button>
    </Animated.View>
  )
}

AnswerButton.propTypes = {
  correct: PropTypes.bool,
  haptic: PropTypes.bool,
  incorrect: PropTypes.bool,
  onPress: PropTypes.func,
  text: PropTypes.string
}
