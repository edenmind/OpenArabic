import * as React from 'react'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'
import { Button, Text, useTheme } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import { useState } from 'react'
import { capitalizeFirstLetter } from '../services/utility-service.js'

// eslint-disable-next-line putout/destructuring-as-function-argument
export default function PlaySound({ audioFileNames, buttonText }) {
  const [sound, setSound] = React.useState()
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [color, setColor] = useState(theme.colors.elevation.level5)
  const [isPlaying, setIsPlaying] = useState(false)

  const playAllSounds = async () => {
    // Check if sound is playing
    if (sound?._loaded) {
      await sound.stopAsync()
      await sound.unloadAsync()
      setSound()
      setColor(theme.colors.elevation.level5)
      setIsPlaying(false) // Update isPlaying state when sound is stopped manually
      return
    }

    if (Array.isArray(audioFileNames)) {
      for (const audioFileName of audioFileNames) {
        await playSound(audioFileName)
      }
    } else {
      await playSound(audioFileNames)
    }
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

    // This will override the silent switch on iOS
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true
    })

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
    <Button onPress={playAllSounds} style={{ ...sharedStyle.buttonAnswer, borderColor: color }}>
      <Text style={{ ...sharedStyle.answerText, fontSize: buttonText.length > 25 ? 20 : 23 }}>
        {isPlaying ? 'Stop' : capitalizeFirstLetter(buttonText)}
      </Text>
    </Button>
  )
}

PlaySound.propTypes = {
  audioFileNames: PropTypes.any.isRequired,
  buttonText: PropTypes.string.isRequired
}
