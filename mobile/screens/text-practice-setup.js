/* eslint-disable react-redux/useSelector-prefer-selectors */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as Haptics from 'expo-haptics'
import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import TextPracticeReview from './text-practice-review.js'
import TextPracticeHeading from './text-practice-setup-sections.js'
import TextPractice from './text-practice.js'
import { ButtonAction } from '../components/button-action.js'
import ModalScrollView from '../components/modal-scroll-view'
import { UI } from '../constants/ui.js'
import { useSharedStyles } from '../styles/common.js'

const Tab = createMaterialTopTabNavigator()

// ActionButtons Component
function ActionButtons({
  handleStartPractice,
  text,
  isListeningEnabled,
  isReadingEnabled,
  isVocabularyEnabled,
  setIsListeningEnabled,
  setIsReadingEnabled,
  setIsVocabularyEnabled
}) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  return (
    <ScrollView>
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
        <ButtonAction onPress={handleStartPractice} text={UI.practice.toUpperCase()} />
      </View>
    </ScrollView>
  )
}

export default function TextPracticeSetup({navigation}) {
  const { text } = useSelector((state) => state.text)
  const dispatch = useDispatch()

  const [isPlaying, setIsPlaying] = useState(false)
  const [showRepeat, setShowRepeat] = useState(true)
  const [content, setContent] = useState()
  const [isListeningEnabled, setIsListeningEnabled] = React.useState(true)
  const [isReadingEnabled, setIsReadingEnabled] = React.useState(true)
  const [isVocabularyEnabled, setIsVocabularyEnabled] = React.useState(true)
  const [practiceOrPreviewVisible, setPracticeOrPreviewVisible] = useState(false)

  const [closeText, setCloseText] = useState(UI.stop)

  const theme = useTheme()
  useSharedStyles(theme)
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

  // Start the practice and prepare for modal content
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

  // Open the text preview
  const handleOpenPreview = () => {
    setIsPlaying(false)
    // Logic to handle opening the preview
  }

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Read">
          {() => (
            <TextPracticeReview
              isPlaying={isPlaying}
              navigation={navigation}
              setIsPlaying={setIsPlaying}
              setShowRepeat={setShowRepeat}
              showRepeat={showRepeat}
              text={text}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Practice"
          children={() => (
            <ActionButtons
              text={text}
              handleStartPractice={handleStartPractice}
              handleOpenPreview={handleOpenPreview}
              isListeningEnabled={isListeningEnabled}
              setIsListeningEnabled={setIsListeningEnabled}
              isReadingEnabled={isReadingEnabled}
              isVocabularyEnabled={isVocabularyEnabled}
              setIsReadingEnabled={setIsReadingEnabled}
              setIsVocabularyEnabled={setIsVocabularyEnabled}
            />
          )}
        />
      </Tab.Navigator>
      <ModalScrollView
        visible={practiceOrPreviewVisible}
        content={content}
        hideModal={handleClosePracticeModal}
        closeText={closeText}
      />
    </>
  )
}
