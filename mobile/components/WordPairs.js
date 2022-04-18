/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const WordPairs = (props) => {
  const style = StyleSheet.create({
    arabic: {
      fontSize: 25,
      paddingBottom: 5,
      paddingTop: 15,
      textAlign: 'right'
    }
  })
  return props.words.map((word, index) => (
    <Fragment key={index}>
      <Text style={style.arabic}>{word.arabic}</Text>
      <Text>{word.english}</Text>
    </Fragment>
  ))
}

WordPairs.propTypes = {
  words: PropTypes.array.isRequired
}

export default WordPairs
