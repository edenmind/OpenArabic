import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'

import { ButtonAction } from '../components/button-action.js'
import { EnglishArabicText } from '../components/english-arabic-text.js'

export const PracticeListening = ({
  text,
  currentSentence,
  isLastSentence,
  isPlaying,
  handleReset,
  handleContinue,
  setIsPlaying,
  setSentenceIsComplete,
  showRepeat,
  setShowRepeat,
  dispatch
}) => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <EnglishArabicText
        sentence={text.sentences[currentSentence]}
        paddingBottom={0}
        showAll={true}
        autoStart={true}
        isPlaying={isPlaying}
        showPlay={false}
        showRepeat={showRepeat}
        setIsPlaying={setIsPlaying}
        setShowRepeat={setShowRepeat}
      />
    </View>
    <View style={{ marginBottom: 50 }}>
      {isLastSentence ? (
        <ButtonAction onPress={handleReset} text="PRACTICE AGAIN" />
      ) : (
        showRepeat && (
          <ButtonAction
            onPress={() => {
              setSentenceIsComplete(false)
              setShowRepeat(false)
              handleContinue()
              dispatch({
                payload: true,
                type: 'SET_AUDIO_SHOULD_PLAY_PRACTICE_WORDS'
              })
            }}
            text="CONTINUE"
          />
        )
      )}
    </View>
  </View>
)

PracticeListening.propTypes = {
  currentSentence: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleContinue: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  isLastSentence: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setSentenceIsComplete: PropTypes.func.isRequired,
  setShowRepeat: PropTypes.func.isRequired,
  showRepeat: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}
