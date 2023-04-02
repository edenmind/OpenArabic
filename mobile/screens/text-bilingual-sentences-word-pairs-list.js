/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import TextBilingualSentencesWords from './text-bilingual-sentences-word-pair.js'

function TextBilingualSentencesWordPairs({ words }) {
  const distinctValues = useMemo(() => {
    return [...new Set(words.filter((word) => word.arabic && word.english))]
  }, [words])

  return (
    <>
      {distinctValues.map((word, index) => (
        <TextBilingualSentencesWords key={index} word={word} />
      ))}
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
