/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import WordsContent from './words-content.js'
import FadeInView from '../components/fade-in-view.js'

const Words = () => {
  const [currentWord, setCurrentWord] = useState(0)

  const wordsSelector = (state) => state.words
  const { words } = useSelector(wordsSelector)

  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const handleSetCurrentWord = (index) => {
    setCurrentWord(index)
  }

  const handleSetCurrentWordIndex = (index) => {
    setCurrentWordIndex(index)
  }

  return (
    <FadeInView style={{ alignItems: 'center', flex: 1, height: '100%', width: '100%' }}>
      <WordsContent
        numberOfWordsToPractice={words.length}
        currentWord={currentWord}
        handleSetCurrentWord={handleSetCurrentWord}
        currentWordIndex={currentWordIndex}
        handleSetCurrentWordIndex={handleSetCurrentWordIndex}
      />
    </FadeInView>
  )
}

export default Words
