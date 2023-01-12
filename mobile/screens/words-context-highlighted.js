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
    backgroundColor: paperDarkTheme.colors.primary,
    whiteSpace: 'nowrap',
    padding: 2
  }

  //split the sentence into an array of words
  const splitSentence = (sentence) => {
    return sentence.split(' ')
  }

  // highlight a word in splitSentence
  const highlightWords = (sentence, words, style) => {
    let wordsToHighlight = []
    const alreadyHighlighted = []

    if (typeof words === 'string' && words.includes(' ')) {
      wordsToHighlight = words.split(' ')
    } else if (typeof words === 'string') {
      wordsToHighlight.push(words)
    } else {
      wordsToHighlight = words
    }

    const splitSentenceArray = splitSentence(sentence)
    const highlightedSentence = splitSentenceArray.map((wordInSentence, index) => {
      let foundWord = false

      for (const word of wordsToHighlight) {
        if (wordInSentence === word) {
          //if word is found in props.alreadyHighlighted, then continue to next word
          if (props.alreadyHighlightedIndex.includes(index)) {
            continue
          }

          //check if word is found in alreadyHighlighted
          if (alreadyHighlighted.includes(word)) {
            continue
          }

          foundWord = true

          // do not push to alreadyHighlighted if word is found two times in words
          if (wordsToHighlight.filter((w) => w === word).length === 1) {
            alreadyHighlighted.push(word)
          }
        }
      }

      if (foundWord) {
        if (
          splitSentenceArray[index - 1] &&
          splitSentenceArray[index + 1] &&
          wordsToHighlight.includes(splitSentenceArray[index - 1]) &&
          wordsToHighlight.includes(splitSentenceArray[index + 1])
        ) {
          return (
            <Fragment key={index}>
              <Text style={highlightedWord} variant="bodyLarge>">
                {wordInSentence + ' '}
              </Text>
            </Fragment>
          )
        }

        return (
          <Fragment key={index}>
            <Text style={highlightedWord} variant="bodyLarge>">
              {wordInSentence + ' '}
            </Text>
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
    <View>
      <Text style={{ ...sharedStyle.englishBody, opacity: 1 }} variant="bodyLarge">
        {highlightWords(props.englishSentence, props.englishWord, sharedStyle.englishBody)}
      </Text>
      <Text style={sharedStyle.arabicBody}>{props.arabicSentence}</Text>
    </View>
  )
}

WordsContextHighLighted.propTypes = {
  englishWord: PropTypes.string.isRequired,
  englishSentence: PropTypes.string.isRequired,
  arabicSentence: PropTypes.string.isRequired,
  alreadyHighlightedIndex: PropTypes.array.isRequired
}

export default WordsContextHighLighted
