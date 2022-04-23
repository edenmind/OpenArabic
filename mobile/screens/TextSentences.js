/* eslint-disable import/namespace */
import * as util from '../services/UtilityService'

import { Button, Paragraph, Text } from 'react-native-paper'
import React, { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

import ModalScrollView from '../components/ModalScrollView'
import PropTypes from 'prop-types'
import WordPairs from './TextWordPairs'

const style = StyleSheet.create({
  arabic: {
    direction: 'rtl',
    flex: 1,
    fontSize: 25,
    lineHeight: 35,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 35,
    writingDirection: 'rtl'
  },
  bottomPadding: {
    paddingBottom: 55
  },
  english: {
    direction: 'ltr',
    flex: 1,
    fontSize: 17,
    lineHeight: 25,
    paddingLeft: 15,
    paddingRight: 15,
    writingDirection: 'ltr'
  }
})

export default function Sentences(props) {
  const [visible, setVisible] = React.useState(false)
  const [words, setWords] = React.useState([])
  const hideModal = () => setVisible(false)
  const showModal = () => setVisible(true)
  const getListOfWordPairs = (index) => setWords(index)

  const filterFunction = (element) =>
    element.english !== '' && element.arabic !== ''

  const sentences = props.sentences.map((sentence, index) => (
    <Fragment key={index}>
      <Paragraph style={style.arabic}>{sentence.arabic}</Paragraph>
      <Paragraph style={style.english}>{sentence.english}</Paragraph>

      <Button
        onPress={() => {
          getListOfWordPairs(
            <WordPairs
              words={util.filterArrayFromEmptyElements(
                sentence.words,
                filterFunction
              )}
            />
          )
          showModal()
        }}>
        <Text>Show Words</Text>
      </Button>
    </Fragment>
  ))

  return (
    <Fragment>
      <View style={style.bottomPadding}>{sentences}</View>
      <ModalScrollView
        visible={visible}
        content={words}
        hideModal={hideModal}
      />
    </Fragment>
  )
}

Sentences.propTypes = {
  sentences: PropTypes.any.isRequired
}
