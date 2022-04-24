/* eslint-disable import/namespace */
import * as util from '../services/UtilityService'

import { Button, Text } from 'react-native-paper'
import React, { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

import { COLORS } from '../constants/colors'
import ModalScrollView from '../components/ModalScrollView'
import PropTypes from 'prop-types'
import WordPairs from './TextBilingualSentencesWordPairs'

const style = StyleSheet.create({
  arabic: {
    direction: 'rtl',
    flex: 1,
    fontSize: 25,
    lineHeight: 33,
    paddingBottom: 10,
    paddingLeft: 33,
    paddingRight: 33,
    paddingTop: 33,
    writingDirection: 'rtl'
  },
  bottomPadding: {
    paddingBottom: 55
  },
  english: {
    direction: 'ltr',
    flex: 1,
    lineHeight: 25,
    paddingLeft: 33,
    paddingRight: 33,
    writingDirection: 'ltr'
  },
  showWordsButton: {
    paddingLeft: 100,
    paddingRight: 100
  },
  showWordsText: {
    color: COLORS.darkGrey
  }
})

export default function TextBilingualSentences(props) {
  const [visible, setVisible] = React.useState(false)
  const [words, setWords] = React.useState([])
  const hideModal = () => setVisible(false)
  const showModal = () => setVisible(true)
  const getListOfWordPairs = (index) => setWords(index)

  const filterFunction = (element) => element.english !== '' && element.arabic !== ''

  const sentences = props.sentences.map((sentence, index) => (
    <Fragment key={index}>
      <Text style={style.arabic}>{sentence.arabic}</Text>
      <Text style={style.english}>{sentence.english}</Text>

      <Button
        style={style.showWordsButton}
        mode="text"
        onPress={() => {
          getListOfWordPairs(
            <WordPairs words={util.filterArrayFromEmptyElements(sentence.words, filterFunction)} />
          )
          showModal()
        }}>
        <Text style={style.showWordsText}>Vocabulary</Text>
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
