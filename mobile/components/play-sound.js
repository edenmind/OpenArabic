/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable nonblock-statement-body-position */
import PropTypes from 'prop-types'
import React, { useState, useCallback, useEffect } from 'react'
import { Button, Text, useTheme } from 'react-native-paper'

import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { useSharedStyles } from '../styles/common.js'

export default function PlaySound({ audioFileNames, onPlayingWord, onFinish }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const IS_PLAYING = true

  const { isLoaded, playSound, stopSound } = useAudioPlayer()
  const [isPlaying, setIsPlaying] = useState(false)
  const buttonText = isPlaying ? 'Stop' : 'Play'

  const silentBorderColor = theme.colors.elevation.level5
  const playingBorderColor = theme.colors.primary

  const handleSoundFinish = useCallback(
    (status) => {
      if (status.didJustFinish && !Array.isArray(audioFileNames)) {
        setIsPlaying(false) // Ensure isPlaying is set to false for a single sound.
        stopSound()
      }
    },
    [audioFileNames, stopSound]
  )

  const handleSequenceFinish = useCallback(() => {
    if (!onFinish) return

    setIsPlaying(!IS_PLAYING)
    stopSound()
    onFinish()
  }, [IS_PLAYING, onFinish, stopSound])

  const playSounds = useCallback(async () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying)

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
        try {
          await playSound(audioFileName, (status) => {
            if (status.didJustFinish) {
              currentIndex++
              playNextSound()
            }
          })

          if (onPlayingWord) onPlayingWord(currentIndex)
        } catch (error) {
          console.error('Error playing sound:', error)
        }
      }

      playNextSound()
      return
    }

    try {
      await playSound(audioFileNames, handleSoundFinish)
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }, [audioFileNames, handleSoundFinish, handleSequenceFinish, isPlaying, onPlayingWord, playSound, stopSound])

  useEffect(() => {
    return () => {
      if (isPlaying && isLoaded()) stopSound() // Ensure sound is loaded before trying to stop it
    }
  }, [isPlaying, stopSound])

  return (
    <Button
      onPress={playSounds}
      style={{
        ...sharedStyle.buttonAnswer,
        borderColor: isPlaying ? playingBorderColor : silentBorderColor
      }}
    >
      <Text style={{ ...sharedStyle.answerText }}>{buttonText}</Text>
    </Button>
  )
}

PlaySound.propTypes = {
  audioFileNames: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  onFinish: PropTypes.func,
  onPlayingWord: PropTypes.func
}
