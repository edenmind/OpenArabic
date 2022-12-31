import * as React from 'react'
import { Button } from 'react-native-paper'
import { Audio } from 'expo-av'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'

// This is more of a component than a server and might be better placed in the components folder
export default function PlaySound(props) {
  const [sound, setSound] = React.useState()
  const sharedStyle = useSharedStyles()

  async function playSound() {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: true,
      playsInSilentModeIOS: true
    })

    const { sound } = await Audio.Sound.createAsync(
      { uri: props.audioFileName },
      {
        shouldPlay: true,
        rate: 1,
        shouldCorrectPitch: false,
        volume: 1,
        isMuted: false,
        isLooping: false
      }
    )

    setSound(sound)

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
    <Button onPress={playSound} style={sharedStyle.button} mode="elevated">
      {props.buttonText}
    </Button>
  )
}

PlaySound.propTypes = {
  audioFileName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
}
