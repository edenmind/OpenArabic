import PropTypes from 'prop-types'
import React, { useCallback, useRef, useMemo } from 'react'
import { Pressable, Animated, StyleSheet } from 'react-native'
import { Card, useTheme } from 'react-native-paper'

import { UIElements } from '../constants/ui.js'
import { useSharedStyles } from '../styles/common.js'

const ANIMATION_DURATION = 200

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

  const handlePressIn = useCallback(() => {
    Animated.timing(scaleValue, {
      duration: animationDuration,
      toValue: UIElements.AnimationScaleTo,
      useNativeDriver: true
    }).start()
  }, [scaleValue, animationDuration])

  const handlePressOut = useCallback(() => {
    Animated.timing(scaleValue, {
      duration: animationDuration,
      toValue: 1,
      useNativeDriver: true
    }).start()
  }, [scaleValue, animationDuration])

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
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
