/* eslint-disable unicorn/no-null */
import PropTypes from 'prop-types'
import React, { useState, useCallback } from 'react'
import { Text, useTheme, Divider, Surface } from 'react-native-paper'

import ArabicWords from './arabic-words.js'
import PlaySound from './play-sound.js'
import { useSharedStyles } from '../styles/common.js'

export const EnglishArabic = ({ sentence: { arabic, english, words = [] } = {}, paddingBottom = 45 }) => {
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
    <Surface
      style={{
        backgroundColor: theme.colors.elevation.level0,
        flex: 1,
        justifyContent: 'center'
      }}
    >
      <ArabicWords sentence={{ arabic, english, words }} currentPlayingWordIndex={currentPlayingWordIndex} />
      <Divider style={sharedStyle.dividerHidden} />
      <Text variant="bodyLarge" style={[sharedStyle.englishBody, { color: theme.colors.secondary }]}>
        {english.charAt(0).toUpperCase() + english.slice(1)}
      </Text>
      <>
        <Divider style={{ opacity: 0, paddingTop: 25 }} />
        <PlaySound audioFileNames={fileNames} onPlayingWord={handlePlayingWord} onFinish={handlePlaybackFinished} />
        <Divider style={{ opacity: 0, paddingBottom }} />
      </>
    </Surface>
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
  }).isRequired
}
