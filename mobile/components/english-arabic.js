/* eslint-disable unicorn/no-null */
import PropTypes from 'prop-types'
import React, { useMemo, useState, useCallback } from 'react'
import { Text, useTheme, Divider } from 'react-native-paper'
import { useSelector } from 'react-redux'

import ArabicWords from './arabic-words.js'
import PlaySound from './play-sound.js'
import { transliterateArabicToEnglish } from '../services/utility-service.js'
import { useSharedStyles } from '../styles/common.js'

const isTransliterationOnSelector = (state) => state.isTransliterationOn
const isEngOnSelector = (state) => state.isEngOn

export const EnglishArabic = ({ sentence: { arabic, english, words = [] } = {}, showAll, paddingBottom = 45 }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const [currentPlayingWordIndex, setCurrentPlayingWordIndex] = useState(null)
  const transliteratedText = useMemo(() => transliterateArabicToEnglish(arabic), [arabic])
  const fileNames = words.map((word) => word.filename)

  const { isTransliterationOn } = useSelector(isTransliterationOnSelector)
  const { isEngOn } = useSelector(isEngOnSelector)

  const showTransliteration = isTransliterationOn === 'on'
  const showEng = isEngOn === 'on'

  const handlePlayingWord = useCallback((index) => {
    setCurrentPlayingWordIndex(index)
  }, [])

  const handlePlaybackFinished = useCallback(() => {
    setCurrentPlayingWordIndex(null)
  }, [])

  return (
    <>
      <ArabicWords sentence={{ arabic, english, words }} currentPlayingWordIndex={currentPlayingWordIndex} />

      {(showEng || showTransliteration || showAll) && (
        <Text style={[sharedStyle.englishBody, { color: theme.colors.outline }]} variant="bodyLarge">
          {transliteratedText}
        </Text>
      )}

      {(showEng || showAll) && (
        <Text variant="bodyLarge" style={sharedStyle.englishBody}>
          {english}
        </Text>
      )}

      {(showEng || showTransliteration || showAll) && (
        <>
          <Divider style={{ opacity: 0 }} />
          <PlaySound audioFileNames={fileNames} onPlayingWord={handlePlayingWord} onFinish={handlePlaybackFinished} />
          <Divider style={{ opacity: 0, paddingBottom }} />
        </>
      )}
    </>
  )
}

EnglishArabic.propTypes = {
  paddingBottom: PropTypes.number,
  sentence: PropTypes.shape({
    arabic: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  showAll: PropTypes.bool
}
