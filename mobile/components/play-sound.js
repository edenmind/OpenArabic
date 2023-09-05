/* eslint-disable unicorn/no-null */
import * as React from 'react'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'
import { Button, Text, useTheme } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import { useState } from 'react'
import { capitalizeFirstLetter } from '../services/utility-service.js'

// eslint-disable-next-line putout/destructuring-as-function-argument
export default function PlaySound({ audioFileNames, buttonText, onPlayingWord, onFinish }) {
  const [sound, setSound] = React.useState()
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [color, setColor] = useState(theme.colors.elevation.level5)
  const [isPlaying, setIsPlaying] = useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;async () => {
      // This will override the silent switch on iOS
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true
      })
    }
  }, [])

  const playAllSounds = async () => {
    // Check if sound is playing
    if (sound?._loaded) {
      await sound.stopAsync()
      await sound.unloadAsync()
      setSound(null)
      setColor(theme.colors.elevation.level5)
      setIsPlaying(false) // Update isPlaying state when sound is stopped manually
      return
    }

    if (Array.isArray(audioFileNames)) {
      let currentIndex = 0

      const playNextSound = async () => {
        if (currentIndex >= audioFileNames.length) {
          setIsPlaying(false) // Set isPlaying to false when all sounds have finished

          if (onFinish) {
            onFinish() // Signal that all sounds are finished
          }

          return // Exit if all sounds have been played
        }

        const audioFileName = audioFileNames[currentIndex]

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioFileName },
          {
            shouldPlay: true,
            rate: 1,
            shouldCorrectPitch: true,
            volume: 1,
            isMuted: false,
            isLooping: false,
            isPlaybackAllowed: true,
            isLoopingIOS: false,
            isMutedIOS: false,
            playsInSilentModeIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX
          },
          (status) => {
            if (status.didJustFinish) {
              newSound.unloadAsync() // Unload the sound instance
              currentIndex++ // Increase index for next sound
              playNextSound() // Recursive call to play next sound
            }
          }
        )

        // Signal which word is playing, if provided in props
        if (onPlayingWord) {
          onPlayingWord(currentIndex)
        }

        setIsPlaying(true) // Set isPlaying to true when a sound starts
        setSound(newSound)
        await newSound.playAsync()
      }

      playNextSound() // Kick off the recursive playing
      return
    }

    await playSound(audioFileNames)
  }

  const playSound = async (audioFileName) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioFileName },
      {
        shouldPlay: true,
        rate: 1,
        shouldCorrectPitch: true,
        volume: 1,
        isMuted: false,
        isLooping: false,
        isPlaybackAllowed: true,
        isLoopingIOS: false,
        isMutedIOS: false,
        playsInSilentModeIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX
      },
      (status) => {
        if (!status.didJustFinish) {
          return
        }

        sound.unloadAsync()
        setColor(theme.colors.elevation.level5)
        setIsPlaying(false) // Update isPlaying state when sound stops
      }
    )

    setSound(sound)

    setColor(theme.colors.primary)
    setIsPlaying(true) // Update isPlaying state when sound starts
    await sound.playAsync()
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

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
