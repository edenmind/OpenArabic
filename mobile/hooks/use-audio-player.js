/* eslint-disable nonblock-statement-body-position */
/* eslint-disable unicorn/no-null */
import { Audio } from 'expo-av'
import { useState, useEffect, useCallback } from 'react'

export const useAudioPlayer = () => {
  const [sound, setSound] = useState(null)
  const [isSoundLoaded, setIsSoundLoaded] = useState(false)

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

  const playSound = useCallback(
    async (audioFileName, onDidFinishCallback) => {
      //return if audioFileName is undefined
      if (!audioFileName) return

      // return if audioFileName is the same as the current sound
      if (sound && sound._uri === audioFileName) return

      // return if audioFileName does not end with .mp3
      if (!audioFileName.endsWith('.mp3')) return

      try {
        const audioSettings = {
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          isLooping: false,
          isLoopingIOS: false,
          isMuted: false,
          isMutedIOS: false,
          isPlaybackAllowed: true,
          playsInSilentModeIOS: true,
          rate: 1,
          shouldCorrectPitch: true,
          shouldPlay: true,
          volume: 1
        }

        const { sound: audioSound } = await Audio.Sound.createAsync(
          { uri: audioFileName },
          audioSettings,
          onDidFinishCallback
        )

        setSound(audioSound)
        setIsSoundLoaded(true)

        if (audioSound._loaded && !audioSound._playing) {
          await audioSound.playAsync()
        }
      } catch (error) {
        console.log('Error playing sound:', audioFileName)
        console.error('Error playing:', error)
      }
    },
    [sound]
  )

  const stopSound = useCallback(async () => {
    if (!sound) return

    const status = await sound.getStatusAsync()
    if (!status.isLoaded) return

    await sound.stopAsync()
    await sound.unloadAsync()

    setSound(null)
    setIsSoundLoaded(false)
  }, [sound])

  const isLoaded = useCallback(() => {
    return isSoundLoaded
  }, [isSoundLoaded])

  return {
    isLoaded,
    playSound,
    stopSound
  }
}
