import React, { useRef, useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { useSharedStyles } from '../styles/common.js'

const HighlightedWord = ({ word }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  // Create a new animated value for border opacity
  const borderOpacity = useRef(new Animated.Value(1)).current

  const [isBorderVisible, setIsBorderVisible] = useState(true)

  const animateBorderOpacity = () => {
    // Determine the target opacity based on the current state
    const toValue = isBorderVisible ? 0.5 : 1

    Animated.timing(borderOpacity, {
      toValue,
      duration: 1000,
      useNativeDriver: false
    }).start(() => {
      setIsBorderVisible(!isBorderVisible)
    })
  }

  useEffect(() => {
    animateBorderOpacity()
  }, [animateBorderOpacity])

  return (
    <Animated.View
      style={{
        opacity: borderOpacity
      }}
    >
      <Text
        style={{
          ...sharedStyle.arabicBody,
          color: theme.colors.primary,
          paddingHorizontal: 5,
          fontSize: 43,
          lineHeight: 75
        }}
        onPress={animateBorderOpacity}
      >
        {word.arabic}
      </Text>
    </Animated.View>
  )
}

export default HighlightedWord

HighlightedWord.propTypes = {
  word: PropTypes.shape({
    arabic: PropTypes.string.isRequired
  }).isRequired
}
