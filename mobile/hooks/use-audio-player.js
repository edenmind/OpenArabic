/* eslint-disable nonblock-statement-body-position */
/* eslint-disable unicorn/no-null */
import { Audio } from 'expo-av'
import { useState, useEffect, useCallback } from 'react'

export const useAudioPlayer = () => {
  const [sound, setSound] = useState(null)

  useEffect(() => {
    const cleanupSound = () => {
      if (sound) {
        sound.unloadAsync()
      }
    }

    const initializeAudioMode = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true
      })
    }

    initializeAudioMode()

    return () => {
      cleanupSound()
    }
  }, [sound])

  const playSound = useCallback(async (audioFileName, onDidFinishCallback) => {
    try {
      const audioSettings = {
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
      }

      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: audioFileName },
        audioSettings,
        onDidFinishCallback
      )

      setSound(audioSound)

      await audioSound.playAsync()
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }, [])

  const stopSound = useCallback(async () => {
    if (!sound) return

    await sound.stopAsync()
    await sound.unloadAsync()

    setSound(null)
  }, [sound])

  return {
    playSound,
    stopSound
  }
}
