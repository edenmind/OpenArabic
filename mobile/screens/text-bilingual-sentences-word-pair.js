/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import * as util from '../services/utility-service.js'
import PlaySound from '../components/play-sound.js'
import { useSharedStyles } from '../styles/common.js'

const styles = StyleSheet.create({
  arabic: {
    fontFamily: 'uthman',
    fontSize: 35,
    opacity: 1
  },
  divider: {
    margin: 10,
    opacity: 0.3
  },
  flexOne: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5
  }
})

function TextBilingualSentencesWords({ word }) {
  const sharedStyle = useSharedStyles()
  return (
    <Fragment>
      <View style={styles.row}>
        <View style={styles.flexOne}>
          <Text style={styles.arabic}>{word.arabic}</Text>
        </View>
        <View style={styles.flexOne}>
          <PlaySound audioFileName={word.filename} buttonText={'PLAY'} />
        </View>
      </View>
      <View style={styles.row}>
        <Text variant="titleMedium" style={{ ...sharedStyle.englishBody, opacity: 1 }}>
          {word.english.charAt(0).toUpperCase() + word.english.slice(1)} ·{' '}
          {util.transliterateArabicToEnglish(word.arabic)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text variant="bodyMedium" style={{ ...sharedStyle.englishBody }}>
          {word.grammar ?? 'No explanation available'}
        </Text>
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
