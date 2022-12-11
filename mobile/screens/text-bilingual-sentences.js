import * as util from '../services/utility-service.js'
import { Button, Text } from 'react-native-paper'
import React, { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import ModalScrollView from '../components/modal-scroll-view.js'
import PropTypes from 'prop-types'
import WordPairs from './text-bilingual-sentences-word-pairs.js'
import * as Haptics from 'expo-haptics'
const filterFunction = (element) => element.english !== '' && element.arabic !== ''

import { useSelector } from 'react-redux'
import PlaySound from '../services/audio-service.js'

const arabicSelector = (state) => state.arabicFontSize
const englishSelector = (state) => state.englishFontSize
const isTransliterationOnSelector = (state) => state.isTransliterationOn
const arabicFontNameSelector = (state) => state.arabicFontName

export default function TextBilingualSentences(props) {
  //load arabic font size from redux on every render of this component with useFocusEffect
  const { arabicFontSize } = useSelector(arabicSelector)
  const { englishFontSize } = useSelector(englishSelector)
  const { isTransliterationOn } = useSelector(isTransliterationOnSelector)
  const { arabicFontName } = useSelector(arabicFontNameSelector)

  //if isTransliterationOn is a string with value on then set showTransliteration to true
  const showTransliteration = isTransliterationOn === 'on'

  console.log(isTransliterationOn)

  const [visible, setVisible] = React.useState(false)
  const [words, setWords] = React.useState([])
  const hideModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setVisible(false)
  }
  const showModal = () => setVisible(true)
  const getListOfWordPairs = (index) => setWords(index)

  const style = StyleSheet.create({
    arabic: {
      direction: 'rtl',
      fontFamily: arabicFontName,
      fontSize: arabicFontSize,
      fontWeight: 'normal',
      lineHeight: 85,
      paddingBottom: 13,
      paddingLeft: 33,
      paddingRight: 25,
      paddingTop: 33,
      writingDirection: 'rtl'
    },
    bottomPadding: {
      paddingBottom: 40
    },
    buttonReport: {
      marginBottom: 5,
      marginLeft: 33,
      marginRight: 33,
      marginTop: 15
    },
    english: {
      direction: 'ltr',
      fontFamily: 'philosopher',
      fontSize: englishFontSize,
      opacity: 0.9,
      paddingBottom: 13,
      paddingLeft: 33,
      paddingRight: 33
    }
  })

  const sentences = props.sentences.map((sentence, index) => (
    <Fragment key={index}>
      <Text style={style.arabic}>{sentence.arabic}</Text>
      {showTransliteration && (
        <Text style={style.english} variant="bodyLarge">
          {util.transliterateArabicToEnglish(sentence.arabic)}
        </Text>
      )}
      <Text style={style.english} variant="bodyLarge">
        {sentence.english}
      </Text>

      <Button
        style={style.buttonReport}
        mode="elevated"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          getListOfWordPairs(<WordPairs words={util.filterArrayFromEmptyElements(sentence.words, filterFunction)} />)
          showModal()
        }}
      >
        SHOW WORDS
      </Button>
      <PlaySound audioFileName={sentence.filename} buttonText="PLAY SENTENCE" />
    </Fragment>
  ))

  return (
    <Fragment>
      <View style={style.bottomPadding}>{sentences}</View>
      <ModalScrollView visible={visible} content={words} title="Vocabulary" hideModal={hideModal} />
    </Fragment>
  )
}

TextBilingualSentences.propTypes = {
  sentences: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string,
      wordId: PropTypes.string
    })
  )
}
