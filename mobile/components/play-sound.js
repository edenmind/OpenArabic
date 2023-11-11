/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable nonblock-statement-body-position */
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'
import { Button, Text, useTheme } from 'react-native-paper'

import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { useSharedStyles } from '../styles/common.js'
import { useSelector, useDispatch } from 'react-redux'
import { UI } from '../constants/ui.js'

const audioSelector = (state) => state.audio

export default function PlaySound({
  autoStart,
  audioFileNames,
  onPlayingWord,
  onFinish,
  isPlaying,
  setIsPlaying,
  showRepeat,
  showPlay,
  setShowRepeat
}) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const { playSound, stopSound } = useAudioPlayer()
  const buttonText = isPlaying ? UI.stop.toUpperCase() : UI.play.toUpperCase()

  const isCancelled = useRef(false)

  const silentBorderColor = theme.colors.elevation.level5
  const playingBorderColor = theme.colors.primary

  const { shouldPlay } = useSelector(audioSelector)

  const dispatch = useDispatch()

  const handleSoundFinish = (status) => {
    if (status.didJustFinish && typeof audioFileNames === 'string') {
      setIsPlaying(false)
      stopSound()
    }
  }

  const handleSequenceFinish = () => {
    if (!onFinish) return

    setIsPlaying(false)
    setShowRepeat(true)
    stopSound()
    onFinish()
  }

  // start playSounds when component is mounted
  useEffect(() => {
    if (autoStart) {
      playSounds()
    }
  }, [])

  useEffect(() => {
    isCancelled.current = shouldPlay ? false : true
  }, [shouldPlay])

  const playSounds = async () => {
    dispatch({ payload: true, type: 'SET_AUDIO' })

    // Provide haptic feedback for the start of playback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    // If sound is playing, stop it
    if (isPlaying) {
      isCancelled.current = true
      stopSound()
      setIsPlaying(false)
      dispatch({ payload: false, type: 'SET_AUDIO' })
      return
    }

    // Set the state to playing
    setIsPlaying(true)

    // Play a sequence of sounds if provided as an array
    if (Array.isArray(audioFileNames)) {
      let currentIndex = 0

      isCancelled.current = false

      const playNextSound = async () => {
        // If the component was unmounted or the sound was stopped, bail out
        if (isCancelled.current || currentIndex >= audioFileNames.length) {
          handleSequenceFinish()
          return
        }

        const audioFileName = audioFileNames[currentIndex]
        try {
          await playSound(audioFileName, async (status) => {
            if (!status.didJustFinish) {
              return
            }
            currentIndex++
            await new Promise((resolve) => setTimeout(resolve, 500))

            playNextSound()
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
      // eslint-disable-next-line no-const-assign
      isCancelled = true
      if (isPlaying) {
        stopSound()
      }
    }
  }

  return (
    (showRepeat || showPlay) && (
      <Button
        onPress={playSounds}
        style={{
          width: '100%',
          ...sharedStyle.buttonAnswer,
          borderColor: isPlaying ? playingBorderColor : silentBorderColor,
          marginBottom: 50
        }}
      >
        <Text style={{ ...sharedStyle.actionTextPrimary }}>{buttonText}</Text>
      </Button>
    )
  )
}

PlaySound.propTypes = {
  audioFileNames: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  autoStart: PropTypes.bool,
  isPlaying: PropTypes.bool,
  onFinish: PropTypes.func,
  onPlayingWord: PropTypes.func,
  setIsPlaying: PropTypes.func,
  setShowRepeat: PropTypes.func,
  showPlay: PropTypes.bool,
  showRepeat: PropTypes.bool
}
