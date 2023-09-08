/* eslint-disable unicorn/no-null */
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { Text, useTheme, Divider } from 'react-native-paper'
import { useSelector } from 'react-redux'

import ArabicWords from './arabic-words.js'
import PlaySound from './play-sound.js'
import { transliterateArabicToEnglish } from '../services/utility-service.js'
import { useSharedStyles } from '../styles/common.js'

const isTransliterationOnSelector = (state) => state.isTransliterationOn

export const EnglishArabic = ({ sentence, paddingTop = 0 }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const [currentPlayingWordIndex, setCurrentPlayingWordIndex] = useState(null)
  const { isTransliterationOn } = useSelector(isTransliterationOnSelector)
  const showTransliteration = isTransliterationOn === 'on'

  const transliteratedText = useMemo(() => {
    return transliterateArabicToEnglish(sentence.arabic)
  }, [sentence.arabic])

  const fileNames = sentence.words.map((word) => word.filename)

  const handlePlayingWord = (index) => {
    setCurrentPlayingWordIndex(index)
  }

  const handlePlaybackFinished = () => {
    setCurrentPlayingWordIndex(null)
  }

  return (
    <>
      <ArabicWords sentence={sentence} currentPlayingWordIndex={currentPlayingWordIndex} />

      {showTransliteration && (
        <Text style={{ ...sharedStyle.englishBody, color: theme.colors.outline }} variant="bodyLarge">
          {transliteratedText}
        </Text>
      )}

      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        {sentence.english}
      </Text>

      <Divider style={{ paddingTop, opacity: 0 }} />

      <PlaySound audioFileNames={fileNames} onPlayingWord={handlePlayingWord} onFinish={handlePlaybackFinished} />
    </>
  )
}

EnglishArabic.propTypes = {
  arabic: PropTypes.string.isRequired,
  english: PropTypes.string.isRequired,
  paddingTop: PropTypes.number,
  sentence: PropTypes.shape({
    arabic: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    words: PropTypes.array.isRequired
  })
}
