/* eslint-disable import/namespace */
import * as React from 'react'
import { Chip, Text } from 'react-native-paper'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { COLORS } from '../constants/colors'

const styles = StyleSheet.create({
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
  text: {
    fontSize: 25,
    fontWeight: '400'
  }
})

const ChipText = (props) => (
  <Chip
    onPress={props.func}
    //selected={props.selected}
    backgroundColor={COLORS.leaf}
    selectedColor={COLORS.branch}
    textStyle={styles.text}
    style={props.selected ? styles.chipSelected : styles.chipNotSelected}>
    <Text>{props.text}</Text>
  </Chip>
)

export default ChipText

ChipText.propTypes = {
  text: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
}
