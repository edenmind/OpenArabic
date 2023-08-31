import React, { useMemo } from 'react'
import { useSharedStyles } from '../styles/common.js'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { transliterateArabicToEnglish } from '../services/utility-service.js'
import { useSelector } from 'react-redux'
import TextArabicWords from './arabic-words.js'

const isTransliterationOnSelector = (state) => state.isTransliterationOn

export const EnglishArabic = ({ sentence }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const { isTransliterationOn } = useSelector(isTransliterationOnSelector)
  const showTransliteration = isTransliterationOn === 'on'

  const transliteratedText = useMemo(() => {
    return transliterateArabicToEnglish(sentence.arabic)
  }, [sentence.arabic])

  return (
    <>
      <TextArabicWords sentence={sentence} />
      {showTransliteration && (
        <Text style={{ ...sharedStyle.englishBody, color: theme.colors.outline, marginTop: 10 }} variant="bodyLarge">
          {transliteratedText}
        </Text>
      )}
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        {sentence.english}
      </Text>
    </>
  )
}

EnglishArabic.propTypes = {
  arabic: PropTypes.string.isRequired,
  english: PropTypes.string.isRequired,
  sentence: PropTypes.shape({
    arabic: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    words: PropTypes.array.isRequired
  })
}
