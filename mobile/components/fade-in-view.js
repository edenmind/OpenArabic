import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true
    }).start()
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim
      }}
    >
      {props.children}
    </Animated.View>
  )
}

export default FadeInView

FadeInView.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object
}
