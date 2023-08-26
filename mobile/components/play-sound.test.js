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

  it('renders the button with the specified text', async () => {
    // const { getByText } = render(<PlaySound audioFileNames={mockAudioFileName} buttonText={mockButtonText} />)
    // const button = getByText(mockButtonText)
    // expect(button).toBeDefined()
  })
})
