import React, { useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { useSharedStyles } from '../styles/common.js'
import HighlightedWord from './context-highlighted-word.js'
const WordsContextHighLighted = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
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

  const highlightWords = (sentence, words) => {
    return sentence.map((word, index) => {
      return word.id === words.id ? (
        <HighlightedWord word={word} key={index} />
      ) : (
        <Text
          style={{
            ...sharedStyle.englishBody,
            marginHorizontal: 2,
            fontSize: 20,
            lineHeight: 35,
            paddingBottom: 0
          }}
          key={index}
        >
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
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={{ ...sharedStyle.arabicBody, color: theme.colors.tertiary }}>...</Text>
        </Animated.View>
      </Text>
    </View>
  )
}

WordsContextHighLighted.propTypes = {
  englishSentence: PropTypes.array.isRequired,
  arabicSentence: PropTypes.string.isRequired,
  englishWord: PropTypes.any.isRequired
}

export default WordsContextHighLighted
