/* eslint-disable react-redux/useSelector-prefer-selectors */
import 'react-native-gesture-handler'

import * as Haptics from 'expo-haptics'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useTheme, Button, Text } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import { TextPracticeReview } from './text-practice-review.js'
import TextPracticeHeading from './text-practice-setup-sections.js'
import TextPractice from './text-practice.js'
import { ButtonAction } from '../components/button-action.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import { UI } from '../constants/ui.js'
import { useSharedStyles } from '../styles/common.js'

export default function TextPracticeSetup() {
  const { text } = useSelector((state) => state.text)
  const dispatch = useDispatch()
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const [practiceOrPreviewVisible, setPracticeOrPreviewVisible] = useState(false)
  const [content, setContent] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showRepeat, setShowRepeat] = useState(true)
  const [closeText, setCloseText] = useState(UI.stop)

  const [isListeningEnabled, setIsListeningEnabled] = React.useState(true)
  const [isReadingEnabled, setIsReadingEnabled] = React.useState(true)
  const [isVocabularyEnabled, setIsVocabularyEnabled] = React.useState(true)

  // Close the modal and stop audio if playing
  const handleClosePracticeModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    setPracticeOrPreviewVisible(false)
    setIsPlaying(false)
    dispatch({ payload: false, type: 'SET_AUDIO' })
    dispatch({ payload: false, type: 'SET_AUDIO_SHOULD_PLAY_READING' })
    dispatch({ payload: false, type: 'SET_AUDIO_SHOULD_PLAY_VOCABULARY' })
    dispatch({ payload: false, type: 'SET_AUDIO_SHOULD_PLAY_LISTENING' })
  }

  // Start the practice and open the modal with practice content
  const handleStartPractice = () => {
    setContent(
      <TextPractice
        isListeningEnabled={isListeningEnabled}
        isReadingEnabled={isReadingEnabled}
        isVocabularyEnabled={isVocabularyEnabled}
      />
    )
    setCloseText(UI.stop)
    setPracticeOrPreviewVisible(true)
    setIsPlaying(true)
    dispatch({ payload: true, type: 'SET_AUDIO' })
  }

  // Open the modal with the preview content
  const handleOpenPreview = () => {
    setPracticeOrPreviewVisible(true)
    setCloseText(UI.close)
    setContent(
      <TextPracticeReview
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setShowRepeat={setShowRepeat}
        showRepeat={showRepeat}
        text={text}
      />
    )
  }

  return (
    <>
      <TextPracticeHeading
        heading={text}
        isListeningEnabled={isListeningEnabled}
        isReadingEnabled={isReadingEnabled}
        isVocabularyEnabled={isVocabularyEnabled}
        setIsListeningEnabled={setIsListeningEnabled}
        setIsReadingEnabled={setIsReadingEnabled}
        setIsVocabularyEnabled={setIsVocabularyEnabled}
      />
      <View style={sharedStyle.container}>
        <Button onPress={handleOpenPreview} style={sharedStyle.buttonAnswer}>
          <Text style={sharedStyle.actionTextPrimary}>{UI.preview.toUpperCase()}</Text>
        </Button>
        <ButtonAction onPress={handleStartPractice} text={UI.practice.toUpperCase()} />
      </View>
      <ModalScrollView
        visible={practiceOrPreviewVisible}
        content={content}
        hideModal={handleClosePracticeModal}
        closeText={closeText}
      />
    </>
  )
}
