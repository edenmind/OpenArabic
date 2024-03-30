import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useTheme, Divider } from 'react-native-paper'

import { ButtonAnimated } from '../components/button-animated.js'
import PracticeHighlighted from '../components/practice-highlighted.js'
import { useSharedStyles } from '../styles/common.js'

export const PracticeReading = ({
  currentArabicWord,
  currentSentence,
  currentWord,
  currentWordsInSentence,
  onWordPressed,
  sentencesInText
}) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const renderedButtons = useMemo(
    () =>
      currentWordsInSentence.map((word, index) => {
        const bracketsRemoved = word.english
          .replaceAll(/\[.*?]/g, '')
          .replaceAll(/\(.*?\)/g, '')
          .trim()

        return (
          <ButtonAnimated
            key={`${bracketsRemoved}-${index}`}
            word={{ ...word, english: bracketsRemoved }}
            handlePress={onWordPressed}
          />
        )
      }),
    [currentWordsInSentence, onWordPressed]
  )

  return (
    <View style={{ flex: 1 }}>
      <PracticeHighlighted
        arabicSentence={sentencesInText[currentSentence].arabicWords}
        currentWord={currentWord}
        arabicWord={currentArabicWord}
      />
      <Divider style={sharedStyle.dividerHidden} />
      <View style={sharedStyle.bottomView}>{renderedButtons}</View>
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
