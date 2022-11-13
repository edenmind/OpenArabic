import * as React from 'react'
import { paperDarkTheme } from '../constants/paper-theme.js'
import { Chip } from 'react-native-paper'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import LANGUAGES from '../constants/languages.js'

const styles = StyleSheet.create({
  arabic: {
    fontFamily: 'uthmanic',
    fontSize: 33,
    lineHeight: 50
  },
  chipNotSelectedArabic: {
    backgroundColor: paperDarkTheme.colors.onSecondary,
    borderColor: paperDarkTheme.colors.outlineVariant,
    borderWidth: 2,
    direction: 'rtl',
    height: 63,
    margin: 10
  },
  chipNotSelectedEnglish: {
    backgroundColor: paperDarkTheme.colors.onSecondary,
    borderColor: paperDarkTheme.colors.outlineVariant,
    borderWidth: 2,
    direction: 'ltr',
    height: 63,
    margin: 10
  },
  chipSelectedArabic: {
    backgroundColor: paperDarkTheme.colors.primaryContainer,
    borderColor: paperDarkTheme.colors.primary,
    borderWidth: 2,
    direction: 'rtl',
    height: 63,
    margin: 10
  },
  chipSelectedEnglish: {
    backgroundColor: paperDarkTheme.colors.primaryContainer,
    borderColor: paperDarkTheme.colors.primary,
    borderWidth: 2,
    direction: 'ltr',
    height: 63,
    margin: 10
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
    mode="outlined"
    showSelectedOverlay={true}
    onPress={props.func}
    backgroundColor={paperDarkTheme.colors.primary}
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
