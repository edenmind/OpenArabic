import * as util from '../services/utility-service.js'
import { Button, Text } from 'react-native-paper'
import React, { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import ModalScrollView from '../components/modal-scroll-view.js'
import PropTypes from 'prop-types'
import WordPairs from './text-bilingual-sentences-word-pairs.js'
import * as Haptics from 'expo-haptics'

const style = StyleSheet.create({
  arabic: {
    direction: 'rtl',
    flex: 1,
    fontFamily: 'uthmanic',
    fontSize: 30,
    lineHeight: 55,
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
    flex: 1,
    fontFamily: 'philosopher',
    lineHeight: 25,
    opacity: 0.7,
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

const filterFunction = (element) => element.english !== '' && element.arabic !== ''

export default function TextBilingualSentences(props) {
  const [visible, setVisible] = React.useState(false)
  const [words, setWords] = React.useState([])
  const hideModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setVisible(false)
  }
  const showModal = () => setVisible(true)
  const getListOfWordPairs = (index) => setWords(index)
  const sentences = props.sentences.map((sentence, index) => (
    <Fragment key={index}>
      <Text style={style.arabic}>{sentence.arabic}</Text>
      <Text style={style.english} variant="bodyMedium">
        {sentence.english}
      </Text>

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
