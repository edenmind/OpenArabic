/* eslint-disable import/namespace */
/* eslint-disable import/named */
import { Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const WordPairs = (props) => {
  const style = StyleSheet.create({
    arabic: {
      fontSize: 25,
      paddingTop: 15
    }
  })
  return props.words.map((word) => (
    <Fragment key={word.wordId}>
      <Text style={style.arabic}>{word.arabic}</Text>
      <Text>{word.english}</Text>
    </Fragment>
  ))
}

WordPairs.propTypes = {
  words: PropTypes.array.isRequired
}

export default WordPairs
