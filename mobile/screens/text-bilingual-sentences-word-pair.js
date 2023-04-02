/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import * as util from '../services/utility-service.js'
import PlaySound from '../components/play-sound.js'

const styles = StyleSheet.create({
  arabic: {
    fontFamily: 'amiri',
    fontSize: 35,
    opacity: 0.9
  },
  divider: {
    marginBottom: 10,
    marginTop: 10,
    opacity: 0.3
  },
  english: {
    opacity: 0.75
  },
  flexOne: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 30,
    paddingRight: 20
  }
})

function TextBilingualSentencesWords({ word }) {
  return (
    <Fragment>
      <View style={styles.row}>
        <View style={styles.flexOne}>
          <Text style={styles.arabic}>{word.arabic}</Text>
          <Text variant="bodyMedium" style={styles.english}>
            {word.english.charAt(0).toUpperCase() + word.english.slice(1)} ·{' '}
            {util.transliterateArabicToEnglish(word.arabic)}
          </Text>
        </View>

        <View style={styles.flexOne}>
          <PlaySound audioFileName={word.filename} buttonText={'PLAY'} />
        </View>
      </View>
      <Divider style={styles.divider} />
    </Fragment>
  )
}

TextBilingualSentencesWords.propTypes = {
  word: PropTypes.arrayOf(
    PropTypes.shape({
      arabic: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired
    })
  ).isRequired
}

export default TextBilingualSentencesWords
