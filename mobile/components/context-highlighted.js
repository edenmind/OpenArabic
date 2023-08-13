import React, { useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { useSharedStyles } from '../styles/common.js'
import HighlightedWord from './context-highlighted-word.js'
const WordsContextHighLighted = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const rowWrapper = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10,
    margin: 0,
    padding: 0,
    direction: 'rtl'
  }

  const highlightWords = (sentence, words) => {
    return sentence.map((word, index) => {
      return word.id === words.id && !props.sentenceIsComplete ? (
        <HighlightedWord word={word} key={index} />
      ) : (
        <Text
          style={{
            ...sharedStyle.arabicBody,
            paddingHorizontal: 5,
            fontSize: 43,
            lineHeight: 75
          }}
          key={index}
        >
          {word.arabic.trim()}
        </Text>
      )
    })
  }

  return (
    <View>
      <View style={rowWrapper}>{highlightWords(props.arabicSentence, props.arabicWord)}</View>
    </View>
  )
}

WordsContextHighLighted.propTypes = {
  arabicSentence: PropTypes.array.isRequired,
  arabicWord: PropTypes.any.isRequired,
  sentenceIsComplete: PropTypes.bool
}

export default WordsContextHighLighted
