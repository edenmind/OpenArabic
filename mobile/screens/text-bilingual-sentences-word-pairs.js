import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Divider, Text } from 'react-native-paper'

function TextBilingualSentencesWordPairs(props) {
  const style = StyleSheet.create({
    arabic: {
      paddingBottom: 5,
      paddingTop: 15
    },
    divider: {
      marginBottom: 0,
      marginTop: 20
    }
  })
  return props.words.map((word, index) => (
    <Fragment key={index}>
      <Text variant="titleLarge" style={style.arabic}>
        {word.arabic}
      </Text>
      <Text variant="bodyMedium">{word.english}</Text>
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
