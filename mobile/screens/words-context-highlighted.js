/* eslint-disable prettier/prettier */
/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { Fragment } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'
import { paperDarkTheme } from '../constants/paper-theme.js'

const WordsContextHighLighted = (props) => {
  const sharedStyle = useSharedStyles()

  //style for highlighted word
  const highlightedWord = {
    color: paperDarkTheme.colors.onPrimary,
    backgroundColor: paperDarkTheme.colors.primary
  }

  //split the sentence into an array of words
  const splitSentence = (sentence) => {
    return sentence.split(' ')
  }

  // highlight a word in splitSentence
  const highlightWord = (sentence, word, style) => {
    const splitSentenceArray = splitSentence(sentence)
    const highlightedSentence = splitSentenceArray.map((wordInSentence, index) => {
      if (wordInSentence === word) {
        return (
          <Fragment key={index}>
            <Text style={highlightedWord} variant="bodyLarge>">
              {' ' + wordInSentence + ' '}
            </Text>
            <Text> </Text>
          </Fragment>
        )
      }

      // file deepcode ignore ReactMissingArrayKeys: <please specify a reason of ignoring this>
      // deepcode ignore ReactMissingArrayKeys: <please specify a reason of ignoring this>
      return (
        <Text style={style} key={index}>
          {wordInSentence + ' '}
        </Text>
      )
    })

    return highlightedSentence
  }

  return (
    <View style={sharedStyle.headerContainer}>
      <Text style={sharedStyle.englishBody} variant="bodyLarge">
        {highlightWord(props.englishSentence, props.englishWord, sharedStyle.englishBody)}
      </Text>
      <Text style={sharedStyle.arabicBody}>
        {highlightWord(props.arabicSentence, props.arabicWord, sharedStyle.arabicBody)}
      </Text>
    </View>
  )
}

WordsContextHighLighted.propTypes = {
  englishWord: PropTypes.string.isRequired,
  englishSentence: PropTypes.string.isRequired,
  arabicWord: PropTypes.string.isRequired,
  arabicSentence: PropTypes.string.isRequired
}

export default WordsContextHighLighted
