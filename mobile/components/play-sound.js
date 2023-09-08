/* eslint-disable nonblock-statement-body-position */
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Text, useTheme } from 'react-native-paper'

import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { useSharedStyles } from '../styles/common.js'

export default function PlaySound({ audioFileNames, onPlayingWord, onFinish }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const { playSound, stopSound } = useAudioPlayer()
  const [isPlaying, setIsPlaying] = useState(false)

  const silentBorderColor = theme.colors.elevation.level5
  const playingBorderColor = theme.colors.primary

  const handleSoundFinish = (status) => {
    if (status.didJustFinish && !Array.isArray(audioFileNames)) {
      stopSound()
    }
  }

  const handleSequenceFinish = () => {
    if (!onFinish) {
      return
    }

    setIsPlaying(false)
    stopSound()
    onFinish()
  }

  const playSounds = async () => {
    setIsPlaying(!isPlaying)

    if (isPlaying) {
      stopSound()
      return
    }

    if (Array.isArray(audioFileNames)) {
      let currentIndex = 0

      const playNextSound = async () => {
        if (currentIndex >= audioFileNames.length) {
          handleSequenceFinish()
          return
        }

        const audioFileName = audioFileNames[currentIndex]
        await playSound(audioFileName, (status) => {
          if (status.didJustFinish) {
            currentIndex++
            playNextSound()
          }
        })

        if (onPlayingWord) {
          onPlayingWord(currentIndex)
        }
      }

      playNextSound()
      return
    }

    await playSound(audioFileNames, handleSoundFinish)
  }

  return (
    <Button
      onPress={playSounds}
      style={{
        ...sharedStyle.buttonAnswer,
        borderColor: isPlaying ? playingBorderColor : silentBorderColor
      }}
    >
      <Text style={{ ...sharedStyle.answerText }}>{isPlaying ? 'Stop' : 'Play'}</Text>
    </Button>
  )
}

PlaySound.propTypes = {
  audioFileNames: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  onPlayingWord: PropTypes.func,
  onFinish: PropTypes.func
}
