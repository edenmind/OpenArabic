/* eslint-disable unicorn/no-null */
import React, { useMemo, useState } from 'react'
import { useSharedStyles } from '../styles/common.js'
import { Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { transliterateArabicToEnglish } from '../services/utility-service.js'
import { useSelector } from 'react-redux'
import ArabicWords from './arabic-words.js'
import PlaySound from './play-sound.js'
import { UI } from '../constants/ui.js'

const isTransliterationOnSelector = (state) => state.isTransliterationOn

export const EnglishArabic = ({ sentence }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const { isTransliterationOn } = useSelector(isTransliterationOnSelector)
  const showTransliteration = isTransliterationOn === 'on'

  const [currentPlayingWordIndex, setCurrentPlayingWordIndex] = useState(null)

  const handlePlayingWord = (index) => {
    setCurrentPlayingWordIndex(index)
  }

  const handlePlaybackFinished = () => {
    setCurrentPlayingWordIndex(null)
  }

  const transliteratedText = useMemo(() => {
    return transliterateArabicToEnglish(sentence.arabic)
  }, [sentence.arabic])

  //loop over all words in sentence that contains a property filename and add all filenames to an array
  const fileNames = sentence.words.map((word) => word.filename)

  return (
    <>
      <ArabicWords sentence={sentence} currentPlayingWordIndex={currentPlayingWordIndex} />

      {showTransliteration && (
        <Text style={{ ...sharedStyle.englishBody, color: theme.colors.outline }} variant="bodyLarge">
          {transliteratedText}
        </Text>
      )}
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        {sentence.english}
      </Text>
      <PlaySound
        audioFileNames={fileNames}
        buttonText={UI.playSentence}
        onPlayingWord={handlePlayingWord}
        onFinish={handlePlaybackFinished}
      />
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
