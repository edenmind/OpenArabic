/* eslint-disable unicorn/no-null */
import PropTypes from 'prop-types'
import React, { useState, useCallback } from 'react'
import { Text, useTheme, Divider } from 'react-native-paper'

import ArabicWords from './arabic-words.js'
import PlaySound from './play-sound.js'
import { useSharedStyles } from '../styles/common.js'

export const EnglishArabic = ({
  sentence: { arabic, english, words = [] } = {},
  isPlaying,
  setIsPlaying,
  showRepeat,
  setShowRepeat
}) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const [currentPlayingWordIndex, setCurrentPlayingWordIndex] = useState(null)

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
      <Divider style={sharedStyle.dividerHidden} />
      <Text variant="bodyLarge" style={[sharedStyle.englishBody, { color: theme.colors.secondary }]}>
        {showRepeat && english.charAt(0).toUpperCase() + english.slice(1)}
      </Text>
      <>
        <PlaySound
          audioFileNames={fileNames}
          onPlayingWord={handlePlayingWord}
          onFinish={handlePlaybackFinished}
          isPlaying={isPlaying}
          showRepeat={showRepeat}
          setIsPlaying={setIsPlaying}
          setShowRepeat={setShowRepeat}
        />
      </>
    </>
  )
}

EnglishArabic.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
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
  setIsPlaying: PropTypes.func.isRequired,
  setShowRepeat: PropTypes.func.isRequired,
  showRepeat: PropTypes.bool.isRequired
}
