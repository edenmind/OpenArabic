import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import * as util from '../services/utility-service.js'

function TextBilingualSentencesWordPairs(props) {
  const style = StyleSheet.create({
    arabic: {
      fontFamily: 'uthmanic',
      fontSize: 33,
      opacity: 0.9,
      paddingTop: 15
    },
    divider: {
      marginBottom: 15,
      marginTop: 15
    },
    english: {
      opacity: 0.9
    },
    latin: {
      opacity: 0.8,
      paddingBottom: 15
    }
  })
  return props.words.map((word, index) => (
    <Fragment key={index}>
      <Text variant="titleLarge" style={style.arabic}>
        {word.arabic}
      </Text>

      <Text style={style.latin} variant="bodyMedium">
        {util.transliterateArabicToEnglish(word.arabic)}
      </Text>

      <Text variant="bodyMedium" style={style.english}>
        {word.english.charAt(0).toUpperCase() + word.english.slice(1)}
      </Text>
      <Divider style={style.divider} />
    </Fragment>
  ))
}

TextBilingualSentencesWordPairs.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      arabic: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired
    })
  )
}

export default TextBilingualSentencesWordPairs
