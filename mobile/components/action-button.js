import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'
import { Animated } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'

import { UIElements } from '../constants/ui.js'
import { useSharedStyles } from '../styles/common.js'

export const ActionButton = ({ text, onPress }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const scaleValue = useRef(new Animated.Value(1)).current

  // Sound instance
  const sound = useRef(new Audio.Sound()).current

  useEffect(() => {
    // Preload the sound when the component mounts
    async function loadSound() {
      await sound.loadAsync(require('../assets/action.mp3'))
    }

    loadSound()

    // Unload the sound when the component unmounts
    return () => {
      sound.unloadAsync()
    }
  }, [sound])

  const handlePressIn = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    Animated.spring(scaleValue, {
      toValue: UIElements.AnimationScaleTo,
      useNativeDriver: true
    }).start()

    // Check if the sound is already playing
    const status = await sound.getStatusAsync()

    if (!status.isPlaying) {
      // If the sound isn't playing, play it

      await sound.replayAsync()
    }
  }

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start()
    onPress()
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Button mode="contained" onPressIn={handlePressIn} onPressOut={handlePressOut} style={sharedStyle.actionButton}>
        <Text style={sharedStyle.actionText}>{text}</Text>
      </Button>
    </Animated.View>
  )
}

ActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}
