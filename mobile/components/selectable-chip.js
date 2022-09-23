/* eslint-disable import/namespace */
import * as React from 'react'
import COLORS from '../constants/colors.js'
import { Chip } from 'react-native-paper'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  arabic: {
    fontSize: 25
  },
  chipNotSelectedArabic: {
    backgroundColor: COLORS.lightOlive,
    direction: 'rtl',
    height: 50,
    margin: 15
  },
  chipNotSelectedEnglish: {
    backgroundColor: COLORS.lightOlive,
    direction: 'ltr',
    height: 50,
    margin: 15
  },
  chipSelectedArabic: {
    backgroundColor: COLORS.leaf,
    direction: 'rtl',
    height: 50,
    margin: 15
  },
  chipSelectedEnglish: {
    backgroundColor: COLORS.leaf,
    direction: 'ltr',
    height: 50,
    margin: 15
  },
  english: {
    fontSize: 16
  }
})

const getStyle = (props) => {
  if (props.language === 'arabic') {
    return props.selected ? styles.chipSelectedArabic : styles.chipNotSelectedArabic
  }

  if (props.language === 'english') {
    return props.selected ? styles.chipSelectedEnglish : styles.chipNotSelectedEnglish
  }
}

const SelectableChip = (props) => (
  <Chip
    mode="flat"
    onPress={props.func}
    backgroundColor={COLORS.leaf}
    textStyle={props.language === 'arabic' ? styles.arabic : styles.english}
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
