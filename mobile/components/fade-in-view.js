import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'

const FadeInView = ({ children, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true
    })

    animation.start()

    // Cleanup animation on component unmount
    return () => animation.stop()
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim
      }}
    >
      {children}
    </Animated.View>
  )
}

FadeInView.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object
}

export default FadeInView
