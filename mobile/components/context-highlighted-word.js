import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { useSharedStyles } from '../styles/common.js'

const HighlightedWord = ({ word }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  return (
    <Text
      style={{
        ...sharedStyle.arabicBody,
        color: theme.colors.onPrimary,
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: 5,

        fontSize: 43,
        lineHeight: 75
      }}
    >
      {word.arabic}
    </Text>
  )
}

export default HighlightedWord

HighlightedWord.propTypes = {
  word: PropTypes.shape({
    arabic: PropTypes.string.isRequired
  }).isRequired
}
