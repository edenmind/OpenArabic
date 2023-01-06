import * as React from 'react'
import { paperDarkTheme } from '../constants/paper-theme.js'
import { Chip } from 'react-native-paper'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import LANGUAGES from '../constants/languages.js'

const styles = StyleSheet.create({
  arabic: {
    fontFamily: 'amiri',
    fontSize: 27,
    lineHeight: 'auto'
  },
  chipNotSelectedArabic: {
    backgroundColor: paperDarkTheme.colors.onSecondary,
    borderColor: paperDarkTheme.colors.outlineVariant,
    borderWidth: 3,
    direction: 'rtl',
    margin: 3,
    padding: 0
  },
  chipNotSelectedEnglish: {
    backgroundColor: paperDarkTheme.colors.onSecondary,
    borderColor: paperDarkTheme.colors.outlineVariant,
    borderWidth: 2,
    direction: 'ltr',

    margin: 3
  },
  chipSelectedArabic: {
    backgroundColor: paperDarkTheme.colors.primaryContainer,
    borderColor: paperDarkTheme.colors.primary,
    borderWidth: 2,
    direction: 'rtl',

    margin: 3
  },
  chipSelectedEnglish: {
    backgroundColor: paperDarkTheme.colors.primaryContainer,
    borderColor: paperDarkTheme.colors.primary,
    borderWidth: 2,
    direction: 'ltr',

    margin: 7
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
    {props.text}
  </Chip>
)

export default SelectableChip

SelectableChip.propTypes = {
  text: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired
}
