import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useRef, useMemo } from 'react'
import { Pressable, Animated, StyleSheet, Easing } from 'react-native'
import { Card, useTheme } from 'react-native-paper'

import { UIElements } from '../constants/ui.js'
import { useSharedStyles } from '../styles/common.js'

const ANIMATION_DURATION = 100

export const PressableCard = ({ onPress, content, animationDuration = ANIMATION_DURATION }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const scaleValue = useRef(new Animated.Value(1)).current

  const animatedStyle = useMemo(
    () => ({
      transform: [{ scale: scaleValue }]
    }),
    [scaleValue]
  )

  const pressed = useRef(false)

  const animateIn = () => {
    return new Promise((resolve) => {
      Animated.timing(scaleValue, {
        duration: animationDuration,
        easing: Easing.out(Easing.quad),
        toValue: UIElements.AnimationScaleTo,
        useNativeDriver: true
      }).start(resolve)
    })
  }

  const animateOut = () => {
    return new Promise((resolve) => {
      Animated.timing(scaleValue, {
        duration: animationDuration,
        easing: Easing.in(Easing.quad),
        toValue: 1,
        useNativeDriver: true
      }).start(resolve)
    })
  }

  const handlePressIn = () => {
    pressed.current = true
    animateIn()
  }

  const handlePressOut = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    animateOut().then(() => {
      onPress()
    })
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={() => {
        pressed.current = false
      }}
      onPress={handlePressOut}
    >
      <Animated.View style={[styles.animatedView, animatedStyle]}>
        <Card style={sharedStyle.card}>{content}</Card>
      </Animated.View>
    </Pressable>
  )
}

PressableCard.propTypes = {
  animationDuration: PropTypes.number,
  content: PropTypes.element.isRequired,
  onPress: PropTypes.func.isRequired
}

PressableCard.defaultProps = {
  animationDuration: ANIMATION_DURATION,
  onPress: () => {}
}

const styles = StyleSheet.create({
  animatedView: {
    transform: [{ scale: 1 }]
  }
})
