import PropTypes from 'prop-types'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

import HighlightedWord from './practice-highlighted-word.js'
import { useSharedStyles } from '../styles/common.js'

const PracticeHighlighted = ({ arabicSentence, arabicWord, sentenceIsComplete }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const textStyles = StyleSheet.create({
    arabicText: {
      ...sharedStyle.arabicBody,
      fontSize: 50,
      lineHeight: 95,
      paddingRight: 5
    },
    arabicTextInactive: {
      ...sharedStyle.arabicBody,
      color: theme.colors.outline,
      fontSize: 50,
      lineHeight: 95,
      paddingRight: 5
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

  return <View style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', marginLeft: 7 }}>{renderWords()}</View>
}

PracticeHighlighted.propTypes = {
  arabicSentence: PropTypes.arrayOf(PropTypes.object).isRequired,
  arabicWord: PropTypes.object.isRequired,
  sentenceIsComplete: PropTypes.bool
}

export default PracticeHighlighted
