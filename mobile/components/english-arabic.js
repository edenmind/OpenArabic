import React, { useMemo } from 'react'
import { useSharedStyles } from '../styles/common.js'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { transliterateArabicToEnglish } from '../services/utility-service.js'
import { useSelector } from 'react-redux'

const isTransliterationOnSelector = (state) => state.isTransliterationOn

export const EnglishArabic = ({ arabic, english }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const { isTransliterationOn } = useSelector(isTransliterationOnSelector)
  const showTransliteration = isTransliterationOn === 'on'

  const transliteratedText = useMemo(() => {
    return transliterateArabicToEnglish(arabic)
  }, [arabic])

  return (
    <>
      <Text style={{ ...sharedStyle.arabicBody }}>{arabic}</Text>
      {showTransliteration && (
        <Text style={{ ...sharedStyle.englishBody, color: theme.colors.outline, marginTop: 10 }} variant="bodyLarge">
          {transliteratedText}
        </Text>
      )}
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        {english}
      </Text>
    </>
  )
}

EnglishArabic.propTypes = {
  arabic: PropTypes.string.isRequired,
  english: PropTypes.string.isRequired
}
