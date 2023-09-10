/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

const FadeInView = ({ children, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animation = Animated.timing(fadeAnim, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true
    })

    animation.start()

    // Cleanup animation on component unmount
    return () => animation.stop()
  }, []) // Empty dependency array to run effect only once

  return <Animated.View style={[style, { opacity: fadeAnim }]}>{children}</Animated.View>
}

FadeInView.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object
}

FadeInView.defaultProps = {
  style: {}
}

export default FadeInView
