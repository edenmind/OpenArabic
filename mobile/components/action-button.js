import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Animated } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'

import { UIElements } from '../constants/ui.js'
import { useSharedStyles } from '../styles/common.js'

export const ActionButton = ({ text, onPress }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const scaleValue = useRef(new Animated.Value(1)).current

  const handlePressIn = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    Animated.spring(scaleValue, {
      toValue: UIElements.AnimationScaleTo,
      useNativeDriver: true
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      friction: 3,
      tension: 40,
      toValue: 1,
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
