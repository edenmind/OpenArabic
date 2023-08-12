import * as React from 'react'
import { Button } from 'react-native-paper'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'
import { StyleSheet, Platform } from 'react-native'

// This is more of a component than a server and might be better placed in the components folder
export default function PlaySound({ audioFileNames, buttonText, mode = 'elevated', margin = 10 }) {
  const [sound, setSound] = React.useState()

  const styles = StyleSheet.create({
    button: {
      marginBottom: margin,
      marginTop: margin
    }
  })

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
    <Button onPress={playAllSounds} mode={mode} style={styles.button} icon={'play'}>
      {buttonText}
    </Button>
  )
}

PlaySound.propTypes = {
  mode: PropTypes.string,
  audioFileNames: PropTypes.any.isRequired,
  buttonText: PropTypes.string.isRequired,
  margin: PropTypes.number
}
