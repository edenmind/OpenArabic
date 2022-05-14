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
  chipNotSelected: {
    backgroundColor: COLORS.lightOlive,
    height: 50,
    margin: 15
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    height: 50,
    margin: 15
  },
  english: {
    fontSize: 13
  }
})

const SelectableChip = (props) => (
  <Chip
    mode="flat"
    onPress={props.func}
    backgroundColor={COLORS.leaf}
    textStyle={props.language === 'arabic' ? styles.arabic : styles.english}
    style={props.selected ? styles.chipSelected : styles.chipNotSelected}
  >
    {props.text || 'No text'}
  </Chip>
)

export default SelectableChip

SelectableChip.propTypes = {
  text: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
}
