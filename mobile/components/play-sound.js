import React from 'react'
import PropTypes from 'prop-types'
import { Button, Text, useTheme } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import { capitalizeFirstLetter } from '../services/utility-service.js'
import { useAudioPlayer } from '../hooks/use-audio-player.js'

export default function PlaySound({ audioFileNames, buttonText, onPlayingWord, onFinish }) {
  const { isPlaying, playSound: playSingleSound, stopSound } = useAudioPlayer()
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const playAllSounds = async () => {
    // If a sound is playing, stop it
    if (isPlaying) {
      stopSound()
      return
    }

    if (Array.isArray(audioFileNames)) {
      let currentIndex = 0

      const playNextSound = async () => {
        if (currentIndex >= audioFileNames.length) {
          if (onFinish) {
            onFinish()
          }

          return
        }

        const audioFileName = audioFileNames[currentIndex]

        await playSingleSound(audioFileName, (status) => {
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

    await playSingleSound(audioFileNames, (status) => {
      if (status.didJustFinish) {
        stopSound()
      }
    })
  }

  return (
    <Button
      onPress={playAllSounds}
      style={{
        ...sharedStyle.buttonAnswer,
        borderColor: isPlaying ? theme.colors.primary : theme.colors.elevation.level5
      }}
    >
      <Text style={{ ...sharedStyle.answerText, fontSize: buttonText.length > 25 ? 20 : 23 }}>
        {isPlaying ? 'Stop' : capitalizeFirstLetter(buttonText)}
      </Text>
    </Button>
  )
}

PlaySound.propTypes = {
  audioFileNames: PropTypes.any.isRequired,
  buttonText: PropTypes.string.isRequired,
  onPlayingWord: PropTypes.func,
  onFinish: PropTypes.func
}
