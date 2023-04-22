import * as React from 'react'
import { Button } from 'react-native-paper'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

// This is more of a component than a server and might be better placed in the components folder
export default function PlaySound({ audioFileName, buttonText }) {
  const [sound, setSound] = React.useState()

  const styles = StyleSheet.create({
    button: {
      marginBottom: 10,
      marginTop: 10
    }
  })

  const playSound = React.useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioFileName },
      {
        shouldPlay: true,
        rate: 1,
        shouldCorrectPitch: false,
        volume: 1,
        isMuted: false,
        isLooping: false,
        isPlaybackAllowed: true,
        isLoopingIOS: false,
        isMutedIOS: false
      }
    )

    setSound(sound)
    await sound.playAsync()
  }, [audioFileName])

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <Button onPress={playSound} mode="elevated" style={styles.button} icon={'play'}>
      {buttonText}
    </Button>
  )
}

PlaySound.propTypes = {
  audioFileName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
}
