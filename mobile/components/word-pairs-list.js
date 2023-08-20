/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import WordPairs from './word-pairs.js'

function WordPairsList({ words }) {
  const distinctValues = useMemo(() => {
    return [...new Set(words.filter((word) => word.arabic && word.english))]
  }, [words])

  return (
    <>
      {distinctValues.map((word, index) => (
        <WordPairs key={index} word={word} />
      ))}
    </>
  )
}

WordPairsList.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      arabic: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired
    })
  ).isRequired
}

export default WordPairsList
