/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-redux/useSelector-prefer-selectors */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable unicorn/no-null */
import { Audio } from 'expo-av'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const audioSelector = (state) => state.audio

export const useAudioPlayer = () => {
  const [sound, setSound] = useState(null)
  const [isSoundLoaded, setIsSoundLoaded] = useState(false)
  const { shouldPlay } = useSelector(audioSelector)
  const [shouldStop, setShouldStop] = useState(false)

  let currentRequestId = 0

  useEffect(() => {
    if (shouldPlay) {
      setShouldStop(false)
      setIsSoundLoaded(true)
      return
    }
    setSound(null)
    setIsSoundLoaded(false)
    setShouldStop(true)
  }, [shouldPlay, sound])

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

  async function playSound(audioFileName, onDidFinishCallback) {
    //return if audioFileName is undefined
    if (!audioFileName) return

    // return if audioFileName is the same as the current sound
    if (sound && sound._uri === audioFileName) return

    // return if audioFileName does not end with .mp3
    if (!audioFileName.endsWith('.mp3')) return

    currentRequestId++
    const thisRequestId = currentRequestId

    try {
      const audioSettings = {
        isLooping: false,
        isLoopingIOS: false,
        isMuted: false,
        isMutedIOS: false,
        isPlaybackAllowed: true,
        playsInSilentModeIOS: true,
        rate: 1,
        shouldPlay: true,
        volume: 1
      }

      const { sound: audioSound } = await Audio.Sound.createAsync(
        { uri: audioFileName },
        audioSettings,
        onDidFinishCallback
      )

      if (thisRequestId !== currentRequestId) {
        // Another sound request was made while this was loading, so ignore this one
        await audioSound.unloadAsync()
        return
      }

      setSound(audioSound)
      setIsSoundLoaded(true)

      if (audioSound._loaded && !audioSound._playing && !shouldStop) {
        await audioSound.playAsync()
      }
    } catch (error) {
      console.error('Error playing sound:', audioFileName)
      console.error('Error playing:', error)
    }
  }

  const stopSound = async () => {
    if (sound) {
      try {
        await sound.stopAsync()
        await sound.unloadAsync()
        sound.setOnPlaybackStatusUpdate(null)
      } catch (error) {
        console.error('Error stopping sound:', error)
      } finally {
        // Update the state in the finally block to ensure it's executed regardless of success or error
        setSound(null)
        setIsSoundLoaded(false)
      }
    }
  }

  const isLoaded = () => {
    return isSoundLoaded
  }

  return {
    isLoaded,
    playSound,
    stopSound
  }
}
