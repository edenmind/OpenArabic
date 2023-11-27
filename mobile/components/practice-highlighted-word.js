import PropTypes from 'prop-types'
import React, { useRef, useState, useEffect } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

import { useSharedStyles } from '../styles/common.js'

const PracticeHighlightedWord = ({ word: { arabic } }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const borderOpacity = useRef(new Animated.Value(1)).current
  const [isBorderVisible, setIsBorderVisible] = useState(true)

  const textStyles = StyleSheet.create({
    arabicText: {
      ...sharedStyle.arabicBody,
      color: theme.colors.tertiary,
      fontSize: 50,
      lineHeight: 95,
      margin: 0,
      paddingRight: 5
    }
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animateBorderOpacity = () => {
    const toValue = isBorderVisible ? 0.2 : 1
    Animated.timing(borderOpacity, {
      duration: 750,
      toValue,
      useNativeDriver: false
    }).start(() => {
      setIsBorderVisible(!isBorderVisible)
    })
  }

  useEffect(() => {
    animateBorderOpacity()
  }, [animateBorderOpacity])

  return (
    <Animated.View style={{ opacity: borderOpacity, padding: 0 }}>
      <Text style={textStyles.arabicText} onPress={animateBorderOpacity}>
        {arabic}
      </Text>
    </Animated.View>
  )
}

PracticeHighlightedWord.propTypes = {
  word: PropTypes.shape({
    arabic: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired
  }).isRequired
}

export default PracticeHighlightedWord
