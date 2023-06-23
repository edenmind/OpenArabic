import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { useSharedStyles } from '../styles/common.js'

const HighlightedWord = ({ word }) => {
  const theme = useTheme()

  return (
    <Text
      variant="bodyLarge"
      style={{
        color: theme.colors.onPrimary,
        backgroundColor: theme.colors.secondary,
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 1,
        marginHorizontal: 3,
        paddingHorizontal: 5,
        paddingBottom: 0,
        lineHeight: 30
      }}
    >
      {word.english}
    </Text>
  )
}

export default HighlightedWord

HighlightedWord.propTypes = {
  word: PropTypes.shape({
    english: PropTypes.string.isRequired
  }).isRequired
}
