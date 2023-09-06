/* eslint-disable unicorn/no-null */
import { useState, useEffect, useCallback } from 'react'
import { Audio } from 'expo-av'

export const useAudioPlayer = () => {
  const [sound, setSound] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const setAudioMode = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true
      })
    }

    setAudioMode()

    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const playSound = useCallback(async (audioFileName, onDidFinish) => {
    const { sound: audioSound } = await Audio.Sound.createAsync(
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
      onDidFinish
    )

    setIsPlaying(true)
    setSound(audioSound)
    await audioSound.playAsync()
  }, [])

  const stopSound = useCallback(async () => {
    if (sound) {
      await sound.stopAsync()
      await sound.unloadAsync()
      setSound(null)
      setIsPlaying(false)
    }
  }, [sound])

  return {
    isPlaying,
    playSound,
    stopSound
  }
}
