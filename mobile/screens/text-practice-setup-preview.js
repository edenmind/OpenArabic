import 'react-native-gesture-handler'

import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

import { EnglishArabicText } from '../components/english-arabic-text.js'
import { useSharedStyles } from '../styles/common.js'

export const TextPracticeSetupPreview = ({ isPlaying, setIsPlaying, showRepeat, setShowRepeat, text }) => {
  const theme = useTheme()
  const style = useSharedStyles(theme)

  return (
    <ScrollView style={style.scrollViewLTR}>
      <Text style={style.arabic}>﷽</Text>

      {text.sentences.map((sentence, index) => {
        return (
          <EnglishArabicText
            key={index}
            autoStart={false}
            sentence={sentence}
            showAll={true}
            showRepeat={showRepeat}
            showPlay={true}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setShowRepeat={setShowRepeat}
          />
        )
      })}
    </ScrollView>
  )
}

TextPracticeSetupPreview.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setShowRepeat: PropTypes.func.isRequired,
  showRepeat: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}
