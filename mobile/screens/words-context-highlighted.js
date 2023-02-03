/* eslint-disable prettier/prettier */
/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'
import { paperDarkTheme } from '../constants/paper-theme.js'

const WordsContextHighLighted = (props) => {
  const sharedStyle = useSharedStyles()
  const [fadeAnim] = useState(new Animated.Value(0)) // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start()
  }, [fadeAnim])

  const rowWrapper = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10,
    margin: 0,
    padding: 0
  }

  // highlight a word in splitSentence
  const highlightWords = (sentence, words) => {
    return sentence.map((word, index) => {
      if (word.id === words.id) {
        return (
          <Text
            style={{
              ...sharedStyle.englishBody,
              color: paperDarkTheme.colors.onPrimary,
              backgroundColor: paperDarkTheme.colors.primary,
              opacity: 1,
              marginHorizontal: 2,
              paddingHorizontal: 2,
              paddingBottom: 0
            }}
            variant="bodyLarge"
            key={index}
          >
            {word.english}
          </Text>
        )
      }

      return (
        <Text style={{ ...sharedStyle.englishBody, marginHorizontal: 2, paddingBottom: 0 }} key={index}>
          {word.english}
        </Text>
      )
    })
  }

  return (
    <View>
      <View style={rowWrapper}>{highlightWords(props.englishSentence, props.englishWord)}</View>
      <Text style={{ ...sharedStyle.arabicBody, paddingBottom: 10 }}>
        {props.arabicSentence}
        <Animated.View // Special animatable View
          style={{
            opacity: fadeAnim // Bind opacity to animated value
          }}
        >
          <Text
            style={{
              ...sharedStyle.arabicBody
            }}
          >
            ...
          </Text>
        </Animated.View>
      </Text>
    </View>
  )
}

WordsContextHighLighted.propTypes = {
  englishSentence: PropTypes.array.isRequired,
  arabicSentence: PropTypes.string.isRequired,
  englishWord: PropTypes.object.isRequired
}

export default WordsContextHighLighted
