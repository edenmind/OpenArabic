import PropTypes from 'prop-types'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

import HighlightedWord from './context-highlighted-word.js'
import { useSharedStyles } from '../styles/common.js'

const WordsContextHighLighted = ({ arabicSentence, arabicWord, sentenceIsComplete }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const textStyles = StyleSheet.create({
    arabicText: {
      ...sharedStyle.arabicBody,
      fontSize: 55,
      lineHeight: 95,
      paddingHorizontal: 5
    },
    arabicTextInactive: {
      ...sharedStyle.arabicBody,
      color: theme.colors.outline,
      fontSize: 55,
      lineHeight: 95,
      paddingHorizontal: 5
    }
  })

  const renderWords = () =>
    arabicSentence.map((word) => {
      if (word.id === arabicWord.id && !sentenceIsComplete) {
        return <HighlightedWord word={word} key={word.id} />
      } else if (word.id > arabicWord.id) {
        return (
          <Text style={textStyles.arabicTextInactive} key={word.id}>
            {word.arabic}
          </Text>
        )
      } else {
        return (
          <Text style={textStyles.arabicText} key={word.id}>
            {word.arabic}
          </Text>
        )
      }
    })

  return (
    <View style={{ direction: 'rtl', flexDirection: 'row', flexWrap: 'wrap', padding: 0, paddingBottom: 10 }}>
      {renderWords()}
    </View>
  )
}

WordsContextHighLighted.propTypes = {
  arabicSentence: PropTypes.arrayOf(PropTypes.object).isRequired,
  arabicWord: PropTypes.object.isRequired,
  sentenceIsComplete: PropTypes.bool
}

export default WordsContextHighLighted
