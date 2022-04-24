/* eslint-disable import/namespace */
import { Animated, Pressable } from 'react-native'

import PropTypes from 'prop-types'
import React from 'react'

const animated = new Animated.Value(1)
const PressableOpacity = ({ children, ...props }) => {
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.7,
      duration: 100,
      useNativeDriver: true
    }).start()
  }
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start()
  }

  return (
    <Pressable onPressIn={fadeIn} onPressOut={fadeOut} {...props}>
      <Animated.View style={{ opacity: animated }}>{children}</Animated.View>
    </Pressable>
  )
}

PressableOpacity.propTypes = {
  children: PropTypes.node
}

export default PressableOpacity
