import React from 'react'
import { render, fireEvent, act } from '@testing-library/react-native'
import { Audio } from 'expo-av'
import PlaySound from './play-sound.js'

jest.mock('expo-av')

describe('PlaySound component', () => {
  const mockAudioFileName = 'https://example.com/audio.mp3'
  const mockButtonText = 'Play'

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('renders the button with the specified text', () => {
    const { getByText } = render(<PlaySound audioFileName={mockAudioFileName} buttonText={mockButtonText} />)
    const button = getByText(mockButtonText)

    expect(button).toBeDefined()
  })

  it('plays the sound when the button is pressed', async () => {
    const mockSoundInstance = {
      playAsync: jest.fn()
    }
    Audio.Sound.createAsync.mockReturnValueOnce({ sound: mockSoundInstance })

    const { getByText } = render(<PlaySound audioFileName={mockAudioFileName} buttonText={mockButtonText} />)
    const button = getByText(mockButtonText)
    await act(async () => {
      fireEvent.press(button)
    })
    expect(mockSoundInstance.playAsync).toHaveBeenCalledTimes(1)
  })

  // unloads the sound when the component is unmounted
  it('unloads the sound when the component is unmounted', async () => {
    const mockSoundInstance = {
      playAsync: jest.fn(),
      unloadAsync: jest.fn()
    }
    Audio.Sound.createAsync.mockReturnValueOnce({ sound: mockSoundInstance })

    const { getByText, unmount } = render(<PlaySound audioFileName={mockAudioFileName} buttonText={mockButtonText} />)
    const button = getByText(mockButtonText)
    await act(async () => {
      fireEvent.press(button)
    })
    unmount()
    expect(mockSoundInstance.unloadAsync).toHaveBeenCalledTimes(1)
  })

  // expect to call Audio.Sound.createAsync with the correct arguments
  it('calls Audio.Sound.createAsync with the correct arguments', async () => {
    const mockSoundInstance = {
      playAsync: jest.fn(),
      unloadAsync: jest.fn()
    }
    Audio.Sound.createAsync.mockReturnValueOnce({ sound: mockSoundInstance })

    const { getByText } = render(<PlaySound audioFileName={mockAudioFileName} buttonText={mockButtonText} />)
    const button = getByText(mockButtonText)
    await act(async () => {
      fireEvent.press(button)
    })
    expect(Audio.Sound.createAsync).toHaveBeenCalledTimes(1)
    expect(Audio.Sound.createAsync).toHaveBeenCalledWith(
      { uri: mockAudioFileName },
      {
        shouldPlay: true,
        rate: 1,
        shouldCorrectPitch: true,
        isLoopingIOS: false,
        isMutedIOS: false,
        isPlaybackAllowed: true,
        volume: 1,
        isMuted: false,
        isLooping: false
      }
    )
  })
})
