/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable nonblock-statement-body-position */
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useState, useCallback } from 'react'
import { Button, Text, useTheme } from 'react-native-paper'

import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { useSharedStyles } from '../styles/common.js'

export default function PlaySound({ audioFileNames, onPlayingWord, onFinish }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const IS_PLAYING = true

  const { playSound, stopSound } = useAudioPlayer()
  const [isPlaying, setIsPlaying] = useState(false)
  const buttonText = isPlaying ? 'STOP' : 'PLAY'

  const silentBorderColor = theme.colors.elevation.level5
  const playingBorderColor = theme.colors.primary

  const handleSoundFinish = (status) => {
    if (status.didJustFinish && typeof audioFileNames === 'string') {
      setIsPlaying(false)
      stopSound()
    }
  }

  const handleSequenceFinish = useCallback(() => {
    if (!onFinish) return

    setIsPlaying(!IS_PLAYING)
    stopSound()
    onFinish()
  }, [IS_PLAYING, onFinish, stopSound])

  const playSounds = useCallback(async () => {
    // Cancel flag for cleanup
    let isCancelled = false

    // If sound is playing, stop it
    if (isPlaying) {
      stopSound()
      setIsPlaying(false)
      return
    }

    // Provide haptic feedback for the start of playback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    // Set the state to playing
    setIsPlaying(true)

    // Play a sequence of sounds if provided as an array
    if (Array.isArray(audioFileNames)) {
      let currentIndex = 0

      const playNextSound = async () => {
        // If the component was unmounted or the sound was stopped, bail out
        if (isCancelled || currentIndex >= audioFileNames.length) {
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

          // Call the onPlayingWord callback, if provided
          if (onPlayingWord) onPlayingWord(currentIndex)
        } catch (error) {
          console.error('Error playing sound:', error)
        }
      }

      // Start the sequence
      playNextSound()
      return
    }

    // Play a single sound
    try {
      await playSound(audioFileNames, handleSoundFinish)
    } catch (error) {
      console.error('Error playing sound:', error)
    }

    return () => {
      isCancelled = true
      if (isPlaying) {
        stopSound()
      }
    }
  }, [audioFileNames, handleSoundFinish, handleSequenceFinish, isPlaying, onPlayingWord, playSound, stopSound])

  return (
    <Button
      onPress={playSounds}
      style={{
        ...sharedStyle.buttonAnswer,
        borderColor: isPlaying ? playingBorderColor : silentBorderColor
      }}
    >
      <Text style={{ ...sharedStyle.actionTextPrimary }}>{buttonText}</Text>
    </Button>
  )
}

PlaySound.propTypes = {
  audioFileNames: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  onFinish: PropTypes.func,
  onPlayingWord: PropTypes.func
}
