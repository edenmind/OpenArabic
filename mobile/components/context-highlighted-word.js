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
        ...sharedStyle.englishBody,
        fontSize: 20,
        color: theme.colors.onPrimary,
        backgroundColor: theme.colors.primary,
        opacity: 1,
        marginHorizontal: 2,
        paddingHorizontal: 2,
        paddingBottom: 0,
        lineHeight: 35
      }}
      variant="bodyLarge"
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
