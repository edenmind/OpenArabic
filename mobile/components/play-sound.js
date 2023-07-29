import * as React from 'react'
import { Button } from 'react-native-paper'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

// This is more of a component than a server and might be better placed in the components folder
export default function PlaySound({ audioFileNames, buttonText }) {
  const [sound, setSound] = React.useState()

  const styles = StyleSheet.create({
    button: {
      marginBottom: 10,
      marginTop: 10
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
        isMutedIOS: false
      },
      (status) => {
        if (status.didJustFinish) {
          sound.unloadAsync()
        }
      }
    )

    setSound(sound)

    return new Promise((resolve) => {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          resolve()
        }
      })

      sound.playAsync()
    })
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <Button onPress={playAllSounds} mode="elevated" style={styles.button} icon={'play'}>
      {buttonText}
    </Button>
  )
}

PlaySound.propTypes = {
  audioFileNames: PropTypes.array.isRequired,
  buttonText: PropTypes.string.isRequired
}
