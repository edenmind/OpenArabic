import React, { useCallback, useRef } from 'react'
import { Pressable, Animated, StyleSheet } from 'react-native'
import { Card, useTheme } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'
import { UIElements } from '../constants/ui.js'

const styles = StyleSheet.create({
  animatedView: {
    transform: [{ scale: 1 }]
  }
})

export const PressableCard = ({ onPress = () => {}, content }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const scaleValue = useRef(new Animated.Value(1)).current

  const animatedStyle = {
    transform: [{ scale: scaleValue }]
  }

  const scaleCard = useCallback(() => {
    const animation = Animated.timing(scaleValue, {
      useNativeDriver: true,
      toValue: UIElements.AnimationScaleTo
    })

    animation.start()

    // Cleanup animation
    return () => animation.stop()
  }, [scaleValue])

  const restoreCard = useCallback(() => {
    const animation = Animated.timing(scaleValue, {
      useNativeDriver: true,
      toValue: 1,
      duration: 0
    })

    animation.start()

    // Cleanup animation
    return () => animation.stop()
  }, [scaleValue])

  return (
    <Pressable onPressIn={scaleCard} onPressOut={restoreCard} onPress={onPress}>
      <Card style={sharedStyle.card} testID="textCard">
        <Animated.View style={[styles.animatedView, animatedStyle]}>{content}</Animated.View>
      </Card>
    </Pressable>
  )
}

PressableCard.propTypes = {
  onPress: PropTypes.func,
  content: PropTypes.element.isRequired
}
