/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import TextBilingualSentencesWords from './text-bilingual-sentences-word-pair.js'
import { Surface, Text, useTheme } from 'react-native-paper'

function TextBilingualSentencesWordPairs({ words }) {
  const theme = useTheme()
  const distinctValues = useMemo(() => {
    return [...new Set(words.filter((word) => word.arabic && word.english))]
  }, [words])

  return (
    <>
      {distinctValues.map((word, index) => (
        <TextBilingualSentencesWords key={index} word={word} />
      ))}
      <Surface style={{ padding: 15, borderRadius: 10 }} elevation={1}>
        <Text variant="labelMedium" style={{ color: theme.colors.secondary }}>
          Note: The provided translation is a word-for-word translation to provide a literal understanding of the Arabic
          sentence.
        </Text>
      </Surface>
    </>
  )
}

TextBilingualSentencesWordPairs.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      arabic: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired
    })
  ).isRequired
}

export default TextBilingualSentencesWordPairs
