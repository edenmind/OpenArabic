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

const arabicSelector = (state) => state.arabicFontSize
const englishSelector = (state) => state.englishFontSize

export default function TextBilingualSentences(props) {
  //load arabic font size from redux on every render of this component with useFocusEffect
  const { arabicFontSize } = useSelector(arabicSelector)
  const { englishFontSize } = useSelector(englishSelector)

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
      fontFamily: 'uthmanic',
      fontSize: arabicFontSize,
      fontWeight: 'normal',
      paddingBottom: 13,
      paddingLeft: 33,
      paddingRight: 25,
      paddingTop: 33,
      writingDirection: 'rtl'
    },
    bottomPadding: {
      paddingBottom: 40
    },
    english: {
      direction: 'ltr',
      fontFamily: 'philosopher',
      fontSize: englishFontSize,
      opacity: 0.9,
      paddingBottom: 13,
      paddingLeft: 33,
      paddingRight: 33,
      writingDirection: 'ltr'
    },
    showWordsButton: {
      paddingBottom: 25,
      paddingHorizontal: 75,
      paddingTop: 5
    },
    vocabulary: {
      opacity: 0.3
    }
  })

  const sentences = props.sentences.map((sentence, index) => (
    <Fragment key={index}>
      <Text style={style.arabic}>{sentence.arabic}</Text>
      <Text style={style.english}>{sentence.english}</Text>

      <Button
        style={style.showWordsButton}
        mode="text"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          getListOfWordPairs(<WordPairs words={util.filterArrayFromEmptyElements(sentence.words, filterFunction)} />)
          showModal()
        }}
      >
        <Text variant="labelSmall" style={style.vocabulary}>
          VOCABULARY
        </Text>
      </Button>
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
