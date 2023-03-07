import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import * as util from '../services/utility-service.js'
import PlaySound from '../components/play-sound.js'

function TextBilingualSentencesWordPairs(props) {
  const style = StyleSheet.create({
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
    latin: {
      opacity: 0.8,
      paddingBottom: 15
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingLeft: 30,
      paddingRight: 20
    }
  })

  // Remove duplicate words
  const distinctValues = props.words.filter(
    (item, index, self) => index === self.findIndex((t) => t.arabic === item.arabic)
  )

  return distinctValues.map((word, index) => (
    <Fragment key={index}>
      <View style={style.row}>
        <View style={style.flexOne}>
          <Text style={style.arabic}>{word.arabic}</Text>
          <Text variant="bodyMedium" style={style.english}>
            {word.english.charAt(0).toUpperCase() + word.english.slice(1)} ·{' '}
            {util.transliterateArabicToEnglish(word.arabic)}
          </Text>
        </View>

        <View style={style.flexOne}>
          <PlaySound audioFileName={word.filename} buttonText={'PLAY'} />
        </View>
      </View>
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
