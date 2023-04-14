import React from 'react'
import { Text } from 'react-native-paper'
import PropTypes from 'prop-types'
import { useSharedStyles } from '../styles/common.js'
import { paperDarkTheme } from '../constants/paper-theme.js'

const HighlightedWord = ({ word }) => {
  const sharedStyle = useSharedStyles()
  return (
    <Text
      style={{
        ...sharedStyle.englishBody,
        fontSize: 20,
        color: paperDarkTheme.colors.onPrimary,
        backgroundColor: paperDarkTheme.colors.primary,
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
