/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import PlaySound from './play-sound.js'
import { useSharedStyles } from '../styles/common.js'
import { UI } from '../constants/ui.js'
import { transliterateArabicToEnglish } from '../services/utility-service.js'

const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  },
  row: {
    paddingBottom: 0,
    paddingTop: 35
  }
})

function WordParis({ word }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  return (
    <Fragment>
      <View style={styles.row}>
        <View style={styles.flexOne}>
          <Text style={{ ...sharedStyle.arabicHeading, fontSize: 40, direction: 'rtl' }}>{word.arabic}</Text>
          <Text
            style={{
              ...sharedStyle.arabicTerm
            }}
          >
            {transliterateArabicToEnglish(word.arabic)}
          </Text>
          <Text style={{ ...sharedStyle.englishHeading, paddingTop: 0 }}>
            {word.english.charAt(0).toUpperCase() + word.english.slice(1)}
          </Text>
        </View>
        <Text style={{ ...sharedStyle.englishBody }}>{word.explanation}</Text>
      </View>
      <PlaySound audioFileNames={word.filename} buttonText={UI.play} />
    </Fragment>
  )
}

WordParis.propTypes = {
  word: PropTypes.shape({
    arabic: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    explanation: PropTypes.string
  }).isRequired
}

export default WordParis
