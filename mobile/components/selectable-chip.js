import * as React from 'react'
import { Chip } from 'react-native-paper'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import LANGUAGES from '../constants/languages.js'

const styles = StyleSheet.create({
  arabic: {
    fontSize: 25
  },
  chipNotSelectedArabic: {
    direction: 'rtl',
    height: 50,
    margin: 15
  },
  chipNotSelectedEnglish: {
    direction: 'ltr',
    height: 50,
    margin: 15
  },
  chipSelectedArabic: {
    direction: 'rtl',
    height: 50,
    margin: 15
  },
  chipSelectedEnglish: {
    direction: 'ltr',
    height: 50,
    margin: 15
  },
  english: {
    fontSize: 16
  }
})

const getStyle = (props) => {
  if (props.language === LANGUAGES.arabic) {
    return props.selected ? styles.chipSelectedArabic : styles.chipNotSelectedArabic
  }

  if (props.language === LANGUAGES.english) {
    return props.selected ? styles.chipSelectedEnglish : styles.chipNotSelectedEnglish
  }
}

const SelectableChip = (props) => (
  <Chip
    mode="flat"
    onPress={props.func}
    textStyle={props.language === LANGUAGES.arabic ? styles.arabic : styles.english}
    style={getStyle(props)}
  >
    {props.text || 'No text'}
  </Chip>
)

export default SelectableChip

SelectableChip.propTypes = {
  text: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired
}
