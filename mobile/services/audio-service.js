import * as React from 'react'
import { Button, Text } from 'react-native-paper'
import { Audio } from 'expo-av'
import { StyleSheet } from 'react-native'

// This is more of a component than a server and might be better placed in the components folder
export default function PlaySound(props) {
  const [sound, setSound] = React.useState()

  const style = StyleSheet.create({
    vocabulary: {
      opacity: 0.3
    },
    showWordsButton: {
      paddingBottom: 25,
      paddingHorizontal: 75,
      paddingTop: 7
    }
  })

  async function playSound() {
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
        rate: 1.0,
        shouldCorrectPitch: false,
        volume: 1.0,
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
    <Button onPress={playSound} style={style.showWordsButton} mode="text">
      <Text variant="labelSmall" style={style.vocabulary}>
        PLAY SENTENCE
      </Text>
    </Button>
  )
}
