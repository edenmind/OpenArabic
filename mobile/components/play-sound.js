import * as React from 'react'
import { Button } from 'react-native-paper'
import { Audio } from 'expo-av'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import * as Haptics from 'expo-haptics'

// This is more of a component than a server and might be better placed in the components folder
export default function PlaySound(props) {
  const [sound, setSound] = React.useState()

  const style = StyleSheet.create({
    showWordsButton: {
      marginTop: 10
    }
  })

  async function playSound() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: true,
      playsInSilentModeIOS: true
    })

    // TODO: let the backend construct the entire URL
    const url = 'https://openarabic.ams3.digitaloceanspaces.com/audio/' + props.audioFileName

    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
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
    <Button onPress={playSound} style={style.showWordsButton} mode="elevated">
      {props.buttonText}
    </Button>
  )
}

PlaySound.propTypes = {
  audioFileName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
}
