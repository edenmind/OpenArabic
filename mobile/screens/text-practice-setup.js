/* eslint-disable react-redux/useSelector-prefer-selectors */
import 'react-native-gesture-handler'

import React, { useState } from 'react'
import { View } from 'react-native'
import { useTheme, Button, Text } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import { TextPracticeSetupPreview } from './text-practice-setup-preview.js'
import TextPracticeHeading from './text-practice-setup-sections.js'
import TextPractice from './text-practice.js'
import { ButtonAction } from '../components/button-action.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import Spinner from '../components/spinner.js'
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
  const [closeText, setCloseText] = useState('Stop')

  const [checkedListening, setCheckedListening] = React.useState(true)
  const [checkedReading, setCheckedReading] = React.useState(true)
  const [checkedVocabulary, setCheckedVocabulary] = React.useState(true)

  // Close the modal and stop audio if playing
  const handleClosePracticeModal = () => {
    setPracticeOrPreviewVisible(false)
    setIsPlaying(false)
    dispatch({ payload: false, type: 'SET_AUDIO' })
    dispatch({ payload: false, type: 'SET_AUDIO_SHOULD_PLAY_READING' })
    dispatch({ payload: false, type: 'SET_AUDIO_SHOULD_PLAY_VOCABULARY' })
    dispatch({ payload: false, type: 'SET_AUDIO_SHOULD_PLAY_LISTENING' })
  }

  // Start the practice and open the modal with practice content
  const handleStartPractice = () => {
    setCloseText('Stop')
    setContent(
      <TextPractice
        checkedListening={checkedListening}
        checkedReading={checkedReading}
        checkedVocabulary={checkedVocabulary}
        isListeningSelected={checkedListening}
        isReadingSelected={checkedReading}
        isVocabularySelected={checkedVocabulary}
      />
    )
    setPracticeOrPreviewVisible(true)
    setIsPlaying(true)
    dispatch({ payload: true, type: 'SET_AUDIO' })
  }

  // Open the modal with the preview content
  const handlePreviewContent = () => {
    setPracticeOrPreviewVisible(true)
    setCloseText('Close')
    setContent(
      <TextPracticeSetupPreview
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setShowRepeat={setShowRepeat}
        showRepeat={showRepeat}
        text={text}
      />
    )
  }

  // If the text title is not available, show a spinner
  if (!text.title) {
    return <Spinner />
  }

  return (
    <>
      <TextPracticeHeading
        heading={text}
        checkedListening={checkedListening}
        checkedReading={checkedReading}
        checkedVocabulary={checkedVocabulary}
        setCheckedListening={setCheckedListening}
        setCheckedReading={setCheckedReading}
        setCheckedVocabulary={setCheckedVocabulary}
      />
      <View style={sharedStyle.container}>
        <Button onPress={handlePreviewContent} style={sharedStyle.buttonAnswer}>
          <Text style={sharedStyle.actionTextPrimary}>PREVIEW</Text>
        </Button>
        <ButtonAction onPress={handleStartPractice} text="PRACTICE" />
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
