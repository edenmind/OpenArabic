import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

import HighlightedWord from './context-highlighted-word.js'
import { useSharedStyles } from '../styles/common.js'

const WordsContextHighLighted = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const rowWrapper = {
    direction: 'rtl',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    paddingBottom: 10
  }

  const highlightWords = (sentence, words) => {
    return sentence.map((word) => {
      return word.id === words.id && !props.sentenceIsComplete ? (
        <HighlightedWord word={word} key={word.id} />
      ) : (
        <Text
          style={{
            ...sharedStyle.arabicBody,
            fontSize: 43,
            lineHeight: 75,
            paddingHorizontal: 5
          }}
          key={word.id}
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
