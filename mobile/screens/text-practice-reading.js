import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { useTheme, Divider } from 'react-native-paper'

import { ButtonAnimated } from '../components/button-animated.js'
import WordsContextHighLighted from '../components/practice-highlighted.js'
import { useSharedStyles } from '../styles/common.js'

export const PracticeReading = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  return (
    <View style={{ flex: 1 }}>
      <WordsContextHighLighted
        arabicSentence={props.sentencesInText[props.currentSentence].arabicWords}
        currentWord={props.currentWord}
        arabicWord={props.currentArabicWord}
      />
      <Divider style={sharedStyle.dividerHidden} />
      <View style={sharedStyle.bottomView}>
        {props.currentWordsInSentence.map((word, index) => (
          <ButtonAnimated key={`${word.english}-${index}`} word={word} handlePress={props.onWordPressed} />
        ))}
      </View>
    </View>
  )
}

PracticeReading.propTypes = {
  currentArabicWord: PropTypes.string.isRequired,
  currentSentence: PropTypes.number.isRequired,
  currentWord: PropTypes.number.isRequired,
  currentWordsInSentence: PropTypes.array.isRequired,
  onWordPressed: PropTypes.func.isRequired,
  sentencesInText: PropTypes.array.isRequired
}
