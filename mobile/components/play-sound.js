import * as React from 'react'
import { Button, Text, useTheme } from 'react-native-paper'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useSharedStyles } from '../styles/common.js'

// This is more of a component than a server and might be better placed in the components folder
// eslint-disable-next-line putout/destructuring-as-function-argument
export default function PlaySound({
  audioFileNames,
  buttonText,
  mode = 'elevated',
  margin = 10,
  answerButton = false
}) {
  const [sound, setSound] = React.useState()

  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  // function that loops over audioFileName that is an array and calls playSound with the should that should be played
  const playAllSounds = async () => {
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
        if (status.didJustFinish) {
          sound.unloadAsync()
        }
      }
    )

    setSound(sound)

    // This will override the silent switch on iOS
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true
    })

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
    <>
      {answerButton ? (
        <Button onPress={playAllSounds} style={{ ...sharedStyle.buttonAnswer }}>
          <Text
            style={{
              ...sharedStyle.answerText,
              fontSize: 20
            }}
          >
            {buttonText}
          </Text>
        </Button>
      ) : (
        <Button onPress={playAllSounds} style={{ ...sharedStyle.buttonAnswer }}>
          <Text
            style={{
              ...sharedStyle.answerText,
              fontSize: 20,
              lineHeight: undefined
            }}
          >
            {buttonText}
          </Text>
        </Button>
      )}
    </>
  )
}

PlaySound.propTypes = {
  answerButton: PropTypes.bool,
  mode: PropTypes.string,
  audioFileNames: PropTypes.any.isRequired,
  buttonText: PropTypes.string.isRequired,
  margin: PropTypes.number
}
