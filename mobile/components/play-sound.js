import * as React from 'react'
import { Audio } from 'expo-av'
import PropTypes from 'prop-types'
import { AnswerButton } from './answer-button.js'

// eslint-disable-next-line putout/destructuring-as-function-argument
export default function PlaySound({ audioFileNames, buttonText }) {
  const [sound, setSound] = React.useState()

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

  return <AnswerButton onPress={playAllSounds} text={buttonText} haptic={true} />
}

PlaySound.propTypes = {
  audioFileNames: PropTypes.any.isRequired,
  buttonText: PropTypes.string.isRequired
}
