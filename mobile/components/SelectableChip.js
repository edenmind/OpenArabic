/* eslint-disable import/namespace */
import * as React from 'react'

import { Chip, Text } from 'react-native-paper'

import { COLORS } from '../constants/colors'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  arabic: {
    fontSize: 17
  },
  chipNotSelected: {
    backgroundColor: COLORS.leaf,
    margin: 5,
    padding: 0
  },
  chipSelected: {
    backgroundColor: COLORS.branch,
    margin: 5,
    padding: 0
  },
  english: {
    fontSize: 23,
    fontWeight: '400'
  }
})

const SelectableChip = (props) => (
  <Chip
    onPress={props.func}
    backgroundColor={COLORS.leaf}
    textStyle={props.language === 'arabic' ? styles.english : styles.arabic}
    style={props.selected ? styles.chipNotSelected : styles.chipSelected}>
    <Text>{props.text ? props.text : 'No text'}</Text>
  </Chip>
)

export default SelectableChip

SelectableChip.propTypes = {
  text: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
}
