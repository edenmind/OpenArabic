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

export const EnglishArabic = ({ sentence: { arabic, english, words = [] } = {}, paddingTop = 0 }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const [currentPlayingWordIndex, setCurrentPlayingWordIndex] = useState(null)
  const { isTransliterationOn } = useSelector(isTransliterationOnSelector)
  const showTransliteration = isTransliterationOn === 'on'

  const transliteratedText = useMemo(() => transliterateArabicToEnglish(arabic), [arabic])

  const fileNames = words.map((word) => word.filename)

  const handlePlayingWord = useCallback((index) => {
    setCurrentPlayingWordIndex(index)
  }, [])

  const handlePlaybackFinished = useCallback(() => {
    setCurrentPlayingWordIndex(null)
  }, [])

  return (
    <>
      <ArabicWords sentence={{ arabic, english, words }} currentPlayingWordIndex={currentPlayingWordIndex} />

      {showTransliteration && (
        <Text style={{ ...sharedStyle.englishBody, color: theme.colors.outline }} variant="bodyLarge">
          {transliteratedText}
        </Text>
      )}

      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        {english}
      </Text>

      <Divider style={{ opacity: 0, paddingTop }} />

      <PlaySound audioFileNames={fileNames} onPlayingWord={handlePlayingWord} onFinish={handlePlaybackFinished} />
    </>
  )
}

EnglishArabic.propTypes = {
  paddingTop: PropTypes.number,
  sentence: PropTypes.shape({
    arabic: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string.isRequired
      })
    )
  }).isRequired
}

export default EnglishArabic
