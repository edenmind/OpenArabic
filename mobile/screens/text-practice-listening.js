import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'

import { ButtonAction } from '../components/button-action.js'
import { EnglishArabicText } from '../components/english-arabic-text.js'
import { UI } from '../constants/ui.js'

export const PracticeListening = ({
  text,
  currentSentence,
  isLastSentence,
  handleReset,
  setIsListeningComplete,
  showRepeat,
  setShowRepeat
}) => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <EnglishArabicText
        sentence={text.sentences[currentSentence]}
        paddingBottom={0}
        showAll={true}
        autoStart={true}
        showPlay={false}
        showRepeat={showRepeat}
        setShowRepeat={setShowRepeat}
      />
    </View>
    <View style={{ marginBottom: 50 }}>
      {isLastSentence ? (
        <ButtonAction onPress={handleReset} text={UI.practiceAgain.toUpperCase()} />
      ) : (
        showRepeat && (
          <ButtonAction
            onPress={() => {
              setIsListeningComplete(true)
              setShowRepeat(false)
            }}
            text={UI.continue.toUpperCase()}
          />
        )
      )}
    </View>
  </View>
)

PracticeListening.propTypes = {
  currentSentence: PropTypes.number.isRequired,
  handleReset: PropTypes.func.isRequired,
  isLastSentence: PropTypes.bool.isRequired,
  setIsListeningComplete: PropTypes.func.isRequired,
  setShowRepeat: PropTypes.func.isRequired,
  showRepeat: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}
